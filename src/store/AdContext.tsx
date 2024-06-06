import {createContext} from "react";
import {adStore} from "./AdvertisementStore.ts";

export const AdContext = createContext(adStore);