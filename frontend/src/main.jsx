import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ContactsContextProvider } from './context/ContactsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AuthContextProvider>
      <ContactsContextProvider>
        <App />
      </ContactsContextProvider>
    </AuthContextProvider>

  </StrictMode>,
)
