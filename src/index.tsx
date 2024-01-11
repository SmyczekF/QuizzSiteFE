import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { CredentialsContextProvider } from './shared/providers/credentialsProvider';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <Notifications />
          <CredentialsContextProvider>
            {/* TODO Suspense should look normal not just plain loading text */}
            <Suspense fallback="loading">
              <App />
            </Suspense>
          </CredentialsContextProvider>
        </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
  
);

reportWebVitals();
