import {createContext} from "react";
import {userStore} from "./UserStore.ts";
import {adStore} from "./AdvertisementStore.ts";

export const userContext = createContext(userStore);
export const adContext = createContext(adStore);