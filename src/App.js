import { Main } from "./components/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </div>
  );
}

export default App;
