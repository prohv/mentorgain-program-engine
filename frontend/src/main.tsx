import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error("VITE_GOOGLE_CLIENT_ID is missing in .env file");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {clientId ? (
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    ) : (
      <div className="flex h-screen items-center justify-center bg-background text-foreground p-4 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Configuration Error</h1>
          <p>Missing VITE_GOOGLE_CLIENT_ID in your environment.</p>
          <p className="text-sm text-muted-foreground mt-4">Please check your .env file.</p>
        </div>
      </div>
    )}
  </StrictMode>,
)