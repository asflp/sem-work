import {FC, useContext, useState} from "react";
import styles from "./Header.module.sass"
import avatarEmpty from "../../assets/header/avatar-empty.png"
import {NavLink} from "react-router-dom";
import {UserContext} from "../../store/StoreContext.tsx";
import {observer} from "mobx-react";
import {Icon} from "../Icon";
import { motion } from "framer-motion";

interface HeaderProps{
    selectedItem: string
}

export const Header: FC<HeaderProps> = observer(({selectedItem}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const menuVariants = {
        hidden: { display: "none", y: -10 },
        visible: { display: "flex", y: 130 },
    };

    const userStore = useContext(UserContext);

    const links = [
        {
            name: "Главная",
            link: "http://localhost:5173/"
        },
        {
            name: "Доска объявлений",
            link: "http://localhost:5173/all"
        },
        {
            name: "Корзина",
            link: "http://localhost:5173/cart"
        },
        {
            name: "Профиль",
            link: "http://localhost:5173/profile"
        },
    ]

    return (
        <header className={styles.header_page}>

            <Icon id={"logo"} width={180}/>

            <button className={styles.menu} onClick={() => setIsOpen(!isOpen)}>Меню</button>
            <motion.nav className={styles.menu__items} initial="hidden"
                        animate={isOpen ? 'visible' : 'hidden'}
                        variants={menuVariants}>
                {links.map((item) => (
                    <motion.a href={item.link} whileHover={{ scale: 1.1 }} key={item.name} className={item.name == selectedItem
                        ? styles.selected_label : styles.other_label} onClick={() => setIsOpen(false)}>
                        {item.name}
                    </motion.a>
                ))}
            </motion.nav>

            <nav className={styles.header_page__labels}>
                {links.map((item) => (
                    <NavLink to={item.link} key={item.name} className={item.name == selectedItem
                        ? styles.selected_label : styles.other_label}>
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {userStore.user ?
                <div className={styles.header_page__person}>
                    <div className={styles.header_page__person__avatar}>
                        <img src={userStore.user.avatarUrl ?? avatarEmpty}/>
                    </div>

                    {userStore.user.name}
                </div> :
                <NavLink to={"../sign-in"} className={styles.header_page__person}>
                    <div className={styles.header_page__person__avatar}>
                        <img src={avatarEmpty}/>
                    </div>

                    Вход
                </NavLink>
            }
        </header>
    )
})