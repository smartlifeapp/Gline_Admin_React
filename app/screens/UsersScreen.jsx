// 3rd apis
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { animateScroll } from 'react-scroll';
// components
import SearchFilter from 'SearchFilter';
import Table from 'Table';
import Pagination from 'Pagination';
// actions
import actions from 'actions';

class UsersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
    this.handleHeadClick = this.handleHeadClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  componentWillMount() {
    const { itemsMeta, route } = this.props;
    if (route === 'users') this.props.getUsers(itemsMeta);
  }
  handlePageClick(page) {
    const { itemsMeta } = this.props;
    this.props.getUsers(Object.assign({}, itemsMeta, { page: page.selected + 1 }));
    animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormSubmit(nextMeta) {
    this.props.resetUsersMeta(() => this.props.getUsers(nextMeta));
    animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormReset() {
    this.props.resetUsersMeta(() => this.props.getUsers({}));
  }
  handleSetDate(startDate, endDate) {
    this.props.change('startDate', startDate);
    this.props.change('endDate', endDate);
  }
  handleHeadClick(itemsMeta, orderBy) {
    let orderDirection = 'DESC';
    if (itemsMeta.orderBy === orderBy) orderDirection = (itemsMeta.orderDirection.toUpperCase() === orderDirection) ? 'ASC' : 'DESC';
    this.props.getUsers({ orderBy, orderDirection });
  }
  handleItemClick(item) {
    this.props.setUser(item, this.props.pushRoute(`/user/${item.uid}`));
  }
  render() {
    const { items, itemsMeta } = this.props;
    const filterFields = ['userSearch', 'gender', 'date'];
    const titles = ['ID', '아이디', '닉네임', '나이', '성별', '대화주제', '사진', '온라인', '상태', '마지막로그인', '메모'];
    const itemKeys = ['id', 'userId', 'nickname', 'birthday', 'gender', 'comment', 'photoUrl', 'isOnline', 'status', 'lastLoggedInAt', 'note'];
    return (
      <div>
        <SearchFilter
          meta={this.props}
          fields={filterFields}
          dateLabel="등록일"
          onSetDate={this.handleSetDate}
          onSubmit={this.handleFormSubmit}
          onReset={this.handleFormReset}
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

UsersScreen = reduxForm({
  form: 'usersFilter',
  initialValues: {
    userSearchType: 'userId',
    gender: 'all',
  },
})(UsersScreen);

export default connect(state => ({
  items: state.users.items,
  itemsMeta: state.users.itemsMeta,
  route: state.router.location.pathname.split('/')[1],
}), actions)(UsersScreen);
