package posts_test

import (
	"testing"

	keepertest "socialchain/testutil/keeper"
	"socialchain/testutil/nullify"
	posts "socialchain/x/posts/module"
	"socialchain/x/posts/types"

	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.PostsKeeper(t)
	posts.InitGenesis(ctx, k, genesisState)
	got := posts.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
