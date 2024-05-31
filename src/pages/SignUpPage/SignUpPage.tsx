import {ChangeEvent, FC, FormEvent, useContext, useState} from "react";
import signBanner from "../../assets/sign-banner.png"
import styles from "./SignUpPage.module.sass"
import {Link} from "react-router-dom";
import {userContext} from "../../store/StoreContext.tsx";
import {observer} from "mobx-react";

export const SignUpPage: FC = observer(() => {

    const userStore = useContext(userContext);

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name, event.target.value)
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const response = await userStore.signUpUser(formData);
        if(response){
            window.location.assign("../")
        }
    };

    return (
        <div className={styles.base}>
            <div className={styles.base__forma}>
                <div className={styles.base__forma__label}>Начните прямо сейчас!</div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>
                        Имя
                        <input type={"text"} placeholder={"Иван"} onChange={handleInputChange}
                               name={"name"}/>
                    </label>
                    <p>{userStore.signUpErrors.name}</p>

                    <label>
                        Фамилия
                        <input type={"text"} placeholder={"Иванов"} onChange={handleInputChange}
                               name={"surname"}/>
                    </label>
                    <p>{userStore.signUpErrors.surname}</p>

                    <label>
                        Email
                        <input type={"email"} placeholder={"ivan-ivanov@mail.ru"} onChange={handleInputChange}
                               name={"email"}/>
                    </label>
                    <p>{userStore.signUpErrors.email}</p>

                    <label>
                        Номер телефона
                        <input type={"text"} placeholder={"8(912)-345-67-89"} onChange={handleInputChange}
                               name={"phoneNumber"}/>
                    </label>
                    <p>{userStore.signUpErrors.phoneNumber}</p>

                    <label>
                        Пароль
                        <input type={"password"} placeholder={"Пароль"} onChange={handleInputChange}
                               name={"password"}/>
                    </label>
                    <p>{userStore.signUpErrors.password}</p>

                    <button type={"submit"}>Зарегистироваться</button>
                </form>

                <span>
                    Уже есть аккаунт?
                    <Link to={"../sign-in"}>Вход</Link>
                </span>
            </div>

            <img src={signBanner} alt={""}/>
        </div>
    );
})