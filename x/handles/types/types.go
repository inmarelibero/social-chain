package types

type Account struct {
	Id     uint64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Owner  string `protobuf:"bytes,2,opt,name=user,proto3" json:"owner,omitempty"`
	Handle string `protobuf:"bytes,3,opt,name=handle,proto3" json:"handle,omitempty"`
}
