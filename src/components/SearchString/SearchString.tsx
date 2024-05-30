import {ChangeEvent, FC, useState} from "react";
import styles from "./SearchString.module.sass"
import arrow from "../../assets/search/arrow.svg"
import {NavLink} from "react-router-dom";
import searchImg from "../../assets/search/search.svg"
import {adItem} from "../../pages/AllAdvertisementsRage/AllAdvertisementsRage.tsx";

interface SearchStringProps {
    set: (ads: adItem[]) => void
}

export const SearchString: FC<SearchStringProps> = ({set}) => {

    const [search, setSearch] = useState<string>('');


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearch = () => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5038/Advertisement/search?
                PageNumber=1&Batchsize=12&search=${search}`);
                const data = await response.json();
                set(data.result);
                console.log(data.result)
                setSearch("");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }

    return(
        <div className={styles.search_string}>
            <div className={styles.search_string__city}>
                Казань
                <img src={arrow} alt={"Стрелка"}/>
            </div>

            <label>
                <input type={"text"} placeholder={"Поиск"} onChange={handleInputChange} value={search}/>
                    <img src={searchImg} alt={"Поиск"} onClick={handleSearch}/>
            </label>

            <NavLink to={"../new"} className={styles.add_new}>Добавить объявление</NavLink>
        </div>
    )
}