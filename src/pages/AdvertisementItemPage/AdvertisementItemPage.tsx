import {FC} from "react";
import styles from "./AdvertisementItemPage.module.sass"
import {Header} from "../../components/Header/Header.tsx";
import likeEmpty from "../../assets/advertisement/like.svg"
import {useSearchParams} from "react-router-dom";

export const AdvertisementItemPage: FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("id")

  return(
      <div className={styles.item}>
          <div className={styles.header}>
              <Header selectedItem={"Доска объявлений"}/>
          </div>

          <div className={styles.item__main}>
              <div className={styles.item__main__label}>Название товара</div>

              <div className={styles.main_info}>
                  <div className={styles.main_info__images}>
                      <img src={"https://static.tildacdn.com/tild6630-3732-4131-a336-306466393031/28942791.jpg"}/>
                      <div></div>
                  </div>

                  <div>
                      <div>
                          <div>2000₽</div>
                          <img src={likeEmpty}/>
                      </div>

                      <button>Купить сейчас</button>
                      <button>Добавить в корзину</button>

                      <div>
                          <div>Продавец</div>

                          <div>
                              <img/>
                              <div>
                                  <div>Камилла</div>
                              </div>
                          </div>
                          <div>121632732</div>
                          <div>Написать в чате</div>
                      </div>
                  </div>
              </div>

              <div>
                  <div>
                      Характеристики
                      <div>Вид: Суккуленты</div>
                  </div>

                  <div>
                      Описание
                      <div>Мега описание</div>
                  </div>

                  <div>
                      Местоположение
                      <div>город Казань, улица Пушкина, 32</div>
                  </div>
              </div>
          </div>
      </div>
  )
}