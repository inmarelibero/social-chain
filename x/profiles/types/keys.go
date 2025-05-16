package types

import (
	fmt "fmt"
	"strings"
)

const (
	// ModuleName defines the module name
	ModuleName = "profiles"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_profiles"

	// Keys and prefixes
	ProfilesCountKey = "Post/count"

	// prefix to store profiles (as objects) by their handles
	HandleKeyPrefix = "Handle/value/"

	// key to store profiles (as string) by their id
	ProfilesById = "Handle/id_index/"

	// key to store profiles (as string) by their owner
	ProfilesByOwner = "Handle/owner_index/"
)

var (
	ParamsKey = []byte("p_profiles")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

func GetProfileKey(handle string) []byte {
	// make handle lowercase
	handle = strings.ToLower(handle)

	return []byte(fmt.Sprintf("%s%s", HandleKeyPrefix, handle))
}

func GetProfilesByIdKey(id uint64) []byte {
	return []byte(fmt.Sprintf("%s%d", ProfilesById, id))
}

func GetProfilesByOwnerKey(owner string) []byte {
	return []byte(fmt.Sprintf("%s%s", ProfilesByOwner, owner))
}
