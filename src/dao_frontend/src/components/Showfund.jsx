import useWalletAuth from "../zustand/wallet_auth";
import React, { useState,useEffect } from "react";
import { twMerge } from "tailwind-merge";
import './loader.css'
import { Principal } from "@dfinity/principal";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";
import ic from "ic0";
const ledger = ic("eoxkn-6qaaa-aaaap-ab3ta-cai");

function Showfund() {
  const { Id, balance, ShowFund, setShowFund } = useWalletAuth();
  const [copySuccess, setCopySuccess] = useState("");
  const [points, setPoints] = setPoints(0);

  const { isConnected, principal, activeProvider, disconnect } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(Id)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000); // Message disappears after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
        setCopySuccess("Failed to copy!");
        setTimeout(() => setCopySuccess(""), 2000);
      });
  };

  function handleDisconnect() {
    disconnect();
    setShowFund(false);
  }
  useEffect(() => {
    async function fetchBalance() {
      if (principal) {
        try {
          const store3 = await ledger.call("icrc1_balance_of", {
            owner: Principal.fromText(principal),
            subaccount: [],
          });
          setPoints(Number(Number(store3) / 100000000)+1);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    }

    fetchBalance();
  }, [ points]);

  return (
    <>
      {ShowFund && (
          <div className="main_div column">
            <div className="card_div column">
              <div className="row cancel_main">
                <button
                  onClick={() => setShowFund(false)}
                  className="cancel_div"
                >
                  <span className="cancel">x</span>
                </button>
              </div>
              <div className="column data_div">
                <div className="row first_section">
                  <span className="font-bold text-[20px]"> Your ICP Address:</span>
                  <span className="text-[20px]">
                  <span className="text-[20px] flex items-center space-x-2 id_div">
                  {Id && `${Id.substring(0, 5)}...${Id.substring(Id.length - 5)}`}
                    <img
                      src="./copy.svg"
                      onClick={copyToClipboard}
                      alt="Copy to clipboard"
                      style={{ cursor: "pointer" }}
                    />
                    {copySuccess && (
                      <span style={{ color: "green" }}>{copySuccess}</span>
                    )}
                  </span>
                  </span>
                </div>
              </div>

              <div className="column data_div">
                <div className="column second_section">
                  <span className="text-[20px] flex text-start">
                   Your  points : {points}
                  </span>
                </div>
              </div>
              <div className="row logout_transfer">
                <p></p>
                <button
                  className={`${twMerge(
                    `logout_btn_style`
                  )}`}
                  onClick={handleDisconnect}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
      )}
    </>
  );
}

export default Showfund;
