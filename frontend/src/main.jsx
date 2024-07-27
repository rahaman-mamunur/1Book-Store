import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import AuthProvider from './provider/AuthContext.jsx';
import BookProvider from './provider/BookContext.jsx';
import { router } from './routes/Routes.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BookProvider>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-screen-xl mx-auto">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </BookProvider>
  </AuthProvider>
);
