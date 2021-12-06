/* eslint-disable no-useless-concat */
import http from '../common/http/index';
import AppConsts from '../../app-consts';

const apiEndpoint = AppConsts.remoteServiceBaseUrl + "/estates/";

export async function addEstates(addTrainers) {
    const data = await http.post(apiEndpoint + 'add', addTrainers);
    return data;
}
export async function updateEstates(updateTrainers) {
    console.log(updateTrainers);
    const data = await http.put(apiEndpoint + 'edit', updateTrainers);
    return data;
}
export async function deleteEstates(id) {
    const data = await http.delete(apiEndpoint + 'delete/' + `${id}`);
    return data;
}
export async function showAllEstates() {
    const data = await http.get(apiEndpoint + 'all');
    return data;
}
export async function showEstatesById(id) {
    const data = await http.get(apiEndpoint + 'showByID/' + `${id}`);
    return data;
}