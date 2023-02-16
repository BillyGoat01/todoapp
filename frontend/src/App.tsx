import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from './utils/trpc';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Task from './pages/task';
import Completed from './pages/completed';


export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.REACT_APP_API_URL}/todo`
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/todo' element={<Home/>} />
            <Route path='/todo/:todoid' element={<Task/>} />
            <Route path='/todo/complete' element={<Completed/>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  );
}




