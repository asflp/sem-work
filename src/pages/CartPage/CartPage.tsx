import {FC} from "react";
import styles from "./CartPage.module.sass";
import {Header, AdvertisementItem} from "../../components";
import {userStore} from "../../store/UserStore.ts";

export const CartPage: FC = () => {
    const token = userStore.user?.token;
    if (!token) {
        window.location.assign("../")
    }

    return(
        <div className={styles.cart}>
            <div className={styles.header}>
                <Header selectedItem={"Корзина"}/>
            </div>

            <div className={styles.cart__main}>
                <div className={styles.cart__main__label}>Корзина</div>

                <div className={styles.cart__main__ads} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    <AdvertisementItem imageUrl={"https://mobimg.b-cdn.net/v3/fetch/60/60136e84e7fd3ae2eeb153747c92d786.jpeg"}
                                       name={"Water"} cost={255} person={"Алиса"} rate={4.5}/>
                    <AdvertisementItem imageUrl={"https://mobimg.b-cdn.net/v3/fetch/60/60136e84e7fd3ae2eeb153747c92d786.jpeg"}
                                       name={"Water"} cost={255} person={"Алиса"} rate={4.5}/>
                    <AdvertisementItem imageUrl={"https://mobimg.b-cdn.net/v3/fetch/60/60136e84e7fd3ae2eeb153747c92d786.jpeg"}
                                       name={"Water"} cost={255} person={"Алиса"} rate={4.5}/>
                    <AdvertisementItem imageUrl={"https://mobimg.b-cdn.net/v3/fetch/60/60136e84e7fd3ae2eeb153747c92d786.jpeg"}
                                       name={"Water"} cost={255} person={"Алиса"} rate={4.5}/>
                    <AdvertisementItem imageUrl={"https://mobimg.b-cdn.net/v3/fetch/60/60136e84e7fd3ae2eeb153747c92d786.jpeg"}
                                       name={"Water"} cost={255} person={"Алиса"} rate={4.5}/>
                    <AdvertisementItem imageUrl={"https://mobimg.b-cdn.net/v3/fetch/60/60136e84e7fd3ae2eeb153747c92d786.jpeg"} name={"Water"} cost={255} person={"Алиса"} rate={4.5}/>
                </div>
            </div>
        </div>
    )
}