package keeper

import (
	"socialchain/x/socialchain/types"
)

var _ types.QueryServer = Keeper{}
