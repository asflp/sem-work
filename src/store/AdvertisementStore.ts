import { observable, action } from "mobx";
import axios, { AxiosResponse } from 'axios';

export type AdItem  = {
    id: string
    isLike: boolean
    name: string
    photoUrl: string | null
    price: number
    username: string
}

export class AdvertisementStore {

    @observable
    ads: AdItem[] = [];

    // @action
    // addTodo = ({name, description} : Omit<AdItem, 'checked' | 'id'>) => {
    //     this.todos.push({id: this.todos.length == 0 ? 1 :
    //             this.todos[this.todos.length - 1].id! + 1, name, description, completed: false })
    //     localStorage.setItem('tasks', JSON.stringify(this.todos));
    // }

    @action
    getAllAds = async (page: number): Promise<AdItem[]> => {
        try {
            console.log("sss");
            const response: AxiosResponse<AdItem[]> = await axios.get(`http://localhost:5038/Advertisement/all?PageNumber=${page}&Batchsize=12`);
            return response.data; // Return the data from the response
        } catch (error) {
            console.error('Error fetching ad data:', error);
            throw error;
        }
    };

    // @action
    // removeTodo = (id: Todo['id']) => {
    //     this.todos = this.todos.filter(todo => todo.id !== id);
    //     localStorage.setItem('tasks', JSON.stringify(this.todos));
    // }
    //
    // @computed
    // get info() {
    //     return {
    //         notCompleted: this.todos.filter(todo => !todo.completed).length,
    //     }
    // }
}

export const advertisementStore = new AdvertisementStore();