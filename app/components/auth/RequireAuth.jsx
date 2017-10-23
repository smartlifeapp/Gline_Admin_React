/* jshint esversion: 6 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    render() {
      if (this.props.authenticated) {
        return (
          <div className={`main-container${(this.props.isMenuVisible) ? '' : ' menu-hidden'}`}>
            <ComposedComponent {...this.props} />
          </div>
        );
      }
      return <div />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, isMenuVisible: state.meta.isMenuVisible };
  }

  return connect(mapStateToProps)(Authentication);
}
