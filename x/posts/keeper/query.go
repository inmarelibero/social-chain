package keeper

import (
	"context"
	"errors"
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

// LatestPosts returns the latest posts in the store
func (k Keeper) LatestPosts(goCtx context.Context, req *types.QueryLatestPostsRequest) (*types.QueryLatestPostsResponse, error) {
	if req == nil {
		return nil, errors.New("invalid request: empty request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	count := k.GetPostCount(ctx)
	var posts []*types.Post

	for i := int64(count); i > 0 && uint64(len(posts)) < req.Limit; i-- {
		post, found := k.GetPost(ctx, uint64(i))

		if found {
			posts = append(posts, &post)
		}
	}

	return &types.QueryLatestPostsResponse{Posts: posts}, nil
}
