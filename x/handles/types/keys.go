package types

const (
	// ModuleName defines the module name
	ModuleName = "handles"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_handles"
)

var (
	ParamsKey = []byte("p_handles")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
