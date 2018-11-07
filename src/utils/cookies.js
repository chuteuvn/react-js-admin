import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const set = (key, value) => {
    cookies.set(key, value, { path: '/' });
}

export const get = (key) => {
    return cookies.get(key);
}