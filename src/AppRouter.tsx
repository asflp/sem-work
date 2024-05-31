import { Route, Routes } from "react-router-dom";
import { AddAdvertisementPage, AdvertisementItemPage, AllAdvertisementsRage, CartPage, MainPage, ProfilePage,
    SignInPage, SignUpPage } from "./pages";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="all" element={<AllAdvertisementsRage/>} />
            <Route path="new" element={<AddAdvertisementPage/>} />
            <Route path="cart" element={<CartPage/>} />
            <Route path="profile" element={<ProfilePage/>} />
            <Route path="item" element={<AdvertisementItemPage/>} />
        </Routes>
    );
};

export default AppRouter;