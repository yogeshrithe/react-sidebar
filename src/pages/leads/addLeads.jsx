import { Form, Button, InputGroup, ButtonGroup } from 'react-bootstrap';
import { FormControl, Autocomplete, TextField } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios'
function AddLead() {
  const location = useLocation()
  const status = ['ACTIVE', 'DISABLED']
  const [LeadName, setLeadName] = useState('')
  const [Email, setEmail] = useState('')
  const [MobileNo, setMobileNo] = useState('')
  const [Address, setAddress] = useState('')
  const [Status, setStatus] = useState('')

  useEffect(() => {
    if (location.state) {
      setLeadName(location.state.leadName)
      setEmail(location.state.email)
      setMobileNo(location.state.mobileno)
      setAddress(location.state.address)
      setStatus(location.state.status)
    }
  }, [])

  const postData = () => {
    const lead = {
      leadName: LeadName,
      email: Email,
      mobileno: MobileNo,
      address: Address,
      status: Status
    }
    axios.post("http://52.66.244.82:3001/leads", lead)
  }

  const updateData = () => {
    const lead = {
      leadName: LeadName,
      email: Email,
      mobileno: MobileNo,
      address: Address,
      status: Status
    }
    axios.put("http://52.66.244.82:3001/leads/"+location.state._id,lead)
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
      <h2 className="page-header ml-2"><i className='bx bxs-star mr-2 mt-1'></i>addLeads</h2>
      <Form className="card mr-4" >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Lead Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Lead Name" value={LeadName} onChange={(e) => setLeadName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
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
          <h6 className="mt-1">Status</h6>
        </InputGroup>

        <FormControl className="mb-5">
          <Autocomplete
            style={{ width: 910 }}
            freeSolo
            autoComplete
            autoHighlight
            options={status}
            value={Status}
            onChange={(e) => setStatus(e.currentTarget.innerHTML)}
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
        <Link to={'/leads'}>
          {renderButton()}
        </Link>
        <Link to={'/leads'}>
          <Button style={{ marginLeft: '12px', backgroundColor: '#fca11a' }}>
            Cancel
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
}

export default AddLead;