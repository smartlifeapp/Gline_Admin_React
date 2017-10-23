import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import Header from 'Header';
import SideBar from 'SideBar';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  handleLogoutClick() {
    this.props.logoutAdmin();
  }
  handleMenuClick() {
    this.props.toggleMenu();
  }
  render() {
    if (!this.props.authenticated) return <div />;
    const { extraHeaderTitles, isLoading, isMenuVisible, location, menuSections, authUser } = this.props;
    return (
      <div>
        <SideBar
          authUser={authUser}
          isVisible={isMenuVisible}
          menuSections={menuSections}
          onLogoutClick={this.handleLogoutClick}
        />
        <Header
          extraHeaderTitles={extraHeaderTitles}
          isLoading={isLoading}
          isMenuVisible={isMenuVisible}
          location={location}
          menuSections={menuSections}
          onMenuClick={this.handleMenuClick}
        />
      </div>
    );
  }
}

Navigation = connect(state => ({
  authenticated: state.auth.authenticated,
  authUser: state.auth.user,
  extraHeaderTitles: state.meta.nav.extraHeaderTitles,
  isLoading: state.meta.isLoading,
  isMenuVisible: state.meta.isMenuVisible,
  menuSections: state.meta.nav.menuSections,
}), actions)(Navigation);

export default Navigation;
