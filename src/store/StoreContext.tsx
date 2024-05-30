import {createContext, FC, ReactNode, useContext} from "react";
import {advertisementStore} from "./AdvertisementStore.ts";

const MobXContext = createContext({
    adStore: advertisementStore,
});

export const useMobXStores = () => useContext(MobXContext);

export const MobXProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return <MobXContext.Provider value={{ adStore: advertisementStore }}>{children}</MobXContext.Provider>;
};
