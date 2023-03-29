import API from ".";
import { ISignup, ILogin } from '../utils/types';

const authApi = {
    signup: (params: ISignup) => API.post('/auth/signup', params),
    login: (params: ILogin) => API.post('/auth/login', params),
    verifyToken: () => API.post('/auth/verify-token')
}

export default authApi;