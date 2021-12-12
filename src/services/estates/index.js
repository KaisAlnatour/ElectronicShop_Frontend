/* eslint-disable no-useless-concat */
import http from '../common/http/index';
import AppConsts from '../../app-consts';

const apiEndpoint = AppConsts.remoteServiceBaseUrl + "Estates/";
const myApiEndpoint = AppConsts.remoteServiceBaseUrl + "admin/Estates/";


export async function addEstates(addTrainers) {
    const data = await http.post(myApiEndpoint + 'addEstates', addTrainers
        , {
            headers: {
                "Authorization": 'Basic ' + window.btoa("admin" + ":" + "admin")
            }
        }
    );
    return data;
}
export async function updateEstates(updateTrainers) {
    console.log(updateTrainers);
    const data = await http.put(myApiEndpoint + 'updateEstates', updateTrainers
        , {
            headers: {
                "Authorization": 'Basic ' + window.btoa("admin" + ":" + "admin")
            }
        }
    );
    return data;
}
export async function deleteEstates(id) {
    const data = await http.delete(myApiEndpoint + 'deleteEstates/' + `${id}`
        , {
            headers: {
                "Authorization": 'Basic ' + window.btoa("admin" + ":" + "admin")
            }
        }
    );
    return data;
}


export async function showAllEstates() {
    const data = await http.get(apiEndpoint + 'getAllEstates'
        , {
            headers: {
                "Authorization": 'Basic ' + window.btoa("admin" + ":" + "admin")
            }
        }
    );
    return data;
}
export async function showEstatesById(id) {
    const data = await http.get(apiEndpoint + 'showByID/' + `${id}`);
    return data;
}