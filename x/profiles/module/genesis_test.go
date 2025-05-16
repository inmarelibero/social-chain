package profiles_test

import (
	"testing"

	keepertest "socialchain/testutil/keeper"
	"socialchain/testutil/nullify"
	profiles "socialchain/x/profiles/module"
	"socialchain/x/profiles/types"

	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ProfilesKeeper(t)
	profiles.InitGenesis(ctx, k, genesisState)
	got := profiles.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
