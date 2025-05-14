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

	// Key prefixes
	HandleKeyPrefix = "Handle/value/"
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
