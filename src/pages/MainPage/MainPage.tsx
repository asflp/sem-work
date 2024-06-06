import {FC} from "react";
import styles from "./MainPage.module.sass"
import {Header, Icon} from "../../components";
import arrow from "../../assets/main/arrow.svg"
import plantOne from "../../assets/main/plant1.png"
import plantTwo from "../../assets/main/plant2.png"
import plantThree from "../../assets/main/plant3.png"
import eventOne from "../../assets/main/event1.png"
import eventTwo from "../../assets/main/event2.png"
import eventThree from "../../assets/main/event3.png"
import plantForum from "../../assets/main/forum/plant-forum.png"
import sunForum from "../../assets/main/forum/sun.svg"
import tempForum from "../../assets/main/forum/temp.svg"
import plantPotForum from "../../assets/main/forum/plant-pot.svg"
import waterForum from "../../assets/main/forum/water.svg"
import { motion } from "framer-motion";
import {NavLink} from "react-router-dom";

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
            transition: { delay: 1 }
        },
    }

    return (
        <div className={styles.main_page}>
            <div className={styles.main_image}>
                <Header selectedItem={"Главная"}/>

                <section className={styles.main_image__labels}>
                    <h1 className={styles.main_image__labels__first}>Общие интересы, общие проблемы и все про растения</h1>
                    <h2 className={styles.main_image__labels__second}>Найдите растение своей мечты для украшения
                        дома вместе с нами, а мы поможем Вам в этом</h2>
                </section>
            </div>

            <motion.section initial={"hidden"} whileInView={"visible"} className={styles.main_advantages}>
                <motion.li custom={3} variants={featuresAnimation} className={styles.main_advantages__item}>
                    <Icon id={"chat"} width={70}/>

                    <div className={styles.main_advantages__item__text}>
                        <h5 className={styles.main_advantages__item__text__first}>Форум</h5>
                        <p className={styles.main_advantages__item__text__second}>Общайтесь с единомышленниками</p>
                    </div>
                </motion.li>

                <motion.li custom={2} variants={featuresAnimation} className={styles.main_advantages__item}>
                    <Icon id={"shop"} width={70}/>

                    <div className={styles.main_advantages__item__text}>
                        <h5 className={styles.main_advantages__item__text__first}>Доска объявлений</h5>
                        <p className={styles.main_advantages__item__text__second}>Покупайте и продавайте</p>
                    </div>
                </motion.li>

                <motion.li custom={1} variants={featuresAnimation} className={styles.main_advantages__item}>
                    <Icon id={"event"} width={70}/>

                    <div className={styles.main_advantages__item__text}>
                        <h5 className={styles.main_advantages__item__text__first}>Мероприятия</h5>
                        <p className={styles.main_advantages__item__text__second}>Находите крутые события</p>
                    </div>
                </motion.li>
            </motion.section>

            <section className={styles.main_ads}>
                <NavLink to={"/all"} className={styles.main_ads__see_more}>
                    <h3 className={styles.main_ads__see_more__first}>Смотрите объявления и покупайте лучшее</h3>

                    <p className={styles.main_ads__see_more__second}>
                        Смотреть все объявления
                        <img src={arrow}/>
                    </p>
                </NavLink>

                <motion.div initial={"hidden"} whileInView={"visible"} className={styles.main_ads__examples}>

                    {[[plantOne, "Марго"], [plantTwo, "Клавдия"], [plantThree, "Иван"]].map((item, index) => (
                        <li className={styles.ad_example} key={`ad${index}`}>
                            <motion.img variants={adsAnimation} src={item[0]} className={styles.ad_example}/>

                            <div className={styles.ad_example__back}>
                                <div className={styles.ad_example__info}>
                                    <div className={styles.ad_example__text}>
                                        <p className={styles.ad_example__text__name}>{item[1]}</p>
                                        <div className={styles.ad_example__text__stars}>
                                            {[0, 1, 2, 3, 4].map((item) => (
                                                <Icon id={"star"} width={20} key={item}/>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.ad_example__add}>
                                        500₽
                                        <Icon id={"add-item"} width={60}/>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </motion.div>
            </section>

            <section className={styles.main_events}>
                <h3 className={styles.main_events__label_first}>Находите крутые мероприятия</h3>
                <h5 className={styles.main_events__label_second}>Общайтесь с единомышленниками, находите новые знакомства</h5>

                <div className={styles.main_events__images}>
                    <div className={styles.main_events__images__div}>
                        <li className={styles.main_event_item}>
                            <img src={eventOne}/>
                            <p>
                                open-space маркеты
                            </p>
                        </li>

                        <li className={styles.main_event_item}>
                            <img src={eventTwo}/>
                            <p>
                                живые встречи
                            </p>
                        </li>
                    </div>

                    <div className={styles.main_events__images__div}>
                        <li className={styles.main_event_item}>
                            <img src={eventThree}/>
                            <p>
                                мастер-классы
                            </p>
                        </li>
                    </div>
                </div>
            </section>

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