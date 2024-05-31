import { action, makeAutoObservable, observable } from "mobx";
import axios, { AxiosResponse } from 'axios';

export type AdItem  = {
    id: string
    isLike: boolean
    name: string
    photoUrl: string | null
    price: number
    username: string
}

export type AdsResponse = {
    result: AdItem[];
    pages: number;
}

export class AdvertisementStore {
    ads: AdItem[] = [];

    constructor() {
        makeAutoObservable(this, {
            ads: observable,
            getAllAds: action,
        });
    }

    getAllAds = async (page: number): Promise<AdItem[]> => {
        try {
            const response: AxiosResponse<AdsResponse> =
                await axios.get(`http://localhost:5038/Advertisement/all?PageNumber=${page}&Batchsize=12`);

            return response.data.result; // Return the data from the response
        } catch (error) {
            console.error('Error fetching ad data:', error);
            throw error;
        }
    };
}

export const adStore = new AdvertisementStore();