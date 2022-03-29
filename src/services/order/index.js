/* eslint-disable no-useless-concat */
import http from '../common/http/index';
import AppConsts from '../../app-consts';

const apiEndpoint = AppConsts.remoteServiceBaseUrl + "order/";

export async function addOrder(addOrder) {
    const data = await http.post(apiEndpoint + 'add', addOrder);
    return data;
}
export async function updateOrder(updateOrder) {    
    const data = await http.put(apiEndpoint + 'edit', updateOrder);
    return data;
}
export async function deleteOrder(id) {
    const data = await http.delete(apiEndpoint + 'delete/' + `${id}`);
    return data;
}

export async function showAllOrder() {
    const data = await http.get(apiEndpoint + 'getAll');
    return data;
}

export async function showOrderById(id) {
    const data = await http.get(apiEndpoint + 'showByID/' + `${id}`);
    return data;
}