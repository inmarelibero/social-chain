package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "socialchain/testutil/keeper"
	"socialchain/x/handles/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := keepertest.HandlesKeeper(t)
	params := types.DefaultParams()

	require.NoError(t, k.SetParams(ctx, params))
	require.EqualValues(t, params, k.GetParams(ctx))
}
