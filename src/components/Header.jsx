import React, { useState, useEffect } from "react";
import { InfoIcon, chatIcon, gearIcon, profileIcon, shopIcon } from "../assets";
import { useStore } from "../hooks/useStore";
import ConnectWallet from "./ConnectWallet";
import Loader from "./Loader";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { makeFileObjects, uploadFile } from "../utils/lightouse";

const Header = ({ isHome }) => {
  const [loader, setLoader] = useState(false);
  const [
    cubes,
    items,
    chatBar,
    setChatBar,
    shopMenu,
    setShopMenu,
    settingMenu,
    setSettingMenu,
    activeWorldID,
    infoBar,
    setInfoBar,
    WorldData,
    NFTData,
    worldData,
  ] = useStore((state) => [
    state.cubes,
    state.items,
    state.chatBar,
    state.setChatBar,
    state.shopMenu,
    state.setShopMenu,
    state.settingMenu,
    state.setSettingMenu,
    state.activeWorldID,
    state.infoBar,
    state.setInfoBar,
    state.WorldData,
    state.NFTData,
    state.WorldData,
  ]);

  const { mutate: funcCall } = useSignAndExecuteTransactionBlock();

  const saveGameData = async () => {
    const txb = new TransactionBlock();
    setLoader(true);
    const objData = {
      cubes,
      items,
    };
    const CID = await uploadFile(await makeFileObjects(objData));
    console.log("CID : " + CID);
    txb.moveCall({
      target: `${CONTRACT_ADDRESS}::game::mint_to_sender`,
      arguments: [
        txb.pure(parseInt(worldData[0]?.content?.fields.name + 1).toString()),
        txb.pure(`land`),
        txb.pure(CID),
      ],
    });
    funcCall(
      {
        transactionBlock: txb,
      },
      {
        onError: (err) => {
          console.log(err);
        },
        onSuccess: (result) => {
          console.log(result);
          setLoader(false);
        },
      }
    );
  };
  // console.log(
  //   NFTData,
  //   (parseInt(worldData[0]?.content?.fields.name) + 1).toString()
  // );
  return (
    <div className="absolute z-10 top-0 w-screen flex flex-col">
      <div className="w-full flex text-[2rem] justify-between items-center h-16 px-5 ">
        <div className="flex gap-4 items-start">
          {!isHome && (
            <img
              src={chatIcon}
              className="h-9 hover:scale-105 cursor-pointer"
              onClick={() => setChatBar(!chatBar)}
            />
          )}
          {!isHome && (
            <div>
              <img
                src={InfoIcon}
                className="h-7 hover:scale-105 cursor-pointer"
                onClick={() => setInfoBar(!infoBar)}
              />
              {infoBar && (
                <ul className="absolute translate-y-1 bg-white rounded-md text-[18px] py-2 px-3 font-vt">
                  <li>To exist view press ESC</li>
                  <li> Click on the center pointer to continue</li>
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-3">
          <ConnectWallet />
          {!isHome && (
            <button
              className="btn hover:scale-[102%] text-white"
              style={{ backgroundColor: "#5A5A8E" }}
              onClick={() => saveGameData()}
            >
              Save
            </button>
          )}
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Header;
