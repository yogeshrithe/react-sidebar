// import Table from "../../components/table/table"
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


const Leads = () => {
    const [LeadData, setLeadData] = useState([])

    const fetchLeadData=()=>{
        axios.get("http://52.66.244.82:3001/leads").then((response) => {
            setLeadData(response.data)
        })
    }

    useEffect(() => {
        fetchLeadData()
    }, [LeadData])

    const deleteData=(id)=>{
        axios.delete("http://52.66.244.82:3001/leads/"+id).then(fetchLeadData())
    }

    return (
        <div className="mr-5">
            <h2 className="page-header ml-2"><i className='bx bxs-star mr-2 mt-1'></i>Leads</h2>
            <div className="card">
                <div className="card__body ">
                    <Table className="table-wrapper">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Mobile No</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {LeadData.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{item.leadName}</TableCell>
                                        <TableCell>{item.mobileno}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>
                                            <Link to={'/addLeads'} state={item}>
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
            <Link to={'/addLeads'}>
                <Button style={{ marginLeft: '850px', backgroundColor: '#fca11a' }}>
                    Add Lead
                </Button>
            </Link>

        </div>
    )
}

export default Leads