import {ReactNode} from "react";

export const Redirect = ( children: ReactNode ) => {
    const token = sessionStorage.getItem("tokenKey");
    if (!token) {
        window.location.assign("../")
     }
    // Outlet
    return <>{children}</>
}