import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import Scroll from 'react-scroll';

import SearchFilter from 'SearchFilter';
import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

class CashoutRequests extends Component {
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
    if (route === 'cashoutRequests') this.props.getCashoutRequests(itemsMeta);
  }
  handlePageClick(page) {
    const { itemsMeta } = this.props;
    this.props.getCashoutRequests(Object.assign({}, itemsMeta, { page: page.selected + 1 }));
    Scroll.animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormSubmit(nextMeta) {
    const { initMeta } = this.props;
    this.props.getCashoutRequests(Object.assign({}, nextMeta, initMeta), 'createdAt');
  }
  handleSetDate(startDate, endDate) {
    this.props.change('startDate', startDate);
    this.props.change('endDate', endDate);
  }
  handleHeadClick(itemsMeta, order) {
    let orderBy = 'DESC';
    if (itemsMeta.order === order) orderBy = (itemsMeta.orderBy.toUpperCase() === orderBy) ? 'ASC' : 'DESC';
    this.props.getCashoutRequests({ order, orderBy });
  }
  handleItemClick(item) {
    this.props.setCashoutRequest(item);
    this.props.dispatch(push(`/cashoutRequest/${item.id}`));
  }
  render() {
    const { isSuperUser, items, itemsMeta } = this.props;
    const filterFields = [].concat(isSuperUser ? ['app'] : [], ['userSearch', 'gender', 'date']);
    const titles = ['ID', '앱', '이름', '닉네임', '성별', '주민번호', '연락처', '은행명', '계좌번호', '금액', '상태', '등록일', '메모'];
    const itemKeys = ['id', 'app', 'user.name', 'user.nickname', 'user.gender', 'citizenId', 'phoneNumber', 'bankName', 'bankAccountNo', 'money', 'status', 'createdAt', 'note'];
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

CashoutRequests = reduxForm({
  form: 'cashoutRequestsFilter',
  initialValues: {
    app: 'all',
    userSearchType: 'email',
    comment: '전체',
    gender: 'all',
  },
})(CashoutRequests);

export default connect((state) => {
  const userGroup = state.auth.user.group;
  const isSuperUser = userGroup === 'super';
  return {
    userGroup,
    isSuperUser,
    items: state.cashoutRequests.items,
    itemsMeta: Object.assign({}, state.cashoutRequests.itemsMeta,
      !isSuperUser ? { app: userGroup } : {},
    ),
    initMeta: !isSuperUser ? { app: userGroup, page: 1 } : { page: 1 },
    route: state.router.location.pathname.split('/')[1],
  };
}, actions)(CashoutRequests);
