// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AttesterDescription {
  bool private isValid;
  string public text;

  bytes4 internal constant MAGICVALUE = 0x1626ba7e;

  function supportsInterface(bytes4 interfaceId) external view returns (bool) {
    return interfaceId == 0x0c2f9f3f;
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
  ) public returns (bool didSet) {
    if (isValidSignature(_hash, _signature)) {
      text = _text;
    }
  }

  function getDescription() public view returns (string memory description) {
    return text;
  }

  function helloWorld() public pure returns (string memory ret) {
    return 'Hello Solidity!';
  }
}
