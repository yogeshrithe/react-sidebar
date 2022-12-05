import { Form, Button,ButtonGroup } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios'
function AddRole() {
  const location = useLocation()

  const [Role, setRole] = useState('')
  const [Level, setLevel] = useState(0)

  useEffect(() => {
    if (location.state) {
      setRole(location.state.role)
      setLevel(location.state.level)
    }
  }, [])

  const postData = () => {
    const role = {
      role: Role,
      level: Level,
    }
    axios.post("http://52.66.244.82:3001/roles", role)
  }

  const updateData = () => {
    const role = {
        role: Role,
        level: Level,
      }
    axios.put("http://52.66.244.82:3001/roles/"+location.state._id,role)
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
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" placeholder="Enter Role" value={Role} onChange={(e) => setRole(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Level</Form.Label>
          <Form.Control type="email" placeholder="Enter Level" value={Level} onChange={(e) => setLevel(e.target.value)} />
        </Form.Group>
      </Form>
      <ButtonGroup className='mb-5'>
        <Link to={'/roles'}>
          {renderButton()}
        </Link>
        <Link to={'/roles'}>
          <Button style={{ marginLeft: '12px', backgroundColor: '#fca11a' }}>
            Cancel
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
}

export default AddRole;