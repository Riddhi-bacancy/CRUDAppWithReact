import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class Form3 extends Component {
    constructor(props){
        super(props);
        this.state = {
        
       };
        this.editData = this.editData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }
        
        componentWillMount() {

          axios.get('http://localhost:3000/user/' + this.props.match.params.id)
          .then(response => {
            const {firstname, lastname, age, phoneno,gender} = response.data.data[0];
           this.setState({ fname: firstname, lname:lastname, age, pno:phoneno,gender:gender });
           
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        editData(e){
           
            // const obj = {...this.state.users}
            // obj[e.target.name] = e.target.value
            // this.setState({users:obj})
            this.setState({[e.target.name] : e.target.value})
           
            
        }
        async handleSubmit(e){
            // const user = {...this.state.users}
            const {fname, lname, age, pno,gender} = this.state;
            e.preventDefault();
        let res;
        try{
        res = await axios.put('http://localhost:3000/user/' + this.props.match.params.id,{
            firstname:fname,
            lastname:lname,
            age:age,
            phoneno:pno,
            gender:gender
        })
        }
        catch(error) {
            console.log(error);
          }
          if(res){
            this.setState({ toHome :true })
          }
        }
        
    render() 
    {
        if(this.state.toHome === true){
            return <Redirect to="/"/>
        }
        return (
            <div>
                <div className="container">
                    <h2>Edit Form</h2>
                    <form action="#">
                        <div className="form-group">
                            <label>FirstName:</label>
                            <input type="text" className="form-control" id="fname" onChange ={e => this.editData(e)}  name="fname" value={this.state.fname}/>
                        </div>
                        <div className="form-group">
                            <label>LastName:</label>
                            <input type="text" className="form-control" id="lname"  onChange ={e => this.editData(e)} name="lname" value={this.state.lname}/>
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input type="number" className="form-control" id="age" onChange ={e => this.editData(e)} name="age" value={this.state.age}/>
                        </div>
                        <div className="form-group">
                            <label>PhoneNumber:</label>
                            <input type="tel" maxlength='10' minlength='10' className="form-control" id="pno"  onChange = {e => this.editData(e)} name="pno" value={this.state.pno}/>
                        </div>
                        <div className="form-group">
                                <label>Gender:</label>
                                <select name="gender" onChange={(e) => this.editData(e)} value={this.state.gender} >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                   
                                   
                                </select>
                            </div>
                        <input type="button" className="btn btn-default" onClick = {e => this.handleSubmit(e)} value="Submit"/>
                       
                    </form>
                </div>
            </div>
        )
    }
}
