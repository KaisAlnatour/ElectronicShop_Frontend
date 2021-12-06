
import http from "../http/index";
import AppConsts from "../../../app-consts";

const apiEndpoint = AppConsts.remoteServiceBaseUrl + "/login";
const tokenKey = "token";

export async function signUp(user) {
    const data = await http.post('sign-up', user);
    return data;
}

export async function login(email, password) {
    const data = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, data.data.data.token);
    localStorage.setItem('userType', data.data.data.user.type);
    localStorage.setItem('userId', data.data.data.user.id);
    console.log(data.data.data.user);
    return data;
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwt;
    } catch (ex) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

