import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {SignInPage} from "./pages/SignInPage/SignInPage.tsx";
import {SignUpPage} from "./pages/SignUpPage/SignUpPage.tsx";
import {AllAdvertisementsRage} from "./pages/AllAdvertisementsRage/AllAdvertisementsRage.tsx";
import {AddAdvertisementPage} from "./pages/AddAdvertisementPage/AddAdvertisementPage.tsx";
import {CartPage} from "./pages/CartPage/CartPage.tsx";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage.tsx";
import {AdvertisementItemPage} from "./pages/AdvertisementItemPage/AdvertisementItemPage.tsx";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage/>} />
          <Route path="all" element={<AllAdvertisementsRage/>} />
          <Route path="new" element={<AddAdvertisementPage/>} />
          <Route path="cart" element={<CartPage/>} />
          <Route path="profile" element={<ProfilePage/>} />
          <Route path="item" element={<AdvertisementItemPage/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
