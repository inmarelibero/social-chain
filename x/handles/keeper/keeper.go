package keeper

import (
	"fmt"

	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"socialchain/x/handles/types"
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

// GetHandleByHandle
func (k Keeper) GetHandleByHandle(ctx sdk.Context, handle string) (val types.Handle, found bool) {
	store := k.storeService.OpenKVStore(ctx)

	postKey := types.GetHandleKey(handle)
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

// GetHandlesCount retrieves the current handles count
func (k Keeper) GetHandlesCount(ctx sdk.Context) uint64 {
	store := k.storeService.OpenKVStore(ctx)
	bz, err := store.Get(types.KeyPrefix(types.HandlesCountKey))

	if err != nil {
		panic(err)
	}

	if bz == nil {
		return 0
	}

	return uint64(bz[0])
}

// HasHandle
func (k Keeper) HasHandle(ctx sdk.Context, handle string) bool {
	store := k.storeService.OpenKVStore(ctx)

	handleKey := types.GetHandleKey(handle)

	bz, err := store.Has(handleKey)

	if err != nil {
		panic(err)
	}

	return bz
}

// IncrementHandlesCount increments the posthandlest by 1
func (k Keeper) IncrementHandlesCount(ctx sdk.Context) {
	store := k.storeService.OpenKVStore(ctx)
	count := k.GetHandlesCount(ctx)

	bz := make([]byte, 8)
	bz[0] = byte(count + 1)

	err := store.Set(types.KeyPrefix(types.HandlesCountKey), bz)

	if err != nil {
		panic(err)
	}
}

// SetHandle
func (k Keeper) SetHandle(ctx sdk.Context, handle types.Handle) {
	store := k.storeService.OpenKVStore(ctx)

	// Generate unique ID for the handle
	id := k.GetHandlesCount(ctx) + 1
	handle.Id = id

	//
	bz, err := k.cdc.Marshal(&handle)

	if err != nil {
		panic(err)
	}

	// store Handle
	handleKey := types.GetHandleKey(handle.Handle)
	store.Set(handleKey, bz)

	// update HandlesById
	store.Set(types.GetHandlesByIdKey(handle.Id), []byte(handle.Handle))

	// Increment handles count
	k.IncrementHandlesCount(ctx)
}
