import React, { useEffect, useState } from "react";
import { Physics } from "@react-three/cannon";
import "./Game.css";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { PointerLockControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Cubes,
  FPP,
  Ground,
  Header,
  Inventory,
  Items,
  Loader,
  Menu,
  Player,
  Shop,
  StartMenu,
  TempCube,
  TextureSelector,
} from "../components";
import { useStore } from "../hooks/useStore";
import { useParams } from "react-router-dom";
import { CONTRACT_ADDRESS } from "../utils/constants";
import axios from "axios";

const Game = () => {
  const [
    menu,
    setMenu,
    shopMenu,
    setShopMenu,
    settingMenu,
    inventoryBar,
    setInventoryBar,
    items,
    setData,
    setNFTData,
    setAllNFTsData,
  ] = useStore((state) => [
    state.menu,
    state.setMenu,
    state.shopMenu,
    state.setShopMenu,
    state.settingMenu,
    state.inventoryBar,
    state.setInventoryBar,
    state.items,
    state.setData,
    state.setNFTData,
    state.setAllNFTsData,
  ]);

  const [loader, setLoader] = useState(false);
  const params = useParams();

  const client = new SuiClient({
    url: getFullnodeUrl("devnet"),
  });

  const fetch = async () => {
    // setLoader(true);
    const objects = await client.getOwnedObjects({
      owner:
        "0x2960279b3a26e5f0de26b820df947720803dd612082d94d8687f3d4cf14beb32",
    });
    let data = [];
    let objectData = objects.data;

    for (let i = 0; i < objectData.length; i++) {
      const txn = await client.getObject({
        id: objectData[i].data.objectId,
        // fetch the object content field
        options: { showContent: true },
      });
      if (txn.data?.content.type.includes(CONTRACT_ADDRESS))
        data.push(txn.data);
    }
    console.log(data);
    setNFTData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      // const data = await retrieveData(params.id);
      const res = await axios.get(
        `https://ipfs.io/ipfs/${params.id}/world.json`
      );
      console.log(res.data);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="game-app">
      <Canvas style={{ height: "100vh" }}>
        <Sky sunPosition={[10, 10, 20]} turbidity={1} />
        <ambientLight intensity={0.6} />
        <PointerLockControls selector="#enter-game" />
        <Physics>
          <Player />
          <Ground />
          <Items />
          <Cubes />
        </Physics>
      </Canvas>
      <div
        className="absolute centered cursor enter-game"
        style={{ zIndex: 1, cursor: "pointer" }}
        id="enter-game"
      >
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
          <path
            d="M9.54849 23V0H13.4515V23H9.54849ZM0 13.4515V9.54849H23V13.4515H0Z"
            fill="white"
          />
        </svg>
      </div>
      <TextureSelector />
      {shopMenu && <Shop />}
      {settingMenu && <Menu />}
      {inventoryBar && <Inventory />}
      <Header />
      {loader && <Loader />}
      {/* {menu && <StartMenu />} */}
    </div>
  );
};

export default Game;
