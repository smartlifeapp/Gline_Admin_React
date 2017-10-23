import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { push } from 'react-router-redux';
import Scroll from 'react-scroll';

import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

class AdminMessages extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
    this.handleHeadClick = this.handleHeadClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleReload = this.handleReload.bind(this);
  }
  componentWillMount() {
    Scroll.animateScroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
    this.props.getAdminMessages({});
  }
  handlePageClick(page) {
    Scroll.animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
    this.props.getAdminMessages({ ...this.props.adminMessagesMeta, page: page.selected + 1 });
  }
  handleFormSubmit(nextMeta) {
    this.props.getAdminMessages(nextMeta, 'createdAt');
  }
  handleRegister(value) {
    this.props.postBannedWord(value);
  }
  handleSetDate(startDate, endDate) {
    this.props.change('startDate', startDate);
    this.props.change('endDate', endDate);
  }
  handleHeadClick(itemsMeta, order) {
    let orderBy = 'DESC';
    if (itemsMeta.order === order) orderBy = (itemsMeta.orderBy.toUpperCase() === orderBy) ? 'ASC' : 'DESC';
    this.props.getAdminMessages({ order, orderBy });
  }
  handleItemClick(item) {
    this.props.setAdminMessage(item);
    this.props.dispatch(push(`/adminMessage/${item.id}`));
  }
  handleReload() {
    this.props.getAdminMessages({});
  }
  render() {
    const { items, itemsMeta } = this.props.adminMessages;
    const titles = ['ID', '앱', '제목', '내용', '등록일'];
    const itemKeys = ['id', 'app', 'title', 'content', 'createdAt'];
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

AdminMessages = reduxForm({
  form: 'adminMessagesFilter',
})(AdminMessages);

AdminMessages = connect((state) => {
  // const word = selector(state, 'word');
  return {
    adminMessages: state.adminMessages,
  };
}, actions)(AdminMessages);

export default AdminMessages;
