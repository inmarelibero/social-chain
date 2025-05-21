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
	var posts []*types.PostInQuery

	/**
	 * build an array of Posts
	 */
	for i := int64(count); i > 0 && uint64(len(posts)) < req.Limit; i-- {
		post, found := k.GetPost(ctx, uint64(i))

		if found {
			profile, _ := k.profilesKeeper.GetProfileById(ctx, post.ProfileId)

			ctx.Logger().Info("Profile", "Profile", profile)

			ProfileForPostInQuery := types.ProfileForPostInQuery{
				Id:     profile.Id,
				Handle: profile.Handle,
			}
			ctx.Logger().Info("", "ProfileForPostInQuery", ProfileForPostInQuery)

			postInQuery := types.PostInQuery{
				Id:        post.Id,
				Body:      post.Body,
				Timestamp: post.Timestamp,
				Profile:   &ProfileForPostInQuery,
			}

			posts = append(posts, &postInQuery)
		}
	}

	return &types.QueryLatestPostsResponse{Posts: posts}, nil
}
