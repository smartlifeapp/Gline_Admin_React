import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import Scroll from 'react-scroll';

import SearchFilter from 'SearchFilter';
import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

class CashLogs extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
    this.handleHeadClick = this.handleHeadClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  componentWillMount() {
    const { itemsMeta, route } = this.props;
    if (route === 'cashLogs') this.props.getCashLogs(itemsMeta);
  }
  handlePageClick(page) {
    const { itemsMeta } = this.props;
    this.props.getCashLogs(Object.assign({}, itemsMeta, { page: page.selected + 1 }));
    Scroll.animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormSubmit(nextMeta) {
    const { initMeta } = this.props;
    this.props.getCashLogs(Object.assign({}, nextMeta, initMeta), 'createdAt');
  }
  handleSetDate(startDate, endDate) {
    this.props.change('startDate', startDate);
    this.props.change('endDate', endDate);
  }
  handleHeadClick(itemsMeta, order) {
    let orderBy = 'DESC';
    if (itemsMeta.order === order) orderBy = (itemsMeta.orderBy.toUpperCase() === orderBy) ? 'ASC' : 'DESC';
    this.props.getCashLogs({ order, orderBy });
  }
  handleItemClick(item) {
    this.props.setCashLog(item);
    this.props.dispatch(push(`/cashLog/${item.id}`));
  }
  render() {
    const { isSuperUser, items, itemsMeta } = this.props;
    const filterFields = [].concat(isSuperUser ? ['app'] : [], ['reason', 'userSearch', 'gender', 'date']);
    const titles = ['ID', '앱', '이름', '닉네임', '성별', '변동이유', '변동캐시', '전체캐시', '상태', '등록일', '메모'];
    const itemKeys = ['id', 'app', 'user.name', 'user.nickname', 'user.gender', 'reason', 'cash', 'totalCash', 'status', 'createdAt', 'note'];
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

CashLogs = reduxForm({
  form: 'cashLogsFilter',
  initialValues: {
    app: 'all',
    userSearchType: 'email',
    comment: '전체',
    gender: 'all',
  },
})(CashLogs);

export default connect((state) => {
  const userGroup = state.auth.user.group;
  const isSuperUser = userGroup === 'super';
  return {
    isSuperUser,
    items: state.cashLogs.items,
    itemsMeta: Object.assign({}, state.cashLogs.itemsMeta,
      !isSuperUser ? { app: userGroup } : {},
    ),
    initMeta: !isSuperUser ? { app: userGroup, page: 1 } : { page: 1 },
    route: state.router.location.pathname.split('/')[1],
  };
}, actions)(CashLogs);
