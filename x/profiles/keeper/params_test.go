package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "socialchain/testutil/keeper"
	"socialchain/x/profiles/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := keepertest.ProfilesKeeper(t)
	params := types.DefaultParams()

	require.NoError(t, k.SetParams(ctx, params))
	require.EqualValues(t, params, k.GetParams(ctx))
}
