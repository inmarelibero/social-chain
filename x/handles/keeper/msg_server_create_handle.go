package keeper

import (
	"context"
	"errors"

	"socialchain/x/handles/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// CreateHandle
func (k msgServer) CreateHandle(goCtx context.Context, msg *types.MsgCreateHandle) (*types.MsgCreateHandleResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the handle is already taken
	if k.HasHandle(ctx, msg.Handle) {
		return nil, errors.New("handle already taken")
	}

	// Create the handle
	handle := types.Handle{
		Owner:  msg.Creator,
		Handle: msg.Handle,
	}

	// Store the handle
	k.SetHandle(ctx, handle)

	return &types.MsgCreateHandleResponse{}, nil
}
