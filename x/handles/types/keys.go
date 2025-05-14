package types

import (
	fmt "fmt"
	"strings"
)

const (
	// ModuleName defines the module name
	ModuleName = "handles"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_handles"

	// Keys and prefixes
	HandleKeyPrefix = "Handle/value/"
	HandlesCountKey = "Post/count"

	// key to store handles (as string) by their id
	HandlesById = "Handle/id_index/"
)

var (
	ParamsKey = []byte("p_handles")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

func GetHandleKey(handle string) []byte {
	// make handle lowercase
	handle = strings.ToLower(handle)

	return []byte(fmt.Sprintf("%s%s", HandleKeyPrefix, handle))
}

func GetHandlesByIdKey(id uint64) []byte {
	return []byte(fmt.Sprintf("%s%d", HandlesById, id))
}
