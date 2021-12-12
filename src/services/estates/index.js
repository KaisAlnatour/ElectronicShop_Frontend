/* eslint-disable no-useless-concat */
import http from '../common/http/index';
import AppConsts from '../../app-consts';

const apiEndpoint = AppConsts.remoteServiceBaseUrl + "Estates/";
const myApiEndpoint = AppConsts.remoteServiceBaseUrl + "admin/Estates/";

const user_name = localStorage.user_name;
const password =  localStorage.password;
// console.log(user_name);
export async function addEstates(addTrainers) {
    const data = await http.post(myApiEndpoint + 'addEstates', addTrainers
        , {
            headers: {
                "Authorization": 'Basic ' + window.btoa(user_name + ":" + password)
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
                "Authorization": 'Basic ' + window.btoa(user_name + ":" + password)
            }
        }
    );
    return data;
}
export async function deleteEstates(id) {
    const data = await http.delete(myApiEndpoint + 'deleteEstates/' + `${id}`
        , {
            headers: {
                "Authorization": 'Basic ' + window.btoa(user_name + ":" + password)
            }
        }
    );
    return data;
}


export async function buyEstates(estates_ids) {
    const data = await http.post(apiEndpoint + 'EstatesBuy' , {'estates_ids':estates_ids}
        , {
            headers: {
                "Authorization": 'Basic ' + window.btoa(user_name + ":" + password)
            }
        }
    );
    return data;
}



export async function filterEstates(price) {
    const data = await http.post(apiEndpoint + 'EstatesFilter' , price
        , {
            headers: {
                "Authorization": 'Basic ' + window.btoa(user_name + ":" + password)
            }
        }
    );
    return data;
}

export async function showAll() {
    const data = await http.get(apiEndpoint + 'getAll'
        , {
            headers: {
                "Authorization": 'Basic ' + window.btoa(user_name + ":" + password)
            }
        }
    );
    return data;
}

export async function showAllEstates() {
    const data = await http.get(apiEndpoint + 'getAllEstates'
        , {
            headers: {
                "Authorization": 'Basic ' + window.btoa(user_name + ":" + password)
            }
        }
    );
    return data;
}



export async function showEstatesById(id) {
    const data = await http.get(apiEndpoint + 'showByID/' + `${id}`);
    return data;
}