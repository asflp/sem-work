import {FC, useContext, useEffect, useState} from "react";
import styles from "./AdvertisementItemPage.module.sass"
import {Header} from "../../components";
import likeEmpty from "../../assets/advertisement/like.svg"
import {Advertisement} from "../../store/AdvertisementStore.ts";
import {observer} from "mobx-react";
import {AdContext} from "../../store/AdContext.tsx";

export const AdvertisementItemPage: FC = observer(() => {

    const adStore = useContext(AdContext);

    const [advertisement, setAdvertisements] = useState<Advertisement >({
        name: "", id: "", category: "", price: 0, photoUrls: [], city: "", building: "", createdAt: "", description: "", likes: null, street: "", user: {
            name: "", id: "", avatarUrl: "", email: "", surname: "", token: "", phoneNumber: ""
        }, userId: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const id = queryParams.get("id");
                const data = await adStore.getById(id!);
                setAdvertisements(data);
            } catch (error) {
                console.error('Error fetching ad data:', error);
            }
        };
        fetchData();
    }, [adStore]);

    return (
        <div className={styles.item}>
            <div className={styles.header}>
                <Header selectedItem={"Доска объявлений"}/>
            </div>

            <div className={styles.item__main}>
                <h1 className={styles.item__main__label}>{advertisement.name}</h1>

                <div className={styles.main_info}>
                    <div className={styles.main_info__images}>
                        <img src={advertisement.photoUrls[0] ?? "https://static.tildacdn.com/tild6630-3732-4131-a336-306466393031/28942791.jpg"}/>
                        <div></div>
                    </div>

                    <section className={styles.item_info}>
                        <div className={styles.item_info__first}>
                            <div>{advertisement.price}₽</div>
                            <img src={likeEmpty}/>
                        </div>

                        <button className={styles.item_info__buy}>Купить сейчас</button>
                        <button className={styles.item_info__cart}>Добавить в корзину</button>

                        <section className={styles.item_saler}>
                            <div className={styles.item_saler__label}>Продавец</div>

                            <div className={styles.item_saler__main}>
                                <img
                                    src={"https://static.tildacdn.com/tild6630-3732-4131-a336-306466393031/28942791.jpg"}/>
                                <div className={styles.item_saler__name}>
                                    <div>{advertisement.user.name}</div>
                                </div>
                            </div>
                            <div className={styles.item_saler__phone}>{advertisement.user.phoneNumber}</div>
                            <div className={styles.item_saler__chat}>Написать в чате</div>
                        </section>
                    </section>
                </div>

                <section className={styles.filters}>
                    <h5 className={styles.filters__name}>
                        Характеристики
                        <p><b>Вид:</b> {advertisement.category}</p>
                    </h5>

                    <h5 className={styles.filters__name}>
                        Описание
                        <p>{advertisement.description}</p>
                    </h5>

                    <h5 className={styles.filters__name}>
                        Местоположение
                        <p>город {advertisement.city}, улица {advertisement.street}, {advertisement.building}</p>
                    </h5>
                </section>
            </div>
        </div>
    )
})