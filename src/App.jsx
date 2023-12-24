import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppNav, CurrentWeather } from "./components"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import { Home } from "./pages"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppNav />

        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path="/current" exact element={<CurrentWeather />} />
          <Route path="/current" exact element={<h1>Home</h1>} />
          <Route path="/current" exact element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
