import {createContext} from "react";
import {userStore} from "./UserStore.ts";

export const UserContext = createContext(userStore);

