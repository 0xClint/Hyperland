import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Admin, Game, Home } from "./pages";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { useStore } from "./hooks/useStore";
import { useEffect } from "react";
import { CONTRACT_ADDRESS } from "./utils/constants";
import { useAccounts } from '@mysten/dapp-kit';

function App() {
  const accounts = useAccounts();

  const client = new SuiClient({
    url: getFullnodeUrl("devnet"),
  });

  const [setNFTData, setWorldData] = useStore((state) => [
    state.setNFTData,
    state.setWorldData,
  ]);


  const fetch = async () => {
    // setLoader(true);
    if (accounts[0] && accounts[0].address) {

      const objects = await client.getOwnedObjects({
        owner:
          accounts[0].address,
      });
      let NFTData = [];
      let WorldData = [];
      let objectData = objects.data;

      for (let i = 0; i < objectData.length; i++) {
        const txn = await client.getObject({
          id: objectData[i].data.objectId,
          // fetch the object content field
          options: { showContent: true },
        });
        if (txn.data?.content.type.includes(CONTRACT_ADDRESS)) {
          const response = txn.data;
          if (response.content.fields.description == "land") {
            WorldData.push(response);
          } else {
            NFTData.push(response);
          }
        }
      }
      WorldData.sort(
        (a, b) =>
          parseInt(a.content.fields.name) - parseInt(b.content.fields.name)
      );
      console.log(NFTData, WorldData);
      setNFTData(NFTData);
      let latestWorldData = WorldData[WorldData.length - 1];
      console.log(latestWorldData);
      setWorldData(latestWorldData);
    }
  };

  useEffect(() => {
    fetch()
  }, [accounts])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/land/:id" exact element={<Game />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
