/* eslint-disable no-useless-concat */

import http from '../common/http/index';
import AppConsts from '../../app-consts';

const apiEndpoint = AppConsts.remoteServiceBaseUrl + "/student/";

export async function addStudent(addStudent) {
    const data = await http.post('add', addStudent);
    return data;
}
export async function updateStudent(updateStudent) {
    const data = await http.put(apiEndpoint + 'edit', updateStudent);
    return data;
}
export async function deleteStudent(id) {
    const data = await http.delete(apiEndpoint + 'delete/' + `${id}`);
    return data;
}
export async function showAllStudents() {
    const data = await http.get(apiEndpoint + 'all');
    return data;
}
export async function showStudentById(id) {
    const data = await http.get(apiEndpoint + 'showByID/' + `${id}`);
    return data;
}