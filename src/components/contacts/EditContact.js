import React, {Component} from 'react';
import { Consumer } from '../../context';
import {v4 as uuid} from 'uuid';
import TextInputGroup from './TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  async componentDidMount() {
    const {id} = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log("res:",res);
    const contact = res.data;
    this.setState({
      name:contact.name,
      email: contact.email,
      phone: contact.phone
    })
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
    const updatedContact = {
      name,
      email,
      phone
    }
    const {id} = this.props.match.params;
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updatedContact)

    console.log("res:",res);
    dispatch({type: 'UPDATE_CONTACT', payload: res.data});
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
              <div className="card-header">Edit Contact</div>
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
                    value="Update Contact"
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

export default EditContact;
