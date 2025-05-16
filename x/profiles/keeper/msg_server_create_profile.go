package keeper

import (
	"context"
	"errors"

	"socialchain/x/profiles/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// CreateProfile
func (k msgServer) CreateProfile(goCtx context.Context, msg *types.MsgCreateProfile) (*types.MsgCreateProfileResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the handle is already taken
	if k.HasHandle(ctx, msg.Handle) {
		return nil, errors.New("handle already taken")
	}

	// Check if the caller already owns a handle
	_, found := k.GetProfileByOwner(ctx, msg.Creator)

	if found {
		return nil, errors.New("caller already owns a handle")
	}

	// Create the handle
	handle := types.Profile{
		Owner:  msg.Creator,
		Handle: msg.Handle,
	}

	// Store the handle
	k.SetProfile(ctx, handle)

	// emit event
	ctx.EventManager().EmitTypedEvent(&types.EventCreateProfile{
		Id:     handle.Id,
		Handle: handle.Handle,
		Owner:  handle.Owner,
	})

	return &types.MsgCreateProfileResponse{}, nil
}
