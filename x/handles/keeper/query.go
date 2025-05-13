package keeper

import (
	"socialchain/x/handles/types"
)

var _ types.QueryServer = Keeper{}
