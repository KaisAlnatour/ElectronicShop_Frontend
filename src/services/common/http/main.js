import axios from "axios";
// import { getCurrentUser } from '../authentication/index';
import AppConsts from '../../../app-consts';
const qs = require("qs");
class httpClientFactory {

        create(baseUrl) {
                const http = axios.create({
                        baseURL: baseUrl,
                        timeout: 30000,
                        paramsSerializer: function (params) {
                                return qs.stringify(params, {
                                        encode: false,
                                });
                        },
                });

                // http.interceptors.request.use(
                //         function (config) {
                //                 if (getCurrentUser()) {
                //                         config.headers.common['Authorization'] = 'Bearer ' + getCurrentUser();
                //                 }
                //                 return config;
                //         },

                //         function (error) {
                //                 return Promise.reject(error);
                //         }
                // );

                http.interceptors.response.use(
                        (response) => {
                                return response;
                        },

                        (error) => {
                                if (error?.response?.status === 401 /* Unauthorized */) {
                                        window.location.href = `${AppConsts.baseUrl}/user/login`;
                                } else if (error?.response?.status === 400) {

                                        alert("Oops!!!: " + error.response.data.data?.code);
                                }
                                else if (error?.response?.status === 404) {

                                        alert(error.response.data.message);
                                }
                                setTimeout(() => { }, 1000);

                                return Promise.reject(error);
                        }
                );
                return http;
        }
}

export default new httpClientFactory();
