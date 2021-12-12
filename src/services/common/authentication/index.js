
import http from "../http/index";
import AppConsts from "../../../app-consts";

const apiEndpoint = AppConsts.remoteServiceBaseUrl + "user_management/login";
const tokenKey = "token";

export async function signUp(user) {
    const data = await http.post('sign-up', user);
    return data;
}

export async function login(user_name, password) {
    const data = await http.post(apiEndpoint, { user_name, password });    
    localStorage.setItem('user_name',  user_name);
    localStorage.setItem('password',  password);
    // console.log(data.data.data.user);
    return data;
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    // localStorage.removeItem(user_name);
    localStorage.user_name = "";
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

