package handles_test

import (
	"testing"

	keepertest "socialchain/testutil/keeper"
	"socialchain/testutil/nullify"
	handles "socialchain/x/handles/module"
	"socialchain/x/handles/types"

	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.HandlesKeeper(t)
	handles.InitGenesis(ctx, k, genesisState)
	got := handles.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
