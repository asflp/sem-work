import {Dispatch, FC, SetStateAction, useContext, useEffect, useState} from "react";
import styles from "./AllAdvertisementsRage.module.sass";
import {AdvertisementItem, Header, SearchString} from "../../components";
import {observer} from "mobx-react";
import {AdItem} from "../../store/AdvertisementStore.ts";
import {NavLink} from "react-router-dom";
import { motion } from "framer-motion";
import {AdContext} from "../../store/AdContext.tsx";


export const AllAdvertisementsRage: FC = observer(() => {

    const adStore = useContext(AdContext);

    const [advertisements, setAdvertisements] = useState<AdItem[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const filterVariants = {
        hidden: { display: "none", y: -10 },
        visible: { display: "flex", y: 130 },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await adStore.getAllAds(1);
                setAdvertisements(data);
            } catch (error) {
                console.error('Error fetching ad data:', error);
            }
        };
        fetchData();
    }, [adStore]);

    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [selectedCost, setSelectedCost] = useState<number | null>(null);
    const [selectedRate, setSelectedRate] = useState<number | null>(null);
    const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

    const handleSelect = (index: number, type: number | null, set:  Dispatch<SetStateAction<number | null>>) => {
        if(index == type){
            set(null)
            if(selectedType == null || selectedCost == null || selectedRate == null){
                setIsFilterChanged(false)
            }
        } else{
            set(index);
            setIsFilterChanged(true)
        }
    };

    const handleSearchFilters = () => {
        setIsOpen(false)

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5038/Advertisement/filtred?
                PageNumber=1&Batchsize=12&${selectedType? `PlantType=${selectedType}`: ""}&${selectedCost? `PlantPrice=${selectedCost}` : ""}`);
                const data = await response.json();
                setAdvertisements(data.result);
                setIsFilterChanged(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }

    const handleSearch = (ads: AdItem[]) => {
        setAdvertisements(ads);
    };

    return(
        <div>
            <div className={styles.header}>
                <Header selectedItem={"Доска объявлений"}/>
            </div>
            <SearchString set={handleSearch}/>

            <div className={styles.all_ads}>
                <h1 className={styles.all_ads__label}>Доска объявлений</h1>

                <main className={styles.all_ads__main}>
                    <section className={styles.all_ads__filters}>
                        <motion.h3 className={styles.all_ads__filters__label} onClick={() => setIsOpen(!isOpen)}>
                            Фильтры
                        </motion.h3>

                        <motion.ul className={styles.filters__adaptiv} initial="hidden"
                                   animate={isOpen ? 'visible' : 'hidden'}
                                   variants={filterVariants}>

                            <div className={styles.filters__adaptiv__text}>
                                <p className={styles.filters__adaptiv__label}>Фильтры</p>
                                <p className={styles.filters__adaptiv__close} onClick={() => setIsOpen(false)}>x</p>
                            </div>
                            <li className={styles.filters__item}>
                                <h5 className={styles.filters__name}>Тип цветка</h5>
                                <ul>
                                    {
                                        ["Лиственные", "Цветущие", "Суккуленты", "Другие"]
                                            .map((item, index) =>
                                                <li key={`first${index}`} onClick={() => handleSelect(index, selectedType, setSelectedType)}
                                                    className={index == selectedType ? styles.filters__option_selected : styles.filters__option}>
                                                    {item}
                                                </li>
                                            )
                                    }
                                </ul>
                            </li>

                            <li className={styles.filters__item}>
                                <h5 className={styles.filters__name}>Цена</h5>
                                <ul>
                                    {
                                        ["до 500", "от 501 до 1000", "от 1001 до 2000", "от 2001"]
                                            .map((item, index) =>
                                                <li key={`cost${index}`} onClick={() =>
                                                    handleSelect(index, selectedCost, setSelectedCost)}
                                                    className={index == selectedCost
                                                        ? styles.filters__option_selected : styles.filters__option}>
                                                    {item}
                                                </li>
                                            )
                                    }
                                </ul>
                            </li>

                            <li className={styles.filters__item}>
                                <h5 className={styles.filters__name}>Рейтинг продавца</h5>
                                <ul>
                                    <li key={`rate1`}
                                        onClick={() => handleSelect(1, selectedRate, setSelectedRate)}
                                        className={1 == selectedRate ? styles.filters__option_selected : styles.filters__option}>
                                        от 4 звезд
                                    </li>
                                </ul>
                            </li>

                            <button type={"button"} className={isFilterChanged ? styles.filters_adaptiv__button_selected
                                : styles.filters_adaptiv__button} onClick={handleSearchFilters}>Применить</button>
                        </motion.ul>

                        <ul className={styles.filters}>
                            <li className={styles.filters__item}>
                                <h5 className={styles.filters__name}>Тип цветка</h5>
                                <ul>
                                    {
                                        ["Лиственные", "Цветущие", "Суккуленты", "Другие"]
                                            .map((item, index) =>
                                            <li key={`first${index}`} onClick={() => handleSelect(index, selectedType, setSelectedType)}
                                                 className={index == selectedType ? styles.filters__option_selected : styles.filters__option}>
                                                {item}
                                            </li>
                                        )
                                    }
                                </ul>
                            </li>

                            <li className={styles.filters__item}>
                                <h5 className={styles.filters__name}>Цена</h5>
                                <ul>
                                    {
                                        ["до 500", "от 501 до 1000", "от 1001 до 2000", "от 2001"]
                                            .map((item, index) =>
                                                <li key={`cost${index}`} onClick={() =>
                                                    handleSelect(index, selectedCost, setSelectedCost)}
                                                     className={index == selectedCost
                                                         ? styles.filters__option_selected : styles.filters__option}>
                                                    {item}
                                                </li>
                                            )
                                    }
                                </ul>
                            </li>

                            <li className={styles.filters__item}>
                                <h5 className={styles.filters__name}>Рейтинг продавца</h5>
                                <ul>
                                    <li key={`rate1`}
                                         onClick={() => handleSelect(1, selectedRate, setSelectedRate)}
                                                 className={1 == selectedRate ? styles.filters__option_selected : styles.filters__option}>
                                                от 4 звезд
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <button type={"button"} className={isFilterChanged ? styles.all_ads__filters__button_selected
                            : styles.all_ads__filters__button} onClick={handleSearchFilters}>
                            Применить фильтры
                        </button>
                    </section>

                    { advertisements.length > 0 ?
                    <section className={styles.ads}>
                        { advertisements.map((ad, index) => (
                            <NavLink to={`../item?id=${ad.id}`}>
                                <AdvertisementItem
                                    key={index}
                                    imageUrl={ad.photoUrl
                                        ?? "https://static.tildacdn.com/tild6630-3732-4131-a336-306466393031/28942791.jpg"}
                                    name={ad.name}
                                    cost={ad.price}
                                    person={ad.username}
                                    rate={5}
                                />
                            </NavLink>
                            )) }
                    </section> :
                        <p className={styles.label_not_found}>
                            Объявлений не найдено
                        </p>
                    }
                </main>
            </div>
        </div>
    )
})