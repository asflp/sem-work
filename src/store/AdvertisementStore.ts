import { action, makeAutoObservable, observable } from "mobx";
import axios, { AxiosResponse } from 'axios';
import {User} from "./UserStore.ts";

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

export type Advertisement = {
    name: string;
    category: string;
    price: number;
    description: string;
    photoUrls: string[];
    city: string;
    street: string;
    building: string;
    userId: string;
    user: User;
    likes: null;
    id: string;
    createdAt: string;
}

export type ErrorsAdd = {
    name: string;
    category: string;
    price: string;
    description: string;
    images: string;
    city: string;
    street: string;
    building: string;
}

export class AdvertisementStore {
    ads: AdItem[] = [];
    errors: ErrorsAdd = {
        name: '',
        category: '',
        price: '',
        description: '',
        images: '',
        city: '',
        street: '',
        building: ''
    }
    favorite: AdItem[] = [];
    cart: AdItem[] = [];

    constructor() {
        makeAutoObservable(this, {
            ads: observable,
            getAllAds: action,
            favorite: observable,
            cart: observable
        });
    }

    getAllAds = async (page: number): Promise<AdItem[]> => {
        try {
            const response: AxiosResponse<AdsResponse> =
                await axios.get(`http://localhost:5038/Advertisement/all?PageNumber=${page}&Batchsize=12`);

            return response.data.result;
        } catch (error) {
            console.error('Error fetching ad data:', error);
            throw error;
        }
    };

    getById = async (id: string): Promise<Advertisement> => {
        try {
            const response: AxiosResponse<Advertisement> =
                await axios.get(`http://localhost:5038/Advertisement/${id}`);

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching ad data:', error);
            throw error;
        }
    }

    getByUser = async (id: string): Promise<void> => {
        try {
            const response: AxiosResponse<AdItem[]> =
                await axios.get(`http://localhost:5038/Advertisement/${id}`);

            this.favorite = response.data;
        } catch (error) {
            console.error('Error fetching ad data:', error);
            throw error;
        }
    }

}

export const adStore = new AdvertisementStore();