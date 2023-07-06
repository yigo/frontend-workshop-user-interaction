import { useState } from "react";
import SearchPage from "./components/SearchPage";
import CreatePage from "./components/CreatePage";
import ListPage from "./components/ListPage";

export default function App() {
  const [tab, setTab] = useState("list");
  return (
    <>
      <div>
        <button onClick={() => setTab("list")}>list</button>
        <button onClick={() => setTab("search")}>Search</button>
        <button onClick={() => setTab("create")}>Create</button>
      </div>
      {tab === "list" && <ListPage />}
      {tab === "search" && <SearchPage />}
      {tab === "create" && <CreatePage />}
    </>
  );
}
