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

	// Check if the caller already owns a handle
	_, found := k.GetHandleByOwner(ctx, msg.Creator)

	if found {
		return nil, errors.New("caller already owns a handle")
	}

	// Create the handle
	handle := types.Handle{
		Owner:  msg.Creator,
		Handle: msg.Handle,
	}

	// Store the handle
	k.SetHandle(ctx, handle)

	// emit event
	ctx.EventManager().EmitTypedEvent(&types.EventCreateHandle{
		Id:     handle.Id,
		Handle: handle.Handle,
		Owner:  handle.Owner,
	})

	return &types.MsgCreateHandleResponse{}, nil
}
