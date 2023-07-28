// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import '@unirep/contracts/Unirep.sol';

contract AttesterDescription {
  bool private isValid;

  Unirep public unirep;

  constructor(Unirep _unirep) {
    unirep = _unirep;
  }

  function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
    return interfaceId == 0x93c93c46;
  }

  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature,
    address _owner
  ) public pure returns (bool) {
    (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
    return ecrecover(getEthSignedMessageHash(_hash), v, r, s) == _owner;
  }

  function getEthSignedMessageHash(
    bytes32 _messageHash
  ) public pure returns (bytes32) {
    return
      keccak256(
        abi.encodePacked('\x19Ethereum Signed Message:\n32', _messageHash)
      );
  }

  function splitSignature(
    bytes memory sig
  ) public pure returns (bytes32 r, bytes32 s, uint8 v) {
    require(sig.length == 65, 'invalid signature length');

    assembly {
      r := mload(add(sig, 32))
      s := mload(add(sig, 64))
      v := byte(0, mload(add(sig, 96)))
    }
  }

  function getInterfaceId() external pure returns (bytes4) {
    return this.isValidSignature.selector;
  }
}
