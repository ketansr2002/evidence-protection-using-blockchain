import Web3Modal from "web3modal";

import tracking from "../context/Tracking.json";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

// FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  const DappName = "Product Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log(items);

    const { receiver, pickupTime, distance, price } = items;

    try {
      // const web3Modal = new Web3Modal();
      // const connection = await web3Modal.connect();
      const provider = new ethers.providers.JsonRpcProvider();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 0),
        {
          value: ethers.utils.parseUnits(price, 0),
        }
      );
      console.log(createItem);
    } catch (error) {
      console.log("Something went wrong ", error);
    }
  };

  const getAllShipment = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const shipments = await contract.getAllTransactions();
      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));

      return allShipments;
    } catch (error) {
      console.log("error in getting shipment ", error);
    }
  };

  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) return "Install Metamask";

      const accouts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentsCount = await contract.getShipmentsCount(accouts[0]);
      return shipmentsCount.toNumber();
    } catch (error) {
      console.log("error occured in finding shipment counts ", error);
    }
  };

  const completeShipment = async (completeShip) => {
    console.log(completeShip);

    const { receiver, index } = completeShip;

    try {
      if (!window.ethereum) return "install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit: 30000,
        }
      );

      transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log("wrong completeShipment ", error);
    }
  };

  const getShipment = async (index) => {
    // index=parseInt(index);
    console.log(index );
    try {
      if (!window.ethereum) return "install metmask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      console.log("Your Address : ",accounts[0]);
      const shipment = await contract.getShipment(index * 1);

      const SingleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        distance: shipment[4].toNumber(),
        price: ethers.utils.formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };
      console.log(shipment);
      return SingleShipment;
    } catch (error) {
      console.log("no shipment error ", error);
    }
  };

  const startShipment = async (getProduct) => {
    const { receiver, index } = getProduct;

    try {
      if (!window.ethereum) return "install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );

      shipment.wait();
      console.log(shipment);
    } catch (error) {
      console.log("error no shipment", error);
    }
  };

  // CHECK WALLET CONNECTION
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No account";
      }
    } catch (error) {
      console.log("No account ", error);
    }
  };

  // CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    console.log("connection to wallet started");
    try {
      console.log("connection to wallet ");
      if (!window.ethereum) return "install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      return "something went wrong", error;
    }
  };

  useEffect(() => {
    console.log("checkis wallet connected calledx");
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
