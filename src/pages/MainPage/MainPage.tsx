import {FC} from "react";
import styles from "./MainPage.module.sass"
import {Header} from "../../components/Header/Header.tsx";
import chat from "../../assets/main/chat.svg"
import event from "../../assets/main/event.svg"
import shop from "../../assets/main/shop.svg"
import arrow from "../../assets/main/arrow.svg"
import plantOne from "../../assets/main/plant1.png"
import plantTwo from "../../assets/main/plant2.png"
import plantThree from "../../assets/main/plant3.png"
import star from "../../assets/main/star.svg"
import addItem from "../../assets/main/add-item.svg"
import eventOne from "../../assets/main/event1.png"
import eventTwo from "../../assets/main/event2.png"
import eventThree from "../../assets/main/event3.png"
import plantForum from "../../assets/main/forum/plant-forum.png"
import sunForum from "../../assets/main/forum/sun.svg"
import tempForum from "../../assets/main/forum/temp.svg"
import plantPotForum from "../../assets/main/forum/plant-pot.svg"
import waterForum from "../../assets/main/forum/water.svg"
import { motion } from "framer-motion";

export const MainPage: FC = () => {

    const featuresAnimation = {
        hidden: {
            x: -100,
            opacity: 0,
        },
        visible: (custom: number) => ({
            x: 0,
            opacity: 1,
            transition: { delay: custom * 0.2 }
        }),
    }

    const adsAnimation = {
        hidden: {
            y: -100,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: { delay: 0.6 }
        },
    }

    return (
        <div className={styles.main_page}>
            <div className={styles.main_image}>
                <Header selectedItem={"Главная"}/>

                <div className={styles.main_image__labels}>
                    <div className={styles.main_image__labels__first}>Общие интересы, общие проблемы и все про растения</div>
                    <div className={styles.main_image__labels__second}>Найдите растение своей мечты для украшения
                        дома вместе с нами, а мы поможем Вам в этом</div>
                </div>
            </div>

            <motion.div initial={"hidden"} whileInView={"visible"} className={styles.main_advantages}>
                <motion.div custom={3} variants={featuresAnimation} className={styles.main_advantages__item}>
                    <img src={chat}/>

                    <div className={styles.main_advantages__item__text}>
                        <div className={styles.main_advantages__item__text__first}>Форум</div>
                        <div className={styles.main_advantages__item__text__second}>Общайтесь с единомышленниками</div>
                    </div>
                </motion.div>

                <motion.div custom={2} variants={featuresAnimation} className={styles.main_advantages__item}>
                    <img src={shop}/>

                    <div className={styles.main_advantages__item__text}>
                        <div className={styles.main_advantages__item__text__first}>Доска объявлений</div>
                        <div className={styles.main_advantages__item__text__second}>Покупайте и продавайте</div>
                    </div>
                </motion.div>

                <motion.div custom={1} variants={featuresAnimation} className={styles.main_advantages__item}>
                    <img src={event}/>

                    <div className={styles.main_advantages__item__text}>
                        <div className={styles.main_advantages__item__text__first}>Мероприятия</div>
                        <div className={styles.main_advantages__item__text__second}>Находите крутые события</div>
                    </div>
                </motion.div>
            </motion.div>

            <div className={styles.main_ads}>
                <div className={styles.main_ads__see_more}>
                    <div className={styles.main_ads__see_more__first}>Смотрите объявления и покупайте лучшее</div>

                    <div className={styles.main_ads__see_more__second}>
                        Смотреть все объявления
                        <img src={arrow}/>
                    </div>
                </div>

                <motion.div initial={"hidden"} whileInView={"visible"} className={styles.main_ads__examples}>

                    {[[plantOne, "Марго"], [plantTwo, "Клавдия"], [plantThree, "Иван"]].map((item, index) => (
                        <div className={styles.ad_example} key={`ad${index}`}>
                            <motion.img variants={adsAnimation} src={item[0]} className={styles.ad_example}/>

                            <div className={styles.ad_example__back}>
                                <div className={styles.ad_example__info}>
                                    <div className={styles.ad_example__text}>
                                        <div className={styles.ad_example__text__name}>{item[1]}</div>
                                        <div className={styles.ad_example__text__stars}>
                                            {[0, 1, 2, 3, 4].map((item) => (
                                                <img src={star} key={item}/>
                                            ))}
                                            <img/>
                                        </div>
                                    </div>

                                    <div className={styles.ad_example__add}>
                                        500₽
                                        <img src={addItem}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className={styles.main_events}>
                <div className={styles.main_events__label_first}>Находите крутые мероприятия</div>
                <div className={styles.main_events__label_second}>Общайтесь с единомышленниками, находите новые знакомства</div>

                <div className={styles.main_events__images}>
                    <div className={styles.main_events__images__div}>
                        <div className={styles.main_event_item}>
                            <img src={eventOne}/>
                            <div>
                                open-space маркеты
                            </div>
                        </div>

                        <div className={styles.main_event_item}>
                            <img src={eventTwo}/>
                            <div>
                                живые встречи
                            </div>
                        </div>
                    </div>

                    <div className={styles.main_events__images__div}>
                        <div className={styles.main_event_item}>
                            <img src={eventThree}/>
                            <div>
                                мастер-классы
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.main_forum}>
                <div className={styles.main_forum__text}>
                    <div className={styles.main_forum__text__first}>Узнайте интересующие вас вещи о растениях</div>
                    <div className={styles.main_forum__text__second}>Общайтесь на форуме: задавайте вопросы и отвечайте другим</div>

                    <div className={styles.main_forum__info}>
                        <div className={styles.main_forum__item}>
                            <img src={sunForum}/>
                            <div>
                                <div className={styles.main_forum__item__text_first}>Какое должно быть освещение?</div>
                                <div className={styles.main_forum__item__text_second}>- При уходе за комнатными растениями следите за тем, чтобы температура в помещении была не слишком холодной и не слишком жаркой</div>
                            </div>
                        </div>

                        <div className={styles.main_forum__item}>
                            <img src={waterForum}/>
                            <div>
                                <div className={styles.main_forum__item__text_first}>Как часто нужно поливать растения?</div>
                                <div className={styles.main_forum__item__text_second}>- Полив декоративных растений в помещении необязательно производить каждый день</div>
                            </div>
                        </div>

                        <div className={styles.main_forum__item}>
                            <img src={tempForum}/>
                            <div>
                                <div className={styles.main_forum__item__text_first}>Как часто нужно поливать растения?</div>
                                <div className={styles.main_forum__item__text_second}>- Полив декоративных растений в помещении необязательно производить каждый день</div>
                            </div>
                        </div>

                        <div className={styles.main_forum__item}>
                            <img src={plantPotForum}/>
                            <div>
                                <div className={styles.main_forum__item__text_first}>Чем нужно удобрять растения?</div>
                                <div className={styles.main_forum__item__text_second}>- Питательные вещества, необходимые большинству комнатных растений, - это азот для поддержания баланса и калий для укрепления стеблей</div>
                            </div>
                        </div>
                    </div>
                </div>

                <img className={styles.main_forum__img} src={plantForum}/>
            </div>
        </div>
    )
}