import React, { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";
import {
  diamondImg,
  grassImg,
  glassImg,
  woodImg,
  quartzImg,
  stoneImg,
  treeImg,
} from "../images/block_icons/images";
import "../pages/Game.css";
import { BagIcon, InventoryIcon, gearIcon, shopIcon } from "../assets";

const images = {
  grass: grassImg,
  tree: treeImg,
  glass: glassImg,
  wood: woodImg,
  diamond: diamondImg,
  quartz: quartzImg,
  stone: stoneImg,
};

const TextureSelector = () => {
  const [
    activeTexture,
    setTexture,
    chatBar,
    setChatBar,
    inventoryBar,
    setInventoryBar,
    settingMenu,
    setSettingMenu,
    shopMenu,
    setShopMenu,
    infoBar,
    setInfoBar,
  ] = useStore((state) => [
    state.blockTexture,
    state.setBlockTexture,
    state.chatBar,
    state.setChatBar,
    state.inventoryBar,
    state.setInventoryBar,
    state.settingMenu,
    state.setSettingMenu,
    state.shopMenu,
    state.setShopMenu,
    state.infoBar,
    state.setInfoBar,
  ]);
  const {
    grass,
    tree,
    glass,
    wood,
    diamond,
    quartz,
    stone,
    chatMenu,
    inventory,
    settings,
    buyMenu,
    infoMenu,
  } = useKeyboard();

  useEffect(() => {
    const textures = {
      grass,
      tree,
      glass,
      wood,
      diamond,
      quartz,
      stone,
      chatMenu,
      inventory,
      settings,
      buyMenu,
      infoMenu,
    };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);

    if (pressedTexture) {
      if (pressedTexture[0] == "chatMenu") {
        setChatBar(!chatBar);
      } else if (pressedTexture[0] == "inventory") {
        setInventoryBar(!inventoryBar);
      } else if (pressedTexture[0] == "settings") {
        setSettingMenu(!settingMenu);
      } else if (pressedTexture[0] == "buyMenu") {
        setShopMenu(!shopMenu);
      } else if (pressedTexture[0] == "infoMenu") {
        setInfoBar(!infoBar);
      } else {
        setTexture(pressedTexture[0]);
      }
      console.log(pressedTexture[0]);
    }
  }, [
    setTexture,
    grass,
    tree,
    glass,
    wood,
    diamond,
    quartz,
    stone,
    chatMenu,
    inventory,
    settings,
    buyMenu,
    infoMenu,
  ]);

  return (
    <div className="">
      <span
        className="absolute bottom-4 cursor-pointer z-10 left-16"
        onClick={() => setInventoryBar(!inventoryBar)}
      >
        <img src={InventoryIcon} className="h-8 hover:scale-105" />
      </span>

      <span
        className=" absolute bottom-4 cursor-pointer z-10 left-4"
        onClick={() => setSettingMenu(!settingMenu)}
      >
        <img src={gearIcon} className="h-9 hover:scale-105" />
      </span>
      <div className="absolute bottom-0 make-flex w-screen">
        <div className="make-flex texture-selector">
          {Object.entries(images).map(([k, src], index) => {
            return (
              <div>
                <span className="absolute text-[10px] m-1">{index + 1}</span>
                <img
                  key={k}
                  src={src}
                  style={{ scale: "1" }}
                  className={`${k === activeTexture ? "active" : ""}`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <span
        className="absolute bottom-4 cursor-pointer z-10 right-4"
        onClick={() => setShopMenu(!shopMenu)}
      >
        <img src={shopIcon} className="h-9 hover:scale-105" />
      </span>
    </div>
  );
};

export default TextureSelector;
