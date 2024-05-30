import {ChangeEvent, FC, useState} from "react";
import styles from "./SignInPage.module.sass";
import signBanner from "../../assets/sign-banner.png";
import {Link} from "react-router-dom";
import {ErrorType} from "../AddAdvertisementPage/AddAdvertisementPage.tsx";

export const SignInPage: FC = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch('http://localhost:5038/User/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if(response.ok){
            const data = await response.json()
            sessionStorage.setItem("tokenKey", data.token);
            window.location.assign("../")
        } else {
            const data = await response.json()
            data.map((item: ErrorType) => {
                setErrors({
                    ...errors,
                    [item.entry]: item.errorMessage
                })
            })
        }

    };

    return (
        <div className={styles.base}>
            <div className={styles.base__forma}>
                <div className={styles.base__forma__label}>Вход в аккаунт</div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input type={"email"} placeholder={"ivan-ivanov@mail.ru"} onChange={handleInputChange}
                               name={"email"}/>
                    </label>
                    <p>{errors.email}</p>

                    <label>
                        Пароль
                        <input type={"password"} placeholder={"Пароль"} onChange={handleInputChange}
                               name={"password"}/>
                    </label>
                    <p>{errors.password}</p>

                    <button type={"submit"}>Войти</button>
                </form>

                <span>
                    Еще нет аккаунта?
                    <Link to={"../sign-up"}>Регистрация</Link>
                </span>
            </div>

            <img src={signBanner} alt={""}/>
        </div>
    )
}