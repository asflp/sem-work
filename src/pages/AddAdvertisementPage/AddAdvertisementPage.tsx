import {Header} from "../../components";
import styles from "./AddAdvertisementPage.module.sass";
import banner from "../../assets/add-advertisement-banner.svg"
import {ChangeEvent, FC, useContext, useState} from "react";
import {UserContext} from "../../store/StoreContext.tsx";

export interface ErrorType{
    entry: string
    errorMessage: string
}

export const AddAdvertisementPage: FC = () => {

    const userStore = useContext(UserContext);

    const token = userStore.user?.token;
    if (!token) {
        window.location.assign("../")
    }

    const [images, setImages] = useState<File[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        images: images,
        city: '',
        street: '',
        building: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        images: '',
        city: '',
        street: '',
        building: ''
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setImages(filesArray);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(prev => prev.filter((_img, i) => i !== index));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name, event.target.value)
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (): Promise<void> => {

        return fetch(
            'http://localhost:5038/Advertisement/new',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(formData),
            }
        )
            .then((response) => response.json())
            .then((response) => {
                if(response["errors"]){
                    console.log(response["errors"])
                    response["errors"].map((item: ErrorType) => {
                        setErrors({
                            ...errors,
                            [item.entry]: item.errorMessage,
                        });
                    })
                } else {
                    window.location.assign("../all")
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className={styles.ad_new_page}>
            <div className={styles.ad_new_page__header}>
                <Header selectedItem={"Доска объявлений"}/>
            </div>

            <div className={styles.ad_new_page__forma}>
                <div className={styles.ad_new_page__forma__label}>Добавление нового объявления</div>

                <form>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div className={styles.entries_common}>
                            <div className={styles.entries_label}>Общая информация</div>

                            <input type={"text"} placeholder={"Название"} name={"name"} onChange={handleInputChange}/>
                            <p>{errors.name}</p>

                            <input type={"text"} placeholder={"Категория"} name={"category"} onChange={handleInputChange}/>
                            <p>{errors.category}</p>

                            <input type={"text"} placeholder={"Цена (в рублях)"} name={"price"} onChange={handleInputChange}/>
                            <p>{errors.price}</p>

                            <textarea placeholder={"Описание: напишите как можно более подробно про ваш товар"}
                                      maxLength={1000} name={"description"}/>
                            <p>{errors.description}</p>
                        </div>

                        <div className={styles.entries_other}>
                            <div className={styles.entries_label}>Фото</div>
                            <div className={styles.input_file_row}>
                                <label className={styles.input_file}>
                                    <input type="file" name="file[]" multiple accept="image/*"
                                           className={styles.input_file} disabled={images.length >= 10}
                                           onChange={handleImageChange}/>
                                    <span className={styles.input_file}>Выберете файл</span>
                                </label>

                                <div className={styles.input_file_list}>
                                    {images.map((image, index) => (
                                        <div key={index} className={styles.input_file_list_item}>
                                            <img src={URL.createObjectURL(image)} alt="" width="100" height="100"/>
                                            <button className={styles.input_file_list_remove} type={"button"}
                                                    onClick={() => handleRemoveImage(index)}>х</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.entries_label}>Адрес</div>

                            <input type={"text"} placeholder={"Город"} name={"city"} onChange={handleInputChange}/>
                            <p>{errors.city}</p>

                            <input type={"text"} placeholder={"Улица"} name={"street"} onChange={handleInputChange}/>
                            <p>{errors.street}</p>

                            <input type={"text"} placeholder={"Строение"} name={"building"} onChange={handleInputChange}/>
                            <p>{errors.building}</p>
                        </div>
                    </div>

                    <button type={"button"} onClick={handleSubmit} className={styles.ad_new_page__forma__button}>Добавить объявление</button>
                </form>
            </div>

            <img className={styles.image_banner} src={banner} alt={""}/>
        </div>
    )
}