import React, { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import * as imgSrc from "../images/Items/index";
import Loader from "./Loader";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { CONTRACT_ADDRESS } from "../utils/constants";

const Shop = () => {
  const [setShopMenu, allNFTsData, NFTData] = useStore((state) => [
    state.setShopMenu,
    state.allNFTsData,
    state.NFTData,
  ]);
  const { mutate: funcCall } = useSignAndExecuteTransactionBlock();

  const [loader, setLoader] = useState(false);
  const [buyMenu, setBuyMenu] = useState(false);
  const [buyNFTdata, setBuyNFTData] = useState("");

  const purchase = async (name, cid) => {
    const txb = new TransactionBlock();

    setLoader(true);
    txb.moveCall({
      target: `${CONTRACT_ADDRESS}::game::mint_to_sender`,
      arguments: [
        txb.pure(name),
        txb.pure(`${name} Description`),
        txb.pure(cid),
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
          setBuyMenu(false);
          window.location.reload();
        },
      }
    );
  };

  return (
    <div
      className="card-box absolute z-100 make-flex w-screen h-screen"
      style={{ background: "rgba(223, 223, 223, 0.22)" }}
    >
      {buyMenu && (
        <div className="menu absolute z-10 make-flex w-screen h-screen">
          <div
            className="absolute z-10 translate-x-[180px] -translate-y-[130px] cursor-pointer"
            onClick={() => setBuyMenu(false)}
          >
            X
          </div>
          <div className="w-[400px] h-[300px] bg-white rounded-lg make-flex justify-start flex-col gap-1  px-5 pt-7 shadow-xl border-2 border-[#323232]">
            <div className="make-flex justify-between w-full px-3">
              <h3 className=" w-full ">{buyNFTdata.texture}</h3>
              {/* <h3 className=" w-full text-right make-flex gap-2">
                <span className="font-vt"> (NFTs remaining)</span>
                {buyNFTdata.itemTotalSupply - buyNFTdata.totalSold}/
                {buyNFTdata.itemTotalSupply}
              </h3> */}
            </div>
            <div className="w-full h-[170px] make-flex flex-col border-2 border-[#8b8b8b] rounded-lg">
              <img src={buyNFTdata.src} alt="landImg" className="h-[60%] " />
            </div>
            <div className="w-full make-flex justify-between my-2">
              <div className=" py-2 px-3 border make-flex rounded-md bg-[#e9e9e9] h-8 text-lg w-[160px]">
                5$
              </div>
              <button
                className="btn w-[100px] hover:scale-105"
                onClick={() => purchase(buyNFTdata.texture, buyNFTdata.cid)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="menu-container flex min-w-[900px] flex-col card-container p-7">
        <div className=" w-full ">
          <div className="w-full make-flex justify-end">
            <div
              className="absolute  cursor-pointer translate-x-6 -translate-y-3"
              onClick={() => setShopMenu(false)}
            >
              X
            </div>
          </div>
          <div className="relative -translate-y-3">Marketplace</div>
        </div>
        <div className="flex h-auto min-h-[500px]  gap-7">
          <div className="right-menu w-[1070px] flex flex-wrap gap-2">
            {imgSrc["imgData"]?.map(({ cid, texture, src }) => {
              return (
                <div
                  key={cid}
                  onClick={() => {
                    setBuyNFTData({
                      cid,
                      texture,
                      src,
                    });
                    setBuyMenu(true);
                  }}
                  className="w-[170px] cursor-pointer h-[200px] rounded-xl flex flex-col gap-1  justify-end p-2 pt-2 items-center shadow-xl border-2 border-[#323232] hover:scale-[101%]"
                >
                  <div className="flex justify-between w-full px-1">
                    <h3 className=" w-full ">{texture}</h3>
                    <button className="font-light text-[0.7rem] px-1 bg-[#50BA4A] rounded-lg">
                      buy
                    </button>
                  </div>
                  <div className="w-[155px]  h-[180px] make-flex flex-col border-2 border-[#8b8b8b] rounded-xl">
                    <img
                      src={src}
                      alt="landImg"
                      className="w-[60%] h-auto -translate-y-5"
                    />
                  </div>
                  <div className="absolute py-2 px-3 h-8 text-[0.65rem] w-[140px] bg-[#5A5A8E] rounded-2xl flex justify-between -translate-y-2 text-white">
                    <span></span>
                    <span>5$</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Shop;
