import {FC, useContext} from "react";
import styles from "./ProfilePage.module.sass"
import {Header, AdvertisementItem} from "../../components";
import avatarEmpty from "../../assets/header/avatar-empty.png"
import {UserContext} from "../../store/StoreContext.tsx";
import {observer} from "mobx-react";
import {AdContext} from "../../store/AdContext.tsx";
import {NavLink} from "react-router-dom";

export const ProfilePage: FC = observer(() => {
    const userStore = useContext(UserContext);
    const adStore = useContext(AdContext);

    const user = userStore.user;

    if (!user) {
        window.location.assign("../")
    } else {
        adStore.getByUser(user.id);
    }

    return(
        <div className={styles.profile}>
            <div className={styles.header}>
                <Header selectedItem={"Профиль"}/>
            </div>

            <main className={styles.profile__main}>
                <section className={styles.user_info}>
                    <img src={user?.avatarUrl?? avatarEmpty}/>

                    <div className={styles.user_info__text}>
                        <h3 className={styles.user_info__name}>{user?.surname} {user?.name}</h3>
                        <p className={styles.user_info__mail}>{user?.email}</p>
                        <p className={styles.user_info__how_long}>Профиль создан: {user?.createdAt}</p>
                        <p className={styles.user_info__description}>{user?.description}</p>
                    </div>
                </section>

                <section className={styles.about}>
                    <nav className={styles.ads_choose}>
                        <h3 className={styles.ads_choose__selected}>Мои объявления</h3>
                        /
                        <h3>Избранное</h3>
                    </nav>
                    <div className={styles.ads}>
                        { adStore.favorite.map((ad, index) => (
                            <NavLink to={`../item?id=${ad.id}`}>
                                <AdvertisementItem
                                    key={index}
                                    imageUrl={ad.photoUrl
                                        ?? "https://static.tildacdn.com/tild6630-3732-4131-a336-306466393031/28942791.jpg"}
                                    name={ad.name}
                                    cost={ad.price}
                                    person={ad.username}
                                    rate={5}
                                />
                            </NavLink>
                        )) }
                    </div>
                </section>
            </main>
        </div>
    )
})