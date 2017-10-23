import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import actions from 'actions';

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <div className="modal-input-container">
    <input className="modal-input" {...input} placeholder={placeholder} type={type} />
    {touched && error && <span>{error}</span>}
  </div>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit({ userId, password }) {
    this.props.loginWithId({ userId, password });
  }
  renderAlert() {
    if (this.props.successMessage || this.props.errorMessage) {
      return (
        <div style={{ width: '100%', color: 'firebrick', textAlign: 'center' }}>
          {this.props.successMessage || this.props.errorMessage}
        </div>
      );
    }
    return <div className="alert" />;
  }
  renderIcons() {
    const appIconImageStyle = { width: 50, height: 50, objectFit: 'contain', margin: 10 };
    const appIconImages = [require('app_icon_seolleim.png'), require('app_icon_sondaemyeon.png'), require('app_icon_hilove.png'), require('app_icon_somelive.png')];
    return (
      <div>
        {appIconImages.map(image => <img alt="app_icon" key={image} src={image} style={appIconImageStyle} />)}
      </div>
    );
  }
  renderModalHeader() {
    return (
      <div className="modal-header">
        <h2>Admin Login</h2>
      </div>
    );
  }
  renderModalContent() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="modal-body">
        <div className="modal-content">
          <Field name="userId" component={renderField} type="text" placeholder="Id" />
          <Field name="password" component={renderField} type="password" placeholder="Password" />
          {this.renderAlert()}
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)} className="modal-form">
          <button type="submit" disabled={pristine || submitting}>Log In</button>
        </form>
      </div>
    );
  }
  render() {
    return (
      <div className="modal-backdrop">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/*{this.renderIcons()}*/}
          <div className="modal-container">
            {this.renderModalHeader()}
            {this.renderModalContent()}
          </div>
        </div>
      </div>
    );
  }
}

Login = reduxForm({
  form: 'login',
})(Login);

export default connect(state => ({
  successMessage: state.auth.success,
  errorMessage: state.auth.error,
}), actions)(Login);
