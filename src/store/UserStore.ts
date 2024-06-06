import {action, makeAutoObservable, observable, runInAction} from "mobx";
import axios, {AxiosResponse} from "axios";

export type SignInUser = {
    email: string;
    password: string;
}

export type SignUpUser = {
    name?: string;
    surname?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
}

export type User = {
    name: string;
    surname: string;
    email: string;
    id: string;
    token: string;
    avatarUrl: string;
    phoneNumber: string;
    createdAt: string;
    description: string;
}

export type ErrorItem = {
    entry: string;
    errorMessage: string;
}

export class UserStore {
    signInErrors: SignInUser;
    signUpErrors: SignUpUser;
    user: User | undefined;

    constructor() {
        makeAutoObservable(this,
            {
                signInErrors: observable,
                signUpErrors: observable,
                user: observable,
                signInUser: action,
                signUpUser: action,
                getUser: action
            });
        this.signInErrors = {
            email: '',
            password: '',
        }
        this.signUpErrors = {
            name: '',
            surname: '',
            email: '',
            phoneNumber: '',
            password: '',
        }
    }

    signInUser = async(data: SignInUser): Promise<boolean> => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            accept: {}
        };
        try {
            const response: AxiosResponse<User> =
                await axios.post(`http://localhost:5038/User/auth`, data, config);

            runInAction(() => this.user = response.data);
            sessionStorage.setItem("tokenKey", response.data.token);
            console.log(response.data)
            console.log(this.user)
            console.log(this.getUser)
            return true;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData: ErrorItem[] = [error.response?.data];
                console.log(responseData)
                responseData.map((value) => {
                    runInAction(() => {
                        if(value.entry == "Email"){
                            this.signInErrors.email = value.errorMessage;
                            this.signInErrors.password = "";
                        } else if(value.entry == "Password"){
                            this.signInErrors.password = value.errorMessage;
                            this.signInErrors.email = "";
                        }
                    })
                })
            }
            throw error;
        }
    }

    signUpUser = async(data: SignUpUser): Promise<boolean> => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            accept: {}
        };
        try {
            const response: AxiosResponse<User> =
                await axios.post(`http://localhost:5038/User/new`, data, config);

            runInAction(() => this.user = response.data);
            return true;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData: ErrorItem[] = error.response?.data;
                console.log(responseData)
                runInAction(() => {
                    responseData.map((item) =>{
                        console.log(item)
                        this.signUpErrors = ({
                            ...this.signUpErrors,
                            [item.entry.charAt(0).toLowerCase() + item.entry.slice(1)]: item.errorMessage
                        })
                    })
                })
            }
            throw error;
        }
    }

    getUser = (): User | undefined => {
        console.log(this.user)
        return this.user;
    }
}

export const userStore = new UserStore();