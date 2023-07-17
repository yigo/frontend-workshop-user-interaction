import { useState } from "react";
import SearchPage from "./components/SearchPage";
import CreatePage from "./components/CreatePage";
import ListPage from "./components/ListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  const [tab, setTab] = useState("list");
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <button onClick={() => setTab("list")}>list</button>
        <button onClick={() => setTab("search")}>Search</button>
        <button onClick={() => setTab("create")}>Create</button>
      </div>
      {tab === "list" && <ListPage />}
      {tab === "search" && <SearchPage />}
      {tab === "create" && <CreatePage />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
