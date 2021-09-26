import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Contact extends Component {
  state = {
    showContactInfo: false
  }

  onDeleteClick = async (id, dispatch) => {
    const res = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (res.status === 200) {
      dispatch({type:'DELETE_CONTACT',payload:id})
    }
  }

  render() {
    const { name, email, phone, id } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                <span>{name} </span>
                <i
                  onClick={() => this.setState({showContactInfo: !this.state.showContactInfo})}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}/>
                <i
                  className="fas fa-times"
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                  style={{color:'red', cursor:'pointer',float:'right'}}/>
                <Link to={`contact/edit/${id}`}>
                   <i
                  className="fas fa-pencil-alt"
                  style={{color:'black', cursor:'pointer',float:'right', marginRight:'5px'}}/>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null }
            </div>
          )

        }}
      </Consumer>
    )
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
}

export default Contact;
