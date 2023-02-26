import React from 'react'
import  './Config/firebase-config'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import './index.css'

import  './Config/firebase-config'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    
    <QueryClientProvider client={queryClient}>
  
      <App />
      
      </QueryClientProvider>
      
      
      
  </React.StrictMode>,
)
