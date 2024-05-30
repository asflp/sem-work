import {ChangeEvent, FC, useState} from "react";
import signBanner from "../../assets/sign-banner.png"
import styles from "./SignUpPage.module.sass"
import {Link} from "react-router-dom";

export const SignUpPage: FC = () => {

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const [errors, setErrors] = useState({
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

        setErrors({
            ...errors,
            [event.target.name]: validateData(event.target.name, event.target.value)
        })
    };

    const validateData = (name: string, value: string): string => {
        if(name === "name"){
            if (!value) {
                return "Имя не может быть пустым";
            }
            if (value.length > 50) {
                return "Максимальная длина - 50 символов";
            }
            if (value.length < 2) {
                return "Минимальная длина - 2 символов";
            }
            if (!/^[а-яА-Яa-zA-Z]+$/.test(value)) {
                return "Все символы должны быть буквами";
            }
        } else if(name === "surname"){
            if (!value) {
                return "Фамилия не может быть пустой";
            }
            if (value.length > 50) {
                return "Максимальная длина - 50 символов";
            }
            if (value.length < 2) {
                return "Минимальная длина - 2 символов";
            }
            if (!/^[а-яА-Яa-zA-Z]+$/.test(value)) {
                return "Все символы должны быть буквами";
            }
        } else if(name === "email"){
            if (!value) {
                return "Почта не может быть пустой";
            }
            if (!/\S+@\S+\.\S+/.test(value)) {
                return "Это не адрес электронной почты";
            }
        } else if(name === "phone"){
            if (!value) {
                return "Номер телефона не может быть пустым";
            }
            if (value.length > 20) {
                return "Максимальная длина - 50 символов";
            }
            if (value.length < 2) {
                return "Минимальная длина - 2 символов";
            }
            if (!/^\d+$/.test(value)) {
                return "Все символы должны быть цифрами";
            }
        } else if(name === "password") {
            if (!value) {
                return "Пароль не может быть пустым";
            }
            if (value.length > 50) {
                return "Максимальная длина - 50 символов";
            }
            if (value.length < 8) {
                return "Минимальная длина - 8 символов";
            }
            if (!/[A-Za-z]/.test(value)) {
                return "Пароль должен содержать хотя бы 1 букву";
            }
            if (!/\d/.test(value)) {
                return "Пароль должен содержать хотя бы 1 цифру";
            }
        }
        return "";
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if(errors.name !== "" || errors.surname !== "" || errors.email !== ""
        || errors.phoneNumber !== "" || errors.password !== ""){
            return;
        }

        const response = await fetch('http://localhost:5038/User/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.status == 201) {
            window.location.assign("../")
            console.log("bnm")
        } else {
            alert('Произошла ошибка при отправке данных');
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
                    <p>{errors.name}</p>

                    <label>
                        Фамилия
                        <input type={"text"} placeholder={"Иванов"} onChange={handleInputChange}
                               name={"surname"}/>
                    </label>
                    <p>{errors.surname}</p>

                    <label>
                        Email
                        <input type={"email"} placeholder={"ivan-ivanov@mail.ru"} onChange={handleInputChange}
                               name={"email"}/>
                    </label>
                    <p>{errors.email}</p>

                    <label>
                        Номер телефона
                        <input type={"text"} placeholder={"8(912)-345-67-89"} onChange={handleInputChange}
                               name={"phoneNumber"}/>
                    </label>
                    <p>{errors.phoneNumber}</p>

                    <label>
                        Пароль
                        <input type={"password"} placeholder={"Пароль"} onChange={handleInputChange}
                               name={"password"}/>
                    </label>
                    <p>{errors.password}</p>

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
}