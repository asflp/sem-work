import axios from 'axios';
import {SignInUser, SignUpUser, User, UserStore} from "../store/UserStore.ts";

jest.mock('axios');

describe('UserStore', () => {
    let userStore: UserStore;
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    beforeEach(() => {
        userStore = new UserStore();
    });

    it('должен входить пользователя', async () => {
        const user: User = {
            name: "Alisa", surname: "Filippovykh", email: "as.flp@mail.ru", token: "111", id: "12345678",
            avatarUrl: "something", phoneNumber: "89123456789" };
        const data: SignInUser = { email: "as.flp@mail.ru", password: "1234" };

        mockedAxios.post.mockResolvedValueOnce({ data: user });

        const result = await userStore.signInUser(data);

        expect(result).toBe(true);
        expect(data.email).toEqual(user.email)
        expect(userStore.user).toEqual(user);
    });

    it('должен регистрировать пользователя', async () => {
        const user: User = { name: "Alisa", surname: "Filippovykh", email: "as.flp@mail.ru", token: "111", id: "12345678",
            avatarUrl: "something", phoneNumber: "89123456789" };
        const data: SignUpUser = { name: "Alisa", surname: "Filippovykh", email: "as.flp@mail.ru", phoneNumber: "89123456789" };

        mockedAxios.post.mockResolvedValueOnce({ data: user });

        const result = await userStore.signUpUser(data);

        expect(data.name).toEqual(user.name);
        expect(data.surname).toEqual(user.surname);
        expect(data.email).toEqual(user.email);
        expect(data.phoneNumber).toEqual(user.phoneNumber);
        expect(result).toBe(true);
        expect(userStore.user).toEqual(user);
    });

    it('должен получить пользователя', () => {
        const user: User = { name: "Alisa", surname: "Filippovykh", email: "as.flp@mail.ru", token: "111", id: "12345678",
            avatarUrl: "something", phoneNumber: "89123456789" };
        userStore.user = user;

        const result = userStore.getUser();

        expect(result).toEqual(user);
    });
});
