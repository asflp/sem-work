import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {userStore} from "./store/UserStore.ts";
import {UserContext} from "./store/StoreContext.tsx";
import {AdContext} from "./store/AdContext.tsx";
import {adStore} from "./store/AdvertisementStore.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <UserContext.Provider value={userStore}>
          <AdContext.Provider value={adStore}>
              <App />
          </AdContext.Provider>
      </UserContext.Provider>
  </React.StrictMode>,
)
