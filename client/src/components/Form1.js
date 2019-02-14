import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Form1 extends Component {
  constructor(props){
    super(props);
    this.state = { users: []};
    }
    
    async handleDelete(id){
      let res;
      try{
        res = axios.delete('http://localhost:3000/user/' + id)
        if (res) {
          let users = this.state.users.filter(user => user.id !== id);
          this.setState({ users: users });
        }
      }
      
      
       catch(error) {
         console.log(error);
       }
    }
    componentDidMount() {
      axios.get('http://localhost:3000/user/')
      .then(response => {
       this.setState({ users: response.data.data });
       
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    render() {
        return (
            <div className="container">
            <h2>List Data</h2>
                 <center>
                 <table className="table table-hover">
                 <thead>
                  <tr>
                    <th>Id</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                    <th>Phoneno</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(user =>

                      <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstname} </td>
                      <td>{user.lastname}</td>
                      <td>{user.age}</td>
                      <td>{user.phoneno}</td>
                      
                      <td>
                        <Link to={"/edit/" + user.id}>Edit</Link>
                      </td>
                      <td>
                        <a onClick={e => {this.handleDelete(user.id)}}>Delete</a>
                    </td>
                      </tr>
                      )}
                    </tbody>
                    
                  </table>
                
                   </center>   
           
          </div>
            
        )   
    }
}
export default Form1;