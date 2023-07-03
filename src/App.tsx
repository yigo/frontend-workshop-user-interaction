import { useState } from "react";
import SearchPage from "./components/SearchPage";
import CreatePage from "./components/CreatePage";

export default function App() {
  const [tab, setTab] = useState("search");
  return (
    <>
      <div>
        <button onClick={() => setTab("search")}>Search</button>
        <button onClick={() => setTab("create")}>Create</button>
      </div>
      {tab === "search" && <SearchPage />}
      {tab === "create" && <CreatePage />}
    </>
  );
}
