import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Features/store'
import 'flowbite';
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'


const colors = {
  brand: {
    900: '#4D7C0F',
    800: '#4B5563',
    700: '#2a69ac',
  },
}


const theme = extendTheme({ colors })


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <App />
      </ChakraProvider>  
      </QueryClientProvider>
      </Provider>
      
      
  </React.StrictMode>,
)
