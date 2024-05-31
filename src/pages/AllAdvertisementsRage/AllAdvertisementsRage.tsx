import {Dispatch, FC, SetStateAction, useContext, useEffect, useState} from "react";
import {Header} from "../../components";
import {SearchString} from "../../components";
import styles from "./AllAdvertisementsRage.module.sass";
import {AdvertisementItem} from "../../components";
import {observer} from "mobx-react";
import {adContext} from "../../store/StoreContext.tsx";
import {AdItem} from "../../store/AdvertisementStore.ts";


export const AllAdvertisementsRage: FC = observer(() => {

    const adStore = useContext(adContext);

    const [advertisements, setAdvertisements] = useState<AdItem[]>([]);

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
                <div className={styles.all_ads__label}>Доска объявлений</div>

                <div className={styles.all_ads__main}>
                    <div className={styles.all_ads__filters}>
                        <div className={styles.all_ads__filters__label}>Фильтры</div>

                        <div className={styles.filters}>
                            <div className={styles.filters__item}>
                                <div className={styles.filters__name}>Тип цветка</div>
                                <div>
                                    {
                                        ["Лиственные", "Цветущие", "Суккуленты", "Другие"]
                                            .map((item, index) =>
                                            <div key={`first${index}`} onClick={() => handleSelect(index, selectedType, setSelectedType)}
                                                 className={index == selectedType ? styles.filters__option_selected : styles.filters__option}>
                                                {item}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className={styles.filters__item}>
                                <div className={styles.filters__name}>Цена</div>
                                <div>
                                    {
                                        ["до 500", "от 501 до 1000", "от 1001 до 2000", "от 2001"]
                                            .map((item, index) =>
                                                <div key={`cost${index}`} onClick={() =>
                                                    handleSelect(index, selectedCost, setSelectedCost)}
                                                     className={index == selectedCost
                                                         ? styles.filters__option_selected : styles.filters__option}>
                                                    {item}
                                                </div>
                                            )
                                    }
                                </div>
                            </div>

                            <div className={styles.filters__item}>
                                <div className={styles.filters__name}>Рейтинг продавца</div>
                                <div>
                                    <div key={`rate1`}
                                         onClick={() => handleSelect(1, selectedRate, setSelectedRate)}
                                                 className={1 == selectedRate ? styles.filters__option_selected : styles.filters__option}>
                                                от 4 звезд
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type={"button"} className={isFilterChanged ? styles.all_ads__filters__button_selected
                            : styles.all_ads__filters__button} onClick={handleSearchFilters}>
                            Применить фильтры
                        </button>
                    </div>

                    <div className={styles.ads} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        { advertisements.map((ad, index) => (
                                    <AdvertisementItem
                                        key={index}
                                        imageUrl={ad.photoUrl
                                            ?? "https://static.tildacdn.com/tild6630-3732-4131-a336-306466393031/28942791.jpg"}
                                        name={ad.name}
                                        cost={ad.price}
                                        person={ad.username}
                                        rate={5}
                                    />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
})