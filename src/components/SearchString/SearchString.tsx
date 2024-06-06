import {ChangeEvent, FC, useState} from "react";
import styles from "./SearchString.module.sass"
import {NavLink} from "react-router-dom";
import {AdItem} from "../../store/AdvertisementStore.ts";
import {Icon} from "../Icon";

interface SearchStringProps {
    set: (ads: AdItem[]) => void
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
                <Icon id={"arrow"} width={24}/>
            </div>

            <label className={styles.search_string__search}>
                <input type={"text"} placeholder={"Поиск"} onChange={handleInputChange} value={search}/>
                <button onClick={handleSearch}>
                    <Icon id={"search"} width={60}/>
                </button>
            </label>

            <NavLink to={"../new"} className={styles.add_new}>Добавить объявление</NavLink>
        </div>
    )
}