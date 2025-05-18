package types

import fmt "fmt"

const (
	// ModuleName defines the module name
	ModuleName = "posts"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_posts"

	// Key prefixes
	PostKeyPrefix = "Post/value/"
	PostsCountKey = "Post/count"
)

var (
	ParamsKey = []byte("p_posts")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

func GetPostKey(id uint64) []byte {
	return []byte(fmt.Sprintf("%s%d", PostKeyPrefix, id))
}
