import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header, Loader } from "../components";
import { bgImg } from "../assets";
import { useStore } from "../hooks/useStore";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { makeFileObjects, uploadFile } from "../utils/lightouse";

const Home = () => {
  const [loader, setLoader] = useState(false);
  const [controlMenu, setControlMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [loadGame, setLoadGame] = useState(false);
  const [lworldData, setLWorldData] = useState("");
  const [newWorldMenu, setNewWorldMenu] = useState(false);
  const [worldName, setWorldName] = useState("");
  // const [worldID, setWorldID] = useState("");
  const [worldDescription, setWorldDescription] = useState("");
  const navigate = useNavigate();
  const { mutate: funcCall } = useSignAndExecuteTransactionBlock();

  const [setNFTData, worldData, isSuiInstalled] = useStore((state) => [
    state.setNFTData,
    state.WorldData,
    state.isSuiInstalled,
  ]);

  const client = new SuiClient({
    url: getFullnodeUrl("devnet"),
  });

  const createWorld = async () => {
    setLoader(true);
    console.log("creating world");
    const CID = await uploadFile(
      await makeFileObjects({ cubes: [], items: [] })
    );
    // const CID = await uploadWeb3(
    //   await makeFileObjects({ cubes: [], items: [] })
    // );

    const txb = new TransactionBlock();

    setLoader(true);
    txb.moveCall({
      target: `${CONTRACT_ADDRESS}::game::mint_to_sender`,
      arguments: [txb.pure("2"), txb.pure(`land`), txb.pure(CID)],
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
          navigate(`/land/${CID}`);
        },
      }
    );
  };
  console.log(isSuiInstalled);
  return (
    <div className="homepage">
      {newWorldMenu && (
        <div className="control setting menu absolute h-screen w-screen make-flex">
          <div>
            <div
              className="absolute w-[500px]  make-flex justify-end px-2 pt-2 cursor-pointer"
              onClick={() => setNewWorldMenu(false)}
            >
              <span>X</span>
            </div>
            <div className="z-100 gameloader-container w-[500px] min-h-[200px] py-7 card-container make-flex justify-start flex-col gap-3 px-7">
              <div className="w-full">
                <label className="">Name of World</label>
                <input
                  type="text"
                  value={worldName}
                  onChange={(e) => setWorldName(e.target.value)}
                  className="border-2 mt-1 border-black w-full px-1 text-xl h-10 rounded-md font-vt"
                />
              </div>
              <div className="w-full">
                <label>Description</label>
                <textarea
                  value={worldDescription}
                  onChange={(e) => setWorldDescription(e.target.value)}
                  className="border-2 mt-1 border-black w-full px-1 text-xl h-20 rounded-md font-vt"
                />
              </div>
              <button
                className="btn py-3 px-6 text-md text-white bg-[#5A5A8E] hover:scale-[102%]"
                onClick={() => createWorld()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {!isSuiInstalled && (
        <div className="control setting menu absolute h-screen w-screen make-flex">
          <div>
            <div
              className="absolute w-[500px] make-flex justify-end px-2 pt-2 cursor-pointer"
              onClick={() => setProfileMenu(false)}
            >
              <span>X</span>
            </div>
            <div className=" z-100 menu-container w-[500px]  py-12 px-8 card-container">
              <div className="img-container make-flex mb-8 ">
                <h2>Please install sui Wallet!</h2>
              </div>
              <div className=" m-auto flex justify-center ">
                <a
                  className="text-center cursor-pointer text-blue-800 underline"
                  href="https://chromewebstore.google.com/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
                  target="_blank"
                >
                  install sui wallet
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {profileMenu && (
        <div className="control setting menu absolute h-screen w-screen make-flex">
          <div>
            <div
              className="absolute w-[500px] make-flex justify-end px-2 pt-2 cursor-pointer"
              onClick={() => setProfileMenu(false)}
            >
              <span>X</span>
            </div>
            <div className=" z-100 menu-container w-[500px]  py-12 px-8 card-container">
              <div className="img-container make-flex mb-8 ">
                <img className="w-60 h-60 rounded-2xl bg-slate-500" />
              </div>
              <ul className=" make-flex flex-col gap-8 ">
                <li className=" flex justify-between w-[80%]">
                  <div className="">Name</div>
                  <div className="">John</div>
                </li>
                <li className=" flex justify-between w-[80%]">
                  <div className="">100</div>
                  <div className="">Destroy</div>
                </li>
                <li className=" flex justify-between w-[80%]">
                  <div className="">Rank</div>
                  <div className="">#13</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <Header isHome={true} />
      {controlMenu && (
        <div className="control z-10 setting menu absolute h-screen w-screen make-flex">
          <div>
            <div
              className="absolute w-[500px] make-flex justify-end px-2 pt-2 cursor-pointer"
              onClick={() => setControlMenu(false)}
            >
              <span>X</span>
            </div>
            <ul className=" z-100 menu-container w-[500px]  py-12 card-container make-flex flex-col gap-8 ">
              <li className=" flex justify-between w-[80%] ">
                <div className="">W</div>
                <div className="">Forward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">A</div>
                <div className="">Leftward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">D</div>
                <div className="">Backward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">S</div>
                <div className="">Forward</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">C</div>
                <div className="">Chatbox</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Q</div>
                <div className="">Inventory</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">E</div>
                <div className="">Setting</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">B</div>
                <div className="">Buy</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Space</div>
                <div className="">Jump</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Click</div>
                <div className="">Build</div>
              </li>
              <li className=" flex justify-between w-[80%]">
                <div className="">Alt+Click</div>
                <div className="">Destroy</div>
              </li>
            </ul>
          </div>
        </div>
      )}
      <img src={bgImg} className="absolute -z-10 h-screen w-screen" />
      <div className="make-flex w-screen h-screen flex-col">
        <div className="w-[600px] mx-auto h-screen flex-col make-flex justify-start pt-32 gap-2">
          <h2 className="font-bold text-[40px] text-center my-12 make-flex">
            Hyperland
          </h2>

          {worldData.length ? (
            <button
              className="btn w-[400px] hover:bg-[#f4f4f4] text-base"
              onClick={() =>
                navigate(`/land/${worldData[0].content.fields.url}`)
              }
            >
              Continue Game
            </button>
          ) : (
            <button
              className="btn w-[400px] hover:bg-[#f4f4f4] text-base"
              onClick={() => createWorld()}
            >
              Create Land
            </button>
          )}
          <button
            className="btn w-[400px] hover:bg-[#f4f4f4] text-base"
            onClick={() => setProfileMenu(true)}
          >
            Profile
          </button>

          <button
            className="btn w-[400px] hover:bg-[#f4f4f4] text-base"
            onClick={() => setControlMenu(true)}
          >
            Game Settings
          </button>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Home;
