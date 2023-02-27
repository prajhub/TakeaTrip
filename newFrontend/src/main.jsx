import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Features/store'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
  
      <App />
      
      </QueryClientProvider>
      </Provider>
      
      
  </React.StrictMode>,
)
