import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import './index.css'
import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react' // persist so all the state will be stored on local state so anytime user closes browser the info will stil lremain

const persistConfig = { key: 'root', storage, version: 1};
const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, 
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER]
      },
    })
})



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
    <QueryClientProvider client={queryClient}>
  
      <App />
      
      </QueryClientProvider>
      </PersistGate>
      </Provider>
      
      
  </React.StrictMode>,
)
