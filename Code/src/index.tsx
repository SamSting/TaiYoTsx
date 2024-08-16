import React from 'react';
import ReactDOM from 'react-dom/client';  
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from './store'; // Ensure you import your Redux store
import 'leaflet/dist/leaflet.css';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);  
  root.render(
    <React.StrictMode>
      <Provider store={store}> {/* Add Redux Provider */}
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');  
}
