import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/Home.tsx';
import Layout from './pages/Layout.tsx';
import PokeSearch from './pages/PokeSearch.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login.tsx';
import SendTokens from './pages/SendTokens.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // disable all retries
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search/:name?" element={<PokeSearch />} />
            <Route path="login" element={<Login />} />
            <Route path="sendtokens" element={<SendTokens />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
