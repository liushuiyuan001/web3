// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.4;

contract Car {
    string public brand;

    constructor(string memory initialBrand) public {
        brand = initialBrand;
    }

    function setBrand(string memory newBrand) public {
        brand = newBrand;
    }
}