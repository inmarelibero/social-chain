package keeper

import (
	"context"
	"socialchain/x/posts/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ types.QueryServer = Keeper{}

// PostCount returns the total number of posts in the store
func (k Keeper) PostCount(goCtx context.Context, req *types.QueryPostCountRequest) (*types.QueryPostCountResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the post count
	count := k.GetPostCount(ctx)

	return &types.QueryPostCountResponse{Count: count}, nil
}
