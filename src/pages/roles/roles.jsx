import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

const Roles = () => {
    
    const [RoleData, setRoleData] = useState([])

    const fetchLeadData=()=>{
        axios.get("http://52.66.244.82:3001/roles").then((response) => {
            setRoleData(response.data)
        })
    }

    useEffect(() => {
        fetchLeadData()
    }, [RoleData])
    
    const deleteData=(id)=>{
        axios.delete("http://52.66.244.82:3001/roles/"+id).then(fetchLeadData())
    }

    return (
        <div className="mr-5">
            <h2 className="page-header ml-2"><i className='bx bxs-group mr-2 mt-1'></i>Roles</h2>
            <div className="card">
                <div className="card__body ">
                <Table className="table-wrapper">
                        <TableHead>
                            <TableRow>
                                <TableCell>Role</TableCell>
                                <TableCell>Level</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {RoleData.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{item.role}</TableCell>
                                        <TableCell>{item.level}</TableCell>
                                        <TableCell>
                                            <Link to={'/addRoles'} state={item}>
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
            <Link to={'/addRoles'}>
                <Button style={{ marginLeft: '850px', backgroundColor: '#fca11a' }}>
                    Add Role
                </Button>
            </Link>
        </div>
    )
}

export default Roles