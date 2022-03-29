/* eslint-disable no-useless-concat */
import http from '../common/http/index';
import AppConsts from '../../app-consts';

const apiEndpoint = AppConsts.remoteServiceBaseUrl + "product/";

export async function addProduct(addProduct) {
    const data = await http.post(apiEndpoint + 'add', addProduct);
    return data;
}
export async function updateProduct(updateProduct) {    
    const data = await http.put(apiEndpoint + 'edit', updateProduct);
    return data;
}
export async function deleteProduct(id) {
    const data = await http.delete(apiEndpoint + 'delete/' + `${id}`);
    return data;
}

export async function showAllProduct() {
    const data = await http.get(apiEndpoint + 'getAll');
    return data;
}

export async function showAllSupplier() {
    const data = await http.get(apiEndpoint + 'getAllSupplier');
    return data;
}
