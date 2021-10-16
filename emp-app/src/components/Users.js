import React, { Component } from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import { Link } from 'react-router-dom';

class Users extends Component {
  state = {
    records: [],
    name: '',
    city: ''
  };

 async componentDidMount(){
         
    const user = {
      "username":"in28minutes",
      "password":"dummy"
    };

    const jwt= await fetch("/authenticate",{
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 
          "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
    
    sessionStorage.setItem("token", jwt.token);

    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Bearer '+ jwt.token},
    };

    fetch("/v1/employees", requestOptions)
    .then(response => response.json())
    .then(data => this.setState({records: data}))
  }

  handleDelete = (record) => {
    console.log("handle delete.."+record.id);
    const token = sessionStorage.getItem("token");  

    //delete
    fetch("/v1/employees/"+record.id,{
      method: "DELETE",
      headers: { 
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': 'Bearer '+ token
      } 
    }
    ).then(response => response.json())
    .then(data => this.setState({records: data}))
  }

   render(){
    return <React.Fragment>
      <div>
        <Button color="success" tag={Link} to="/users/new">Add User</Button>
      </div>
      <div>
      <table className="table"> 
        <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
        </tr>
        </thead>
        <tbody>
        {this.state.records.map( record => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.city}</td>
              <td>
               <ButtonGroup> 
                <Button size="sm" color="primary" tag={Link} to={"/users/"+record.id}>Edit</Button>
                <Button size="sm" color="danger" onClick={()=> this.handleDelete(record)}>Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>        
      </table>
      </div>
    </React.Fragment>

  }
}

export default Users;