import {FC} from "react";
import styles from "./Header.module.sass"
import logo from "../../assets/header/logo.svg"
import avatarEmpty from "../../assets/header/avatar-empty.png"
import {NavLink} from "react-router-dom";

interface HeaderProps{
    selectedItem: string
}

export const Header: FC<HeaderProps> = ({selectedItem}) => {

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
        <div className={styles.header_page}>

            <img src={logo} className={styles.header_page__logo}/>

            <div className={styles.header_page__labels}>
                {links.map((item) => (
                    <NavLink to={item.link} key={item.name} className={item.name == selectedItem
                        ? styles.selected_label : styles.other_label}>
                        {item.name}
                    </NavLink>
                ))}
            </div>

            <div className={styles.header_page__person}>
                <div className={styles.header_page__person__avatar}>
                    <img src={avatarEmpty}/>
                </div>

                Вход
            </div>
        </div>
    )
}