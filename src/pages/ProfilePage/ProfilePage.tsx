import {FC} from "react";
import styles from "./ProfilePage.module.sass"
import {Header} from "../../components/Header/Header.tsx";
import {AdvertisementItem} from "../../components/AdvertisementItem/AdvertisementItem.tsx";
import avatarEmpty from "../../assets/header/avatar-empty.png"

export const ProfilePage: FC = () => {
    return(
        <div className={styles.profile}>
            <div className={styles.header}>
                <Header selectedItem={"Профиль"}/>
            </div>

            <div className={styles.profile__main}>
                <div className={styles.user_info}>
                    <img src={avatarEmpty}/>

                    <div className={styles.user_info__text}>
                        <div className={styles.user_info__name}>Имя и фамилия</div>
                        <div className={styles.user_info__mail}>mail@mail.ru</div>
                        <div className={styles.user_info__how_long}>Профиль создан: 01.01.2001</div>
                        <div className={styles.user_info__description}>тут мега описание. тут мега описание. тут мега
                            описание. тут мега описание. тут мега описание. тут мега описание.</div>
                    </div>
                </div>

                <div className={styles.ads_choose}>
                    <div className={styles.ads_choose__selected}>Мои объявления</div>
                    /
                    <div>Избранное</div>
                </div>
                <div className={styles.ads} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
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