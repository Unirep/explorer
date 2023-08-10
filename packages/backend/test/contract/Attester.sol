// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Unirep} from '@unirep/contracts/Unirep.sol';

contract Attester {
    Unirep public unirep;
    constructor(
        Unirep _unirep
    ) {
        // set UniRep address
        unirep = _unirep;
        // sign up as an attester
        unirep.attesterSignUp(300);
    }
}