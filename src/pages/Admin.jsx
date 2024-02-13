import React from "react";

const Admin = () => {
  return (
    <div className="adminpage w-screen flex px-20 gap-10 pt-10">
      <div className="w-1/2 make-flex flex-col">
        {/* <button className="btn" onClick={() => createItem()}>
          New Item
        </button>
        <button className="btn" onClick={() => listonMarket()}>
          List Item
        </button> */}
      </div>
      <div className="w-1/2 make-flex flex-col">
        {/* <button className="btn" onClick={() => purchase()}>
          Purchase
        </button>
        <button className="btn" onClick={() => getUserNFTs()}>
          Fetch User NFTs
        </button>
        <button className="btn" onClick={() => getCreatorNFTs()}>
          Fetch Creator NFTs
        </button>
        <button className="btn" onClick={() => getAllNFTsMinted()}>
          Get all NFTs minted
        </button> */}
      </div>
    </div>
  );
};

export default Admin;
