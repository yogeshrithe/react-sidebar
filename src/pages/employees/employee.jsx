import { Button } from "react-bootstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

const Employee = () => {
    const [EmployeeData, setEmployeeData] = useState([])

    const fetchLeadData=()=>{
        axios.get("http://52.66.244.82:3001/employees").then((response) => {
            setEmployeeData(response.data)
        })
    }

    useEffect(() => {
        fetchLeadData()
    }, [EmployeeData])

    const deleteData=(id)=>{
        axios.delete("http://52.66.244.82:3001/employees/"+id).then(fetchLeadData())
    }
    
    return (
        <div className="mr-5">
            <h2 className="page-header ml-2"><i className='bx bxs-user-account mr-2 mt-1'></i>Employees</h2>
            <div className="card">
                <div className="card__body ">
                <Table className="table-wrapper">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Mobile No</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>DOB</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {EmployeeData.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.mobileno}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.dob}</TableCell>
                                        <TableCell>{item.role}</TableCell>
                                        <TableCell>
                                            <Link to={'/addEmployee'} state={item}>
                                                <IconButton>
                                                    <i style={{color:'green'}} className="bx bxs-edit" />
                                                </IconButton>
                                            </Link>
                                            <IconButton onClick={()=>deleteData(item._id)}>
                                                <i style={{color:'red'}} className="bx bxs-trash" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
                <Link to={'/addEmployee'}>
                    <Button style={{ marginLeft: '810px', backgroundColor: '#fca11a' }}>
                        Add Employee
                    </Button>
                </Link>
                
        </div>
    )
}

export default Employee