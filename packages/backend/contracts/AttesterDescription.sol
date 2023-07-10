// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8;

import {Unirep} from '@unirep/contracts/Unirep.sol';

contract AttesterDescription {
  bool private isValid;
  bytes4 internal constant MAGICVALUE = 0x1626ba7e;

  Unirep public unirep;

  constructor(Unirep _unirep) {
    unirep = _unirep;
    unirep.attesterSignUp(2 ** 32);
  }

  function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
    return interfaceId == 0x93c93c46;
  }

  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature
  ) public view returns (bool) {
    (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
    return ecrecover(getEthSignedMessageHash(_hash), v, r, s) == msg.sender;
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
