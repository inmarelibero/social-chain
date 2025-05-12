package keeper

import (
	"fmt"

	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"socialchain/x/posts/types"
)

type (
	Keeper struct {
		cdc          codec.BinaryCodec
		storeService store.KVStoreService
		logger       log.Logger

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority string
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,

) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	return Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		logger:       logger,
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
	bz, err := store.Get(types.KeyPrefix(types.PostCountKeyPrefix))

	if err != nil {
		panic(err)
	}

	if bz == nil {
		return 0
	}

	return uint64(bz[0])
}

// SetPost
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

	store.Set(types.KeyPrefix(types.PostKeyPrefix), bz)

	// Update post count
	k.SetPostCount(ctx, id)
}

// SetPostCount
func (k Keeper) SetPostCount(ctx sdk.Context, count uint64) {
	store := k.storeService.OpenKVStore(ctx)
	bz := make([]byte, 8)
	bz[0] = byte(count)

	err := store.Set(types.KeyPrefix(types.PostCountKeyPrefix), bz)

	if err != nil {
		panic(err)
	}
}
