import React, { Component } from 'react';
import {Button, Form} from 'reactstrap';

class AddUser extends Component {

      constructor(props) {
        super(props);
        this.state = {
            item: {}
        };
      }

      componentDidMount(){
        console.log("param :"+ `${this.props.match.params.id}`);
        const token = sessionStorage.getItem("token");  

        if(this.props.match.params.id!=='new'){
            fetch("/v1/employees/"+`${this.props.match.params.id}`, {
              headers: { 
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer '+ token
              } 
            })
            .then(response => response.json())
            .then(data => this.setState({item: data}))

            console.log(this.state.item);
        }
      }

      handleSubmit = (event) => {
        console.log("handle method..");
        const token = sessionStorage.getItem("token");  
        const {item} = this.state;
        console.log(item);

        //add record
        fetch("/v1/employees" + (item.id ? '/' + item.id : ''),{
            method: (item.id) ? 'PUT' : 'POST',
            body: JSON.stringify(item),
            headers: { 
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer '+ token
            }}
            ).then(response => response.json())
            .then(data => this.setState({item: data}))

            this.props.history.push('/');
      }
    
      handleChange = (event) =>{
        console.log(event.target.value)
        let item={...this.state.item};
        item[event.target.name]=event.target.value;
        this.setState({item});
      }

    render(){
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit User' : 'Add User'}</h2>;

        return <div>
           {title} 
           <Form onSubmit={this.handleSubmit}>
              <input type="text" name="name" id="name" value={item.name} onChange={this.handleChange}/>
              <input type="text" name="city" id="city" value={item.city} onChange={this.handleChange}/>
              <Button type="submit" color="primary">Save</Button>
          </Form>
          </div>
      }
}


export default AddUser;