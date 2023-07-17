import { useState, lazy, Suspense } from "react";
const SearchPage = lazy(() => import("./components/SearchPage"));
const CreatePage = lazy(() => import("./components/CreatePage"));
const ListPage = lazy(() => import("./components/ListPage"));
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  const [tab, setTab] = useState("list");
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="loading...">
        <div>
          <button onClick={() => setTab("list")}>list</button>
          <button onClick={() => setTab("search")}>Search</button>
          <button onClick={() => setTab("create")}>Create</button>
        </div>
        {tab === "list" && <ListPage />}
        {tab === "search" && <SearchPage />}
        {tab === "create" && <CreatePage />}
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
