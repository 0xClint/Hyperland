import React, { useEffect } from "react";
// import { useMoralis } from "react-moralis";
import { bagPixel, profileIcon } from "../assets";
import {
  ConnectButton,
  useConnectWallet,
  useWallets,
  useAccounts,
} from "@mysten/dapp-kit";
import { useStore } from "../hooks/useStore";

const ConnectWallet = () => {
  const [setSuiInstall] = useStore((state) => [state.setSuiInstall]);
  const wallets = useWallets();
  const accounts = useAccounts();
  const { mutate: connect } = useConnectWallet();
  console.log("account : " + accounts);

  useEffect(() => {
    const isSuiWallet = () => {
      if (!wallets.length) {
        console.log("no Wallet!");
        setSuiInstall(false);
      }
    };
    isSuiWallet();
  }, []);

  return (
    <div className="flex justify-center  items-center">
      {accounts?.length ? (
        <div className="btn flex items-center gap-2">
          <img src={profileIcon} className="w-6" />
          {/* {accounts
            ? `${accounts.slice(0, 4)}..${accounts.slice(accounts.length - 4)}`
            : ""} */}
        </div>
      ) : (
        <div>
          <ConnectButton className="hidden " />
          <ul>
            {wallets.map((wallet) => (
              <li key={wallet.name}>
                <button
                  className="btn hover:scale-[102%] -translate-y-[7px]"
                  onClick={() => {
                    connect(
                      { wallet },
                      {
                        onSuccess: () => console.log("connected"),
                      }
                    );
                  }}
                >
                  Connect Sui Wallet
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
