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

	// coincides with the latest used id
	postsCount := k.GetPostCount(ctx)
	from := req.From
	count := req.Count

	var posts []*types.PostInQuery

	if count <= 0 {
		return &types.QueryLatestPostsResponse{Posts: posts}, nil
	}

	addedPosts := uint64(0)
	i := from

	/**
	 * build an array of Posts
	 */
	for addedPosts <= count {
		if i > postsCount {
			break
		}

		post, found := k.GetPost(ctx, uint64(i))

		if found {
			profile, _ := k.profilesKeeper.GetProfileById(ctx, post.ProfileId)

			profileForPostInQuery := types.ProfileForPostInQuery{
				Id:     profile.Id,
				Handle: profile.Handle,
			}

			postInQuery := types.PostInQuery{
				Id:        post.Id,
				Body:      post.Body,
				Timestamp: post.Timestamp,
				Profile:   &profileForPostInQuery,
			}

			posts = append(posts, &postInQuery)
			addedPosts++
		}

		i++
	}

	return &types.QueryLatestPostsResponse{
		Posts: posts,
		Count: postsCount,
	}, nil
}

// GetPost returns a single Post
func (k Keeper) Post(goCtx context.Context, req *types.QueryPostRequest) (*types.QueryPostResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	post, found := k.GetPost(ctx, req.Id)

	if !found {
		return nil, errors.New("Post not found")
	}

	profile, _ := k.profilesKeeper.GetProfileById(ctx, post.ProfileId)

	postProfile := types.PostProfile{
		Id:     profile.Id,
		Handle: profile.Handle,
	}

	postWithProfile := types.PostWithProfile{
		Id:        post.Id,
		Body:      post.Body,
		Timestamp: post.Timestamp,
		Profile:   &postProfile,
	}

	return &types.QueryPostResponse{
		Post: &postWithProfile,
	}, nil
}
