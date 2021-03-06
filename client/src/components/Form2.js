import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class Form2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            gender: []
        };
        this.addOne = this.addOne.bind(this)
        this.addData = this.addData.bind(this)
    }
    componentWillMount() {

        axios.get('http://localhost:3000/gender/')
            .then(response => {
                let temp = response.data.data;

                this.setState({ gender: temp });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addOne(e) {
        const obj = { ...this.state.users }
        obj[e.target.name] = e.target.value
        this.setState({ users: obj })

    }
    async addData(e) {
        const user = { ...this.state.users }
        let res;
        try {
            res = await axios.post('http://localhost:3000/user', {
                firstname: user.fname,
                lastname: user.lname,
                age: user.age,
                phoneno: user.pno,
                gender: user.gender
            })
        }
        catch (error) {
            console.log(error);
        }
        if (res) {
            this.setState({ toHome: true })
        }
    }


    render() {
        if (this.state.toHome === true) {
            return <Redirect to="/"></Redirect>
        }
       
        return (
            <div>
                <div className="container">
                    <h2>Insert Form</h2>
                    <center>
                        <form action="#">
                            <div className="form-group">
                                <label>FirstName:</label>
                                <input type="text" className="form-control" id="fname" placeholder="Enter Firstname" name="fname" onChange={(e) => { this.addOne(e) }} />
                            </div>
                            <div className="form-group">
                                <label>LastName:</label>
                                <input type="text" className="form-control" id="lname" placeholder="Enter Lastname" name="lname" onChange={(e) => { this.addOne(e) }} />
                            </div>
                            <div className="form-group">
                                <label>Age:</label>
                                <input type="number" className="form-control" id="age" placeholder="Enter Age" name="age" onChange={(e) => { this.addOne(e) }} />
                            </div>
                            <div className="form-group">
                                <label>PhoneNumber:</label>
                                <input type="tel" className="form-control" id="pno" placeholder="Enter PhoneNumber" name="pno" onChange={(e) => { this.addOne(e) }} />
                            </div>
                            <div className="form-group">
                                <label>Gender:</label>
                                <select name="gender" onChange={(e) => this.addOne(e)} >
                                    <option value="select">select</option>
                                    {this.state.gender.map(g => {
                                        return <option key={g.id} value={g.gender}>{g.gender}</option>
                                    })}
                                </select>
                            </div>


                            <input type="button" className="btn btn-default" onClick={e => this.addData(e)} value="Submit" />
                        </form>
                    </center>
                </div>
            </div>
        )
    }
}
