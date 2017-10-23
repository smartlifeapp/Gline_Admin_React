import React from 'react';
import { Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';

const renderLinks = section => section.items.map(item => (
  <Link key={item.title} to={item.linkTo}>
    {item.title}
  </Link>
));

const renderSectionTitle = (title, menuSections) => {
  let iconName = '';
  menuSections.forEach((section) => {
    if (section.title === title) iconName = section.icon;
  });
  return <div className="inner-section"><i className="material-icons">{iconName}</i><span>{title}</span></div>;
};

const renderSections = menuSections => menuSections.map(section => (
  <Collapsible
    key={section.title}
    trigger={renderSectionTitle(section.title, menuSections)}
    transitionTime={200}
  >
    {renderLinks(section)}
  </Collapsible>
));

const SideBar = ({ isVisible, menuSections, authUser, onLogoutClick }) => {
  if (!isVisible || !authUser) return <div />;
  return (
    <div className="side-bar">
      <Link to="/"><h1>GLine Admin</h1></Link>
      <div className="side-bar info-section">
        <div className="admin-info">{authUser.userId}</div>
        <button onClick={onLogoutClick}>로그아웃</button>
      </div>
      <div className="side-bar content">
        {renderSections(menuSections)}
      </div>
    </div>
  );
};

export default SideBar;
