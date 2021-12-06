import AppConsts from "../../../app-consts";
import httpClientFactory from "./main";

const http = httpClientFactory.create(AppConsts.remoteServiceBaseUrl);

export default http;
