import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "mobx-react";
import {adStore} from "./store/AdvertisementStore.ts";
import {userStore} from "./store/UserStore.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider adStore={adStore} userSore={userStore}>
          <App />
      </Provider>
  </React.StrictMode>,
)
