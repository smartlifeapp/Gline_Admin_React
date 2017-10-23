import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { push } from 'react-router-redux';
import Scroll from 'react-scroll';

import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

const ToolBox = ({ onAddClick }) => {
  return (
    <div className="tool-box">
      toolbox
      <button onClick={onAddClick} className="button"><i className="material-icons">add</i></button>
    </div>
  );
};

class Admins extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
    this.handleHeadClick = this.handleHeadClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }
  componentWillMount() {
    Scroll.animateScroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
    this.props.getAdmins({});
  }
  handlePageClick(page) {
    Scroll.animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
    this.props.getAdmins({ ...this.props.adminsMeta, page: page.selected + 1 });
  }
  handleFormSubmit(nextMeta) {
    this.props.getAdmins(nextMeta, 'createdAt');
  }
  handleRegister(value) {
    this.props.postBannedWord(value);
  }
  handleAddClick() {
    this.props.addAdmin();
  }
  handleSetDate(startDate, endDate) {
    this.props.change('startDate', startDate);
    this.props.change('endDate', endDate);
  }
  handleHeadClick(itemsMeta, order) {
    let orderBy = 'DESC';
    if (itemsMeta.order === order) orderBy = (itemsMeta.orderBy.toUpperCase() === orderBy) ? 'ASC' : 'DESC';
    this.props.getAdmins({ order, orderBy });
  }
  handleItemClick(item) {
    // this.props.setBannedWord(item);
    this.props.dispatch(push(`/admin/${item.id}`));
  }
  handleReload() {
    this.props.getAdmins({});
  }
  render() {
    const { items, itemsMeta } = this.props.admins;
    const titles = ['ID', '앱', '유저아이디', '등록일'];
    const itemKeys = ['id', 'group', 'userId', 'createdAt'];
    return (
      <div>
        <Table
          titles={titles}
          items={items}
          itemKeys={itemKeys}
          itemsMeta={itemsMeta}
          onHeadClick={this.handleHeadClick}
          onItemClick={this.handleItemClick}
        />
        <Pagination meta={itemsMeta} onPageChange={this.handlePageClick} />
      </div>
    );
  }
}

Admins = reduxForm({
  form: 'adminsFilter',
})(Admins);

const selector = formValueSelector('adminsFilter');
Admins = connect((state) => {
  // const word = selector(state, 'word');
  return {
    meta: state.meta,
    admins: state.admins,
  };
}, actions)(Admins);

export default Admins;
