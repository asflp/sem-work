import {ChangeEvent, FC, FormEvent, useContext, useState} from "react";
import styles from "./SignInPage.module.sass";
import signBanner from "../../assets/sign-banner.png";
import {Link} from "react-router-dom";
import {SignInUser} from "../../store/UserStore.ts";
import { userContext} from "../../store/StoreContext.tsx";
import {observer} from "mobx-react";

export const SignInPage: FC = observer(() => {

    const userStore = useContext(userContext);

    const [formData, setFormData] = useState<SignInUser>({
        email: '',
        password: '',
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const response = await userStore.signInUser(formData);
        if(response){
            window.location.assign("../")
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
                    <p>{userStore.signInErrors.email}</p>

                    <label>
                        Пароль
                        <input type={"password"} placeholder={"Пароль"} onChange={handleInputChange}
                               name={"password"}/>
                    </label>
                    <p>{userStore.signInErrors.password}</p>

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
})