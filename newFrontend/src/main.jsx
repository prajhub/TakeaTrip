import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext'



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
  
      <App />
      
      </QueryClientProvider>
      </AuthContextProvider>
      
      
  </React.StrictMode>,
)
