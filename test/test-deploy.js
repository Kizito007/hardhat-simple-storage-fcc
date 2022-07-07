const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store", async function () {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should add persons name and favorite number", async function () {
    let person = {
      name: "Strange",
      favoriteNumber: 7,
    };

    const transactionResponse = await simpleStorage.addPerson(
      person.name,
      person.favoriteNumber
    );
    await transactionResponse.wait(1);

    //supposed to find this in mapping but...
    const people = await simpleStorage.people(0);
    assert.equal(people.name.toString(), person.name);
  });
});
