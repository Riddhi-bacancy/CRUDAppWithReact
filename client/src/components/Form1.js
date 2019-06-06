import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Form1 extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [],
    offset:0,
    show:0,
    count:0,
    paginate:2 };

    // this.submitStepSignupForm = this.submitStepSignupForm.bind(this);
    //     this.appendColumn = this.appendColumn.bind(this);
    //     this.editColumn = this.editColumn.bind(this);
  }

  async handleDelete(id) {
    let res;
    try {
      res = axios.delete('http://localhost:3000/user/' + id)
      if (res) {
        let users = this.state.users.filter(user => user.id !== id);
        this.setState({ users: users });
      }
    }


    catch (error) {
      console.log(error);
    }
  }
  paginations(){
    this.numberButton()
    let limit = Number(this.state.paginate);
    let offset = Number(this.state.offset);
    axios.get(`http://localhost:3000/user?skip=${offset}&limit=${limit}`)
      .then(response => {
        console.log(response.data.data.rows);
        this.setState({ users: response.data.data.rows,count:response.data.data.count });

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
     this.paginations();
  }
  tableHeader() {
    const data = { ...this.state.users[0] }
    return Object.keys(data).filter(key => key !== 'id' && key !== 'deletedAt' && key !== 'createdAt' && key !== 'updatedAt').map(key => {
      return <th>{key}</th>

    })

  }
  addOne(e) {
    
   
    this.setState({ paginate: e.target.value },this.paginations)

  }
  handleClick(e){
    let paginate = Number(this.state.paginate)
    let offset = Number(this.state.offset)
    if(e.target.name === 'next'){
     this.setState({ offset:offset+paginate},this.paginations)
    }
    else if(e.target.name === 'prev'){
      this.setState({ offset:offset-paginate},this.paginations)
     } else if (e.target.value === '...') {
       let s = this.state.show + 1
       this.setState({show: s})
     } else if (e.target.value === '..') {
      let s = this.state.show - 1
      this.setState({show: s})
     }
    else{
      let a = paginate*e.target.value; 
      this.setState({offset:a},this.paginations)
    }
  }
  showButton(itr,no,btn){
    itr = itr*3
    for(let i=itr; i<=no && i<itr+3; i++){
      btn.push(<button value={i}  onClick = {e => {this.handleClick(e)}}>{i+1}</button>)
     
   }
  }
  numberButton(){
    let count = this.state.count;
    let paginate = this.state.paginate;
    let no = count/paginate;
    let btn = []
    if(this.state.show !== 0){
      btn.push(<button value='..' onClick = {e => {this.handleClick(e)}}>{'<'}</button>)
    }
    this.showButton(this.state.show,no, btn)
    if(this.state.show<(no/3)-1){
      btn.push(<button value='...' onClick = {e => {this.handleClick(e)}}>{'>'}</button>)
    }
    return btn;
  }

  render() {


    let list = this.state.users.map(p => {
      return (
        <tr key={p.id}>
          {Object.keys(p).filter(k => k !== 'id' && k !== 'deletedAt' && k !== 'createdAt' && k !== 'updatedAt').map(k => {
            return (
              <td key={p.id + '' + k}>
                <div value={k} > {p[k]} </div>
              </td>

            );
          })}
          <td>
            <Link to={"/edit/" + p.id}>Edit</Link>
          </td>
          <td>
            <a onClick={e => { this.handleDelete(p.id) }}>Delete</a>
          </td>
        </tr>
      );

    });


    return (

      <div className="container">
        <h2>List Data</h2>

        <label></label>
        <select name="paginate" onChange={(e) => this.addOne(e)} >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        
        </select>
        <br/>
        <br/>

        <center>
          <table className="table table-hover">
            <thead>
              {
                this.tableHeader()
              }
              <th></th>
              <th></th>
            </thead>
            <tbody>{list}</tbody>

          </table>
         
         <button name="prev" onClick = {e => this.handleClick(e)}>{'<<'}</button>
         { this.numberButton()}

         <button name="next" onClick = {e => this.handleClick(e)}>{'>>'}</button>
         <label>{`showing ${this.state.offset+1} to ${Number(this.state.offset)+this.state.users.length}  of ${this.state.count} entries`}</label>
        </center>

      </div>

    )
  }
}
export default Form1;