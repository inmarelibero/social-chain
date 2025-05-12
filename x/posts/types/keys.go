package types

const (
	// ModuleName defines the module name
	ModuleName = "posts"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_posts"

	// Key prefixes
	PostKeyPrefix      = "Post/value/"
	PostCountKeyPrefix = "Post/count/"
)

var (
	ParamsKey = []byte("p_posts")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
