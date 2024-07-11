import "./style.css";
import NavbarComponent from "./components/NavbarComponent";
import HomeComponent from "./components/HomeComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProjectComponent from "./components/CreateProjectComponent";
import DiscoverComponent from "./components/DiscoverComponent";
import ProjectComponent from "./components/ProjectComponent";
import ProfileComponent from "./components/ProfileComponent";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "./abi";
const CONTRACT_ADDRESS = "0xad7C61FC480E5EEBA7886Fc62A789F9921caC9d7";

function App() {
  const [myContract, setMyContract] = useState(null);
  const [address, setAddress] = useState();
  let provider, signer, add;

  async function changeNetwork() {
    // switch network to avalanche
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa869" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xa869",
                chainName: "Avalanche Fuji Testnet",
                nativeCurrency: {
                  name: "Avalanche",
                  symbol: "AVAX",
                  decimals: 18,
                },
                rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
              },
            ],
          });
        } catch (addError) {
          alert("Error in add avalanche FUJI testnet");
        }
      }
    }
  }

  // Connects to Metamask and sets the myContract state with a new instance of the contract
  async function connect() {
    let res = await connectToMetamask();
    if (res === true) {
      await changeNetwork();
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner()
      add = await signer.getAddress();
      setAddress(add);

      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        setMyContract(contract);
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly");
        console.log(err);
      }
     
    } else {
      alert("Couldn't connect to Metamask");
    }
  }

  // Helps open Metamask
  async function connectToMetamask() {
    try {
      await window.ethereum.enable();
      return true;
    } catch (err) {
      return false;
    }
  }

  useEffect(()=>{
    const connectContract = async ()=>{
      provider = new ethers.providers.Web3Provider(window.ethereum);

      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
        setMyContract(contract);
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly");
        console.log(err);
      }
    }
    connectContract()
  },[])
  // const checkConnected = (component) => {
  //   return !myContract ? (
  //     <ConnectWallet connectMetamask={connect} />
  //   ) : (
  //     component
  //   );
  // };

  console.log(address)
  console.log(myContract)
  return (
    <div className="app">
      {
      myContract && <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <NavbarComponent address={address} connectMetamask={connect} />
        <Routes>
          <Route
            path="/"
            element={<HomeComponent contract={myContract} />}
          />
          <Route
            path="create_project"
            element={
              <CreateProjectComponent contract={myContract} userAddress={address} connectMetamask={connect}/>
            }
          />
          <Route
            path="discover"
            element={
              <DiscoverComponent contract={myContract} />
            }
          />
          <Route
            path="profile"
            element={
              <ProfileComponent contract={myContract} userAddress={address} />
            }
          />
          <Route
            path="project"
            element={
              <ProjectComponent contract={myContract} userAddress={address} />
            }
          />
        </Routes>
        {myContract && <FooterComponent />}
      </BrowserRouter>
      </>
      }
    </div>
  );
}

export default App;
