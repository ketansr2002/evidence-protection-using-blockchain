import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Form,
  Services,
  StartShipment,
  Profile,
  CompleteShipment,
  GetShipment,
} from "@/components/index";
import { TrackingContext } from "@/context/TrackingContext";

export default function Home() {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentCount,
  } = useContext(TrackingContext);

  //state variables
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);

  //Data state variables
  const [allShipmentsData, setAllShipmentsData] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipment();

    return async () => {
      const allData = await getCampaignsData;
      setAllShipmentsData(allData);
    };
  }, []);

  return (
    <>
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
      />
      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsData={allShipmentsData}
      />
      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />
      <Profile
        setOpenProfile={setOpenProfile}
        openProfile={openProfile}
        currentUser={currentUser}
        getShipmentCount={getShipmentCount}
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />
    </>
  );
}
