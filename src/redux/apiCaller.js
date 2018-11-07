import axios, { CancelToken } from 'axios';
import { CANCEL } from 'redux-saga';
import * as env from '../configs/env';
import AppError from './../utils/AppError';

let token;

axios.defaults.baseURL = env.SERVER;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

const baseConfig = {
    transformResponse: [(data) => {
        const _data = JSON.parse(data);
        if (_data.code != 200) {
            throw new AppError(_data, _data.message)
        }
        return _data;
    }],
    // withCredentials: true,
}

const getConfig = {
    ...baseConfig
}

const postConfig = {
    ...baseConfig
}

export const get = (url) => {
    const source = CancelToken.source();
    const req = axios.get(url, {
        ...getConfig,
        ...headersConfig(),
        cancelToken: source.token
    });
    req[CANCEL] = () => source.cancel();
    return req;
}

export const post = (url, data) => {
    console.log(url);
    console.log(data);
    const source = CancelToken.source();
    const req = axios.post(url,
        data,
        {
            ...postConfig,
            ...headersConfig(),
            cancelToken: source.token
        }
    );
    req[CANCEL] = () => {
        source.cancel();
    }
    return req.then(rs => {
        console.log(rs)
        return rs;
    }).catch(e => {
        throw new AppError(e, e.message)
    });
}

const headersConfig = () => {
    if (token) {
        return {
            headers: {
                'accessToken': token,
            }
        }
    }
    return {}
}

export const setToken = (newToken) => {
    token = newToken;
}
