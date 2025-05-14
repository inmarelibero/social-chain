package types

import (
	"errors"
	fmt "fmt"
	"regexp"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgCreateHandle{}

func NewMsgCreateHandle(creator string, handle string) *MsgCreateHandle {
	return &MsgCreateHandle{
		Creator: creator,
		Handle:  handle,
	}
}

func (msg *MsgCreateHandle) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		// return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "invalid owner address: %v", err)
		// return errors.New("invalid owner address: %v")
		return fmt.Errorf("invalid owner address: %s", msg.Creator)
	}

	if len(msg.Handle) == 0 {
		// return sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "handle cannot be empty")
		return errors.New("handle cannot be empty")
	}

	// check if the handle only contains allowed characters
	// regex to check that handle only contains a-z, A-Z and 0-9
	var validHandle = regexp.MustCompile(`^[a-zA-Z0-9]+$`)

	if !validHandle.MatchString(msg.Handle) {
		return errors.New("handle contains invalid characters")
	}

	return nil
}
