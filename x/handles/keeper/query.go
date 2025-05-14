package keeper

import (
	"context"
	"errors"
	"socialchain/x/handles/types"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ types.QueryServer = Keeper{}

// HandleOwner
func (k Keeper) OwnerOf(goCtx context.Context, req *types.QueryHandleOwnerRequest) (*types.QueryHandleOwnerResponse, error) {
	if req == nil || req.Handle == "" {
		return nil, errors.New("handle cannot be empty")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	handle, found := k.GetHandleByHandle(ctx, req.Handle)

	if !found {
		return nil, errors.New("handle not found")
	}

	return &types.QueryHandleOwnerResponse{
		Id:     strconv.FormatUint(handle.Id, 10),
		Handle: handle.Handle,
		Owner:  string(handle.Owner),
	}, nil
}
