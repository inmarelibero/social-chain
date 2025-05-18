package keeper

import (
	"fmt"

	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"socialchain/x/posts/types"
	profileskeeper "socialchain/x/profiles/keeper"
)

type (
	Keeper struct {
		cdc          codec.BinaryCodec
		storeService store.KVStoreService
		logger       log.Logger

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority string

		profilesKeeper profileskeeper.Keeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	hKeeper profileskeeper.Keeper,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	return Keeper{
		cdc:            cdc,
		storeService:   storeService,
		authority:      authority,
		logger:         logger,
		profilesKeeper: hKeeper,
	}
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// GetPostCount retrieves the current post count
func (k Keeper) GetPostCount(ctx sdk.Context) uint64 {
	store := k.storeService.OpenKVStore(ctx)
	bz, err := store.Get(types.KeyPrefix(types.PostsCountKey))

	if err != nil {
		panic(err)
	}

	if bz == nil {
		return 0
	}

	return uint64(bz[0])
}

// SetPost stores a post in the store
func (k Keeper) SetPost(ctx sdk.Context, post types.Post) {
	store := k.storeService.OpenKVStore(ctx)

	// Generate unique ID for the post
	postCount := k.GetPostCount(ctx)
	id := postCount + 1
	post.Id = id

	//
	bz, err := k.cdc.Marshal(&post)

	if err != nil {
		panic(err)
	}

	// Store post with a unique key including post ID
	postKey := types.GetPostKey(id)
	store.Set(postKey, bz)

	// Update post count
	k.IncrementPostCount(ctx)
}

// IncrementPostCount
func (k Keeper) IncrementPostCount(ctx sdk.Context) {
	store := k.storeService.OpenKVStore(ctx)
	count := k.GetPostCount(ctx)

	bz := make([]byte, 8)
	bz[0] = byte(count + 1)

	err := store.Set(types.KeyPrefix(types.PostsCountKey), bz)

	if err != nil {
		panic(err)
	}
}

// GetPost retrieves a post by ID
func (k Keeper) GetPost(ctx sdk.Context, id uint64) (val types.Post, found bool) {
	store := k.storeService.OpenKVStore(ctx)

	postKey := types.GetPostKey(id)
	bz, err := store.Get(postKey)

	if bz == nil {
		return val, false
	}

	if err != nil {
		panic(err)
	}

	k.cdc.MustUnmarshal(bz, &val)

	return val, true
}

func GetPostIDBytes(id uint64) []byte {
	return sdk.Uint64ToBigEndian(id)
}
