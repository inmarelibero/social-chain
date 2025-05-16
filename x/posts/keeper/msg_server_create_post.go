package keeper

import (
	"context"
	"errors"
	"time"

	"socialchain/x/posts/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreatePost(goCtx context.Context, msg *types.MsgCreatePost) (*types.MsgCreatePostResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the sender's address from the message context
	sender, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}

	// Get current time
	timestamp := ctx.BlockTime().Format(time.RFC3339)

	profile, found := k.profilesKeeper.GetProfileByOwner(ctx, sender.String())

	if !found {
		return nil, errors.New("handle not found for caller")
	}

	post := types.Post{
		ProfileId: profile.Id,
		Body:      msg.Body,
		Timestamp: timestamp,
	}

	// Store the post
	k.SetPost(ctx, post)

	return &types.MsgCreatePostResponse{}, nil
}
