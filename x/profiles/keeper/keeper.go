package keeper

import (
	"fmt"

	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"socialchain/x/profiles/types"
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

// GetProfileByHandle

func (k Keeper) GetProfileByHandle(ctx sdk.Context, handle string) (val types.Profile, found bool) {
	store := k.storeService.OpenKVStore(ctx)

	key := types.GetProfileKey(handle)
	bz, err := store.Get(key)

	if bz == nil {
		return val, false
	}

	if err != nil {
		panic(err)
	}

	k.cdc.MustUnmarshal(bz, &val)

	return val, true
}

// GetProfileByOwner
func (k Keeper) GetProfileByOwner(ctx sdk.Context, owner string) (val types.Profile, found bool) {
	store := k.storeService.OpenKVStore(ctx)

	key := types.GetProfilesByOwnerKey(owner)
	bz, err := store.Get(key)

	if bz == nil {
		return val, false
	}

	if err != nil {
		panic(err)
	}

	handle := string(bz)

	return k.GetProfileByHandle(ctx, handle)
}

// GetProfilesCount retrieves the current profiles count
func (k Keeper) GetProfilesCount(ctx sdk.Context) uint64 {
	store := k.storeService.OpenKVStore(ctx)
	bz, err := store.Get(types.KeyPrefix(types.ProfilesCountKey))

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

	handleKey := types.GetProfileKey(handle)

	bz, err := store.Has(handleKey)

	if err != nil {
		panic(err)
	}

	return bz
}

// IncrementProfilesCount increments the postprofilest by 1
func (k Keeper) IncrementProfilesCount(ctx sdk.Context) {
	store := k.storeService.OpenKVStore(ctx)
	count := k.GetProfilesCount(ctx)

	bz := make([]byte, 8)
	bz[0] = byte(count + 1)

	err := store.Set(types.KeyPrefix(types.ProfilesCountKey), bz)

	if err != nil {
		panic(err)
	}
}

// SetProfile
func (k Keeper) SetProfile(ctx sdk.Context, handle types.Profile) {
	store := k.storeService.OpenKVStore(ctx)

	// Generate unique ID for the handle
	id := k.GetProfilesCount(ctx) + 1
	handle.Id = id

	//
	bz, err := k.cdc.Marshal(&handle)

	if err != nil {
		panic(err)
	}

	// store Handle
	handleKey := types.GetProfileKey(handle.Handle)
	store.Set(handleKey, bz)

	// update ProfilesById
	store.Set(types.GetProfilesByIdKey(handle.Id), []byte(handle.Handle))

	// update ProfilesByOwner
	store.Set(types.GetProfilesByOwnerKey(handle.Owner), []byte(handle.Handle))

	// Increment profiles count
	k.IncrementProfilesCount(ctx)
}
