import React, {  useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Delete from "@material-ui/icons/Delete";
import { getAllEmploye, deleteEmployeAction , passData} from "../Redux/Actions/reloadAction";

export default function EmployeeTable() {

    const dispatch = useDispatch()
    const { employes } = useSelector(state => state.employeStore);

    useEffect(() => {
        dispatch(getAllEmploye());
    }, [employes])

    const deleteEmploye = (id) => {
        dispatch(deleteEmployeAction(id))
    }

    const edit =(data)=>{
        dispatch(passData(data));
    }
    return (
        <div className="row w-100 d-flex justify-content-end">
            {
                employes.map((data, index) =>
                    <div className="col-4 p-0 ">
                        <div onClick={()=>edit(data)}  key={index} className="card">
                            <img src={data.imageSrc} className="card-img-top rounded-circle" />
                            <div className="card-body">
                                <p>{data.id}</p>
                                <p>{data.name}</p>
                            </div>
                            <div className="card-footer">
                                <button onClick={() => deleteEmploye(data.id)} className="btn  btn-outline-danger"><Delete /></button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}
