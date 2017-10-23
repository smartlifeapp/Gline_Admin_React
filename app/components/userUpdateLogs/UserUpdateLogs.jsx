import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Scroll from 'react-scroll';

import SearchFilter from 'SearchFilter';
import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

class UserUpdateLogs extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
    this.handleHeadClick = this.handleHeadClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  componentDidMount() {
    const { itemsMeta, route } = this.props;
    if (route === 'userUpdateLogs') this.props.getUserUpdateLogs(itemsMeta);
  }
  handlePageClick(page) {
    Scroll.animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
    this.props.getUserUpdateLogs({ ...this.props.itemsMeta, page: page.selected + 1 });
  }
  handleFormSubmit(nextMeta) {
    const { initMeta } = this.props;
    this.props.getUsers(Object.assign({}, nextMeta, initMeta), 'createdAt');
  }
  handleSetDate(startDate, endDate) {
    this.props.change('startDate', startDate);
    this.props.change('endDate', endDate);
  }
  handleHeadClick(itemsMeta, order) {
    let orderBy = 'DESC';
    if (itemsMeta.order === order) orderBy = (itemsMeta.orderBy.toUpperCase() === orderBy) ? 'ASC' : 'DESC';
    // this.props.getUserUpdateLog(10);
    this.props.getUserUpdateLogs({ order, orderBy });
  }
  handleItemClick(item) {
    // this.props.setCashLog(item);
    // this.props.dispatch(push(`/userUpdateLog/${item.id}`));
  }
  render() {
    const { isSuperUser, items, itemsMeta } = this.props;
    const filterFields = [].concat(isSuperUser ? ['app'] : [], ['comment', 'userUpdateLogSearch', 'gender', 'date']);
    const titles = ['ID', '앱', '이름', '성별', '이전 닉네임', '닉네임', '이전 전화번호', '전화번호', '이전 한줄소개', '한줄소개', '이전 사진', '사진', '변경일'];
    const itemKeys = ['id', 'app', 'name', 'user.gender', 'oldNickname', 'newNickname', 'oldPhoneNumber', 'newPhoneNumber', 'oldComment', 'newComment', 'oldPhotoUrl', 'newPhotoUrl', 'createdAt'];
    return (
      <div>
        <SearchFilter
          meta={this.props}
          fields={filterFields}
          dateLabel="등록일"
          onSetDate={this.handleSetDate}
          onSubmit={this.handleFormSubmit}
        />
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

UserUpdateLogs = reduxForm({
  form: 'userUpdateLogsFilter',
  initialValues: {
    app: 'all',
    userUpdateLogSearchType: 'email',
    comment: '전체',
    gender: 'all',
  },
})(UserUpdateLogs);

export default connect((state) => {
  const userGroup = state.auth.user.group;
  const isSuperUser = userGroup === 'super';
  return {
    isSuperUser,
    items: state.userUpdateLogs.items,
    itemsMeta: Object.assign({}, state.userUpdateLogs.itemsMeta,
      !isSuperUser ? { app: userGroup } : {},
    ),
    initMeta: !isSuperUser ? { app: userGroup, page: 1 } : { page: 1 },
    route: state.router.location.pathname.split('/')[1],
  };
}, actions)(UserUpdateLogs);
