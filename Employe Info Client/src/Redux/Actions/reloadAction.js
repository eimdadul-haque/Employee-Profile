import { ActionType } from "../ActionType"
import axios from "axios";


export const getAllEmploye = () => async (dispatch, Store) => {
    try {
        axios.get("http://localhost:5401/api/Employe/")
            .then(res => {
                dispatch({
                    type: ActionType.GET_ALL,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log("get Error...");
            });
    } catch (error) {

    }
}

export const addEmploye = (data) => async (dispatch, Store) => {

    const fromData = new FormData();
    fromData.append('name', data.EmployeeName);
    fromData.append('occupation', data.EmployeeOccupation);
    fromData.append('imageFile', data.ImageFile)

    try {
        axios.post(
            "http://localhost:5401/api/Employe/",
            fromData,
            { 'content-Type': 'multipart/form-data' }
        )
            .then(res => {
                dispatch({
                    type: ActionType.GET_ALL,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log("Add Error...");
            });
    } catch (error) {

    }
}

export const EditEmploye = (data) => async (dispatch, Store) => {

    const fromData = new FormData();
    fromData.append('name', data.EmployeeName);
    fromData.append('occupation', data.EmployeeOccupation);
    fromData.append('imageFile', data.ImageFile)

    try {
        axios.put(
            "http://localhost:5401/api/Employe/",
            fromData,
            { 'content-Type': 'multipart/form-data' }
        )
            .then(res => {
                dispatch({
                    type: ActionType.GET_ALL,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log("Add Error...");
            });
    } catch (error) {

    }
}

export const deleteEmployeAction = (id) => async (dispatch, Store) => {
    try {
        axios.delete("http://localhost:5401/api/Employe/" + id)
            .then(res => {
                dispatch({
                    type: ActionType.GET_ALL,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log("Delete Error");
            });
    } catch (error) {

    }
}


export const passData = (data) => async (dispatch, Store) => {
    try {
        dispatch({
            type: ActionType.EDIT_DATA,
            payload: data
        })
    } catch (error) {

    }
}