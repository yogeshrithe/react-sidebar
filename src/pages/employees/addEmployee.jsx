import { Form,Button, InputGroup, ButtonGroup } from 'react-bootstrap';
import {FormControl,Autocomplete, TextField} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link,useLocation } from "react-router-dom";
import axios from 'axios'

function AddEmployee() {
  const location=useLocation()
  const role = ['ADMIN', 'EMPLOYEE']
  const [EmployeeName, setEmployeeName] = useState('')
  const [Email, setEmail] = useState('')
  const [MobileNo, setMobileNo] = useState('')
  const [DOB, setDOB] = useState('')
  const [Address, setAddress] = useState('')
  const [Role, setRole] = useState('')

  useEffect(() => {
    if (location.state) {
      setEmployeeName(location.state.name)
      setEmail(location.state.email)
      setMobileNo(location.state.mobileno)
      setAddress(location.state.address)
      setRole(location.state.role)
      setDOB(location.state.dob)
    }
  }, [])

  const postData = () => {
    console.log("helo")
    const employee = {
      name: EmployeeName,
      email: Email,
      mobileno: MobileNo,
      dob: DOB,
      address:Address,
      role: Role
    }
    axios.post("http://52.66.244.82:3001/employees", employee)
  }

  const updateData = () => {
    const employee = {
      name: EmployeeName,
      email: Email,
      mobileno: MobileNo,
      address: Address,
      role: Role,
      dob:DOB
    }
    axios.put("http://52.66.244.82:3001/employees/"+location.state._id,employee)
  }

  const renderButton = ()=>{
    if (location.state) {
      return <Button onClick={updateData} style={{ marginLeft: '780px', backgroundColor: '#fca11a' }}>
        Update
      </Button>
    }
    else {
      return <Button onClick={postData} style={{ marginLeft: '780px', backgroundColor: '#fca11a' }}>
        Submit
      </Button>
    }
    
  }

  return (
    <div>
      <h2 className="page-header ml-2"><i className='bx bxs-user-account mr-2 mt-1'></i>addEmployees</h2>
      <Form className="card mr-4" >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Employee Name" value={EmployeeName} onChange={(e) => setEmployeeName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" placeholder="Enter Date Of Birth" value={DOB} onChange={(e) => setDOB(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mobile No.</Form.Label>
          <Form.Control type="text" placeholder="Enter Mobile No." value={MobileNo} onChange={(e) => setMobileNo(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Enter Address" value={Address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <InputGroup className="mb-2">
          <h6 className="mt-1">Role</h6>
        </InputGroup>

        <FormControl className="mb-5">
          <Autocomplete
            style={{ width: 910 }}
            freeSolo
            autoComplete
            autoHighlight
            options={role}
            value={Role} 
            onChange={(e) => setRole(e.currentTarget.innerHTML)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Status"
                size="small"
              />
            )}
          />
        </FormControl>
      </Form>
      <ButtonGroup className='mb-5'>
        <Link to={'/employees'}>
          {renderButton()}
        </Link>
        <Link to={'/employees'}>
          <Button style={{ marginLeft: '12px', backgroundColor: '#fca11a' }}>
            Cancel
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
}

export default AddEmployee;