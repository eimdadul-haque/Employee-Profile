import React, { useEffect, useState } from 'react';
import DefaultImg from "../asset/R.png";
import { addEmploye } from "../Redux/Actions/reloadAction"
import { useDispatch, useSelector } from "react-redux";


const initialState = {
    Id: 0,
    EmployeeName: "",
    EmployeeOccupation: "",
    ImageName: "",
    ImageFile: null,
    ImageSrc: ""
}

export default function EmployeeFrom() {

    const {employe} = useSelector(state => state.employeStore)
    const dispatch = useDispatch();
    const [Info, setInfo] = useState(initialState);

    useEffect(() => {
        setInfo({
            Id: employe.id,
            EmployeeName: employe.name,
            EmployeeOccupation: employe.occupation,
            ImageSrc: employe.imageSrc || DefaultImg
        });
    }, [employe])

    const handleSubmit = e => {
        const { name, value } = e.target;
        setInfo({
            ...Info,
            [name]: value
        });

    }

    const imgePreview = e => {
        if (e.target.files && e.target.files[0]) {
            const ImageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setInfo({
                    ...Info,
                    ImageFile,
                    ImageSrc: x.target.result
                });
            }

            reader.readAsDataURL(ImageFile);
        }

        else {
            setInfo({
                ...Info,
                ImageFile: null,
                ImageSrc: DefaultImg
            });
        }
    }

    const submitData =(data)=>{
        dispatch(addEmploye(data));
        document.getElementById("File").value = "";
        setInfo({
            ...Info,
            EmployeeName: "",
            EmployeeOccupation: "",
            ImageSrc: DefaultImg
        });
    }

    return (
        <div className="mb-5">
            <div className="card w-100">
                <img src={Info.ImageSrc} className="card-img-top" />
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <input name="EmployeeName" onChange={(e) => handleSubmit(e)} className="form-control" placeholder="Employee Name" value={Info.EmployeeName} />
                        </div>
                        <div className="form-group">
                            <input name="EmployeeOccupation" onChange={(e) => handleSubmit(e)} className="form-control" placeholder="Occupation" value={Info.EmployeeOccupation} />
                        </div>
                        <div className="form-group">
                            <input type="file" id="File" accept="image/*" className="form-control-file" onChange={(e) => imgePreview(e)} />
                        </div>
                    </form>
                    <div>
                        <button onClick={(e)=>submitData(Info)} className="btn btn-outline-warning">Submin</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

