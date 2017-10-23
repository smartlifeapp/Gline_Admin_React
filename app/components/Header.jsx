import React from 'react';

const renderLoadingSpinner = (isLoading) => {
  if (!isLoading) return <div />
  return (
    <div className="apple-loading-spinner">
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
      <div className="apple-loading-spinner-blade" />
    </div>
  );
};

const headerTitle = (location, menuSections, extraHeaderTitles) => {
  let menu = '';
  let subMenu = '';
  if (location.pathname) {
    menuSections.forEach((section) => {
      const matchItem = section.items.filter(item => location.pathname.includes(item.linkTo));
      if (matchItem.length > 0) {
        menu = section.title;
        subMenu = matchItem[0].title;
      }
    });
    if (!menu) {
      const matchRoute = extraHeaderTitles.filter(header => location.pathname.includes(header.route));
      if (matchRoute.length > 0) {
        menu = matchRoute[0].menu;
        subMenu = matchRoute[0].subMenu;
      } else {
        menu = '대시보드';
      }
    }
  }
  return { menu, subMenu };
};

const Header = ({ location, menuSections, extraHeaderTitles, isMenuVisible, isLoading, onMenuClick }) => {
  const { menu, subMenu } = headerTitle(location, menuSections, extraHeaderTitles);
  return (
    <div className={`header${isMenuVisible ? '' : ' menu-hidden'}`}>
      <button className="button" onClick={onMenuClick}><i className="material-icons">menu</i></button>
      <h2><strong>{menu}</strong></h2>{subMenu ? <i className="material-icons">&#xE315;</i> : <div />}<h3>{subMenu}</h3>
      {renderLoadingSpinner(isLoading)}
    </div>
  );
};

export default Header;
