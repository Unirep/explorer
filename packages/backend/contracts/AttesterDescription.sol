// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AttesterDescription {
  bool private isValid;
  string public text;

  bytes4 internal constant MAGICVALUE = 0x1626ba7e;

  function supportsInterface(bytes4 interfaceId) external view returns (bool) {
    return interfaceId == 0x0a1f90b9;
  }

  function isValidSignature(
    bytes32 _hash,
    bytes32 _signature
  ) public pure returns (bool) {
    // return true;
    return keccak256(abi.encodePacked(_hash)) == _signature;
  }

  function setDescription(
    bytes32 _hash,
    bytes32 _signature,
    string memory _text
  ) public {
    if (isValidSignature(_hash, _signature)) {
      text = _text;
    }
  }

  function getDescription() public view returns (string memory description) {
    return text;
  }

  function getInterfaceId() external pure returns (bytes4) {
    return
      this.isValidSignature.selector ^
      this.setDescription.selector ^
      this.getDescription.selector;
  }
}
