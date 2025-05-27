package keeper

import (
	"context"
	"errors"
	"socialchain/x/profiles/types"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ types.QueryServer = Keeper{}

// OwnerOf returns the owner of a handle
func (k Keeper) OwnerOf(goCtx context.Context, req *types.QueryOwnerOfRequest) (*types.QueryOwnerOfResponse, error) {
	if req == nil || req.Handle == "" {
		return nil, errors.New("handle cannot be empty")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	handle, found := k.GetProfileByHandle(ctx, req.Handle)

	if !found {
		return nil, errors.New("handle not found")
	}

	return &types.QueryOwnerOfResponse{
		Id:     strconv.FormatUint(handle.Id, 10),
		Handle: handle.Handle,
		Owner:  string(handle.Owner),
	}, nil
}

// OwnedBy returns the handle owned by a given address
func (k Keeper) OwnedBy(goCtx context.Context, req *types.QueryOwnedByRequest) (*types.QueryOwnedByResponse, error) {
	if req == nil || req.Owner == "" {
		return nil, errors.New("handle cannot be empty")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	profile, found := k.GetProfileByOwner(ctx, req.Owner)

	if !found {
		return nil, errors.New("ADDRESS_DOES_NOT_OWN_ANY_HANDLE")
	}

	return &types.QueryOwnedByResponse{
		Id:     profile.Id,
		Handle: profile.Handle,
		Owner:  string(profile.Owner),
	}, nil
}
