package keeper

import (
	"context"
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

	post := types.Post{
		Creator:   sender.String(),
		Body:      msg.Body,
		Timestamp: timestamp,
	}

	// Store the post
	k.SetPost(ctx, post)

	return &types.MsgCreatePostResponse{}, nil
}
