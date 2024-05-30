import {FC} from "react";
import styles from "./AdvertisementItem.module.sass"
import star from "../../assets/main/star.svg"
import like from "../../assets/advertisement/like.svg"

export interface AdvertisementItemProps{
    imageUrl: string
    name: string
    cost: number
    person: string
    rate: number
}

export const AdvertisementItem:FC<AdvertisementItemProps> = ({ imageUrl, name, cost, person, rate}) => {
  return(
      <div className={styles.ad_item}>
          <img className={styles.ad_item__image} src={imageUrl}/>

          <div className={styles.ad_item__main}>
              <div>{name}</div>
              <div>{cost}₽</div>
          </div>

          <div className={styles.ad_item__other}>
              <div className={styles.ad_item__other__person}>
                  <div className={styles.ad_item__other__person__name}>{person}</div>
                  <div className={styles.ad_item__other__person__rate}>
                      {
                          Array.from({ length: Math.floor(rate) }, (_, index) => (
                              <img key={index} src={star} alt={""}/>
                          ))
                      }
                  </div>
              </div>

              <img src={like} alt={""} className={styles.ad_item__other__like}/>
          </div>
      </div>
  )
}