import React, {Component} from 'react';
import { Consumer } from '../../context';
import {v4 as uuid} from 'uuid';
import TextInputGroup from './TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  onSubmit = async (dispatch,e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // Check for errors
    if (name.trim() === '') {
      this.setState({errors: {name: 'Name is Required'}});
      console.log("errors:",this.state.errors);
      return;
    }
    if (email.trim() === '') {
      this.setState({errors: {email: 'Email is Required'}});
      return;
    }
    if (phone.trim() === '') {
      this.setState({errors: {phone: 'Phone is Required'}});
      return;
    }
    const newContact = {
      name,
      email,
      phone
    }

    const res = await axios.post('https://jsonplaceholder.typicode.com/users',newContact)
    console.log("post res:",res);
    dispatch({type:'ADD_CONTACT', payload: res.data});
    this.clearForm();
    this.props.history.push('/');

  }

  clearForm = () => {
    this.setState({name:'',email:'',phone:'',errors: {}});
  }

  render() {
    const {name,email,phone, errors} = this.state;
    const inputs = [
      {
        id:1,
        name: 'name',
        label: 'Name',
        type: 'text',
        value: name,
        placeholder: 'Enter Name...',
      },
      {
        id:2,
        name: 'email',
        label: 'Email',
        type: 'email',
        value: email,
        placeholder: 'Enter Email...',
      },
      {
        id:3,
        name: 'phone',
        label: 'Phone',
        type: 'text',
        value: phone,
        placeholder: 'Enter Phone...',
      },
    ]
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                  {inputs.map(input => {
                    return (
                      <TextInputGroup
                        key={input.id}
                        label={input.label}
                        name={input.name}
                        value={input.value}
                        type={input.type}
                        errors={errors}
                        placeholder={input.placeholder}
                        onChange={this.handleChange}
                      />
                    )
                  })}
                  <input
                    value="Add Contact"
                    className="btn btn-light col-12 mt-2"
                    type="submit" />
                  </form>
                </div>
              </div>
            )
          }}
        </Consumer>
    )
  }
}

export default AddContact;
