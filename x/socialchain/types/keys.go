package types

const (
	// ModuleName defines the module name
	ModuleName = "socialchain"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_socialchain"
)

var (
	ParamsKey = []byte("p_socialchain")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
