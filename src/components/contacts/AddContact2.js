import React, {Component} from 'react';
import { Consumer } from '../../context';

class AddContact extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.phoneInput = React.createRef();
    this.emailInput = React.createRef();
  }
  static defaultProps = {
    name: 'marcus',
    email: 'marcus@gmail.com',
    phone: '555-555-5555'
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();
    const contact = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value
    }
    console.log("contact:",contact)
  }

  render() {
    return (
      <Consumer>
        {value => {
          const dispatch = value;
          const {name,email,phone} = this.props;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      defaultValue={name}
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Enter Name..."
                      onChange={this.handleChange}
                      ref={this.nameInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={email}
                      className="form-control form-control-lg"
                      placeholder="Enter Email..."
                      onChange={this.handleChange}
                      ref={this.emailInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={phone}
                      className="form-control form-control-lg"
                      placeholder="Enter Phone..."
                      onChange={this.handleChange}
                      ref={this.phoneInput}
                    />
                  </div>
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
