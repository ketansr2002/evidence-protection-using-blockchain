const { expect } = require("chai");

describe("Tracking", function () {
  it("The First Deploy check", async function () {
    const Tracker = await ethers.getContractFactory("Tracking");
    const tracker = await Tracker.deploy();
    expect(await tracker.shipmentCount()).to.equal(0);
    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
  it("The First createShipment", async ()=>{
    const Tracker = await ethers.getContractFactory("Tracking");
    const tracker = await Tracker.deploy();

    const firstShipments= await tracker.createShipment(
        "0x136B439fA271d91a9f80ED0560cE8f8AD889109f",
        20230823,
        123,
        0
    );
    expect(await tracker.shipmentCount()).to.equal(1);

  })
  it("Get the Created Shipment", async ()=>{
    const Tracker = await ethers.getContractFactory("Tracking");
    const tracker = await Tracker.deploy();

    const firstShipments= await tracker.createShipment(
        "0x136B439fA271d91a9f80ED0560cE8f8AD889109f",
        20230823,
        123,
        0
    );
    expect(await tracker.shipmentCount()).to.equal(1);

    const getResult = await tracker.getShipment(
        // '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
        0
    )
    console.log(getResult)

  })
  it("The Start Shipment", async ()=>{
    const Tracker = await ethers.getContractFactory("Tracking");
    const tracker = await Tracker.deploy();

    const firstShipments= await tracker.createShipment(
        "0x136B439fA271d91a9f80ED0560cE8f8AD889109f",
        20230823,
        123,
        0
    );

    await tracker.startShipment(
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        '0x136B439fA271d91a9f80ED0560cE8f8AD889109f',
        0
    );

    const getResult = await tracker.getShipment(
        // '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
        0
    )
    console.log(getResult)
    expect(getResult[6]).to.equal(1)

    expect(await tracker.shipmentCount()).to.equal(1);

  })
  it("Complete Shipment", async ()=>{
    const Tracker = await ethers.getContractFactory("Tracking");
    const tracker = await Tracker.deploy();

    const firstShipments= await tracker.createShipment(
        "0x136B439fA271d91a9f80ED0560cE8f8AD889109f",
        20230823,
        123,
        0
    );
    await tracker.startShipment(
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        '0x136B439fA271d91a9f80ED0560cE8f8AD889109f',
        0
    );
    
    await tracker.completeShipment(
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        '0x136B439fA271d91a9f80ED0560cE8f8AD889109f',
        0
    );
        
    const getResult = await tracker.getShipment(
        // '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
        0
    )
    console.log(getResult)
    // expect(await tracker.shipmentCount()).to.equal(1);
    expect(getResult[6]).to.equal(2)

  })
});