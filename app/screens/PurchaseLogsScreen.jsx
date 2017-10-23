import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { animateScroll } from 'react-scroll';

import SearchFilter from 'SearchFilter';
import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

class PurchaseLogsScreen extends Component {
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
    if (route === 'purchaseLogs') this.props.getPurchaseLogs(itemsMeta);
  }
  handlePageClick(page) {
    const { itemsMeta } = this.props;
    this.props.getPurchaseLogs(Object.assign({}, itemsMeta, { page: page.selected + 1 }));
    animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormSubmit(nextMeta) {
    this.props.resetPurchaseLogsMeta(() => this.props.getPurchaseLogs(nextMeta));
    animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormReset() {
    this.props.resetPurchaseLogsMeta(() => this.props.getPurchaseLogs({}));
  }
  handleSetDate(startDate, endDate) {
    this.props.change('startDate', startDate);
    this.props.change('endDate', endDate);
  }
  handleHeadClick(itemsMeta, orderBy) {
    let orderDirection = 'DESC';
    if (itemsMeta.orderBy === orderBy) orderDirection = (itemsMeta.orderDirection.toUpperCase() === orderDirection) ? 'ASC' : 'DESC';
    this.props.getPurchaseLogs({ orderBy, orderDirection });
  }
  handleItemClick(item) {
    this.props.setPurchaseLog(item, this.props.pushRoute(`/purchaseLog/${item.uid}`));
  }
  render() {
    const { items, itemsMeta } = this.props;
    const filterFields = ['userSearch', 'gender', 'date'];
    const titles = ['ID', '종류', '닉네임', '성별', '상품명', '가격', '상태', '등록일', '메모'];
    const itemKeys = ['id', 'type', 'user.nickname', 'user.gender', 'purchasedItem', 'price', 'status', 'createdAt', 'note'];
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

PurchaseLogsScreen = reduxForm({
  form: 'purchaseLogsFilter',
  initialValues: {
    userSearchType: 'userId',
    gender: 'all',
  },
})(PurchaseLogsScreen);

export default connect(state => ({
  items: state.purchaseLogs.items,
  itemsMeta: state.purchaseLogs.itemsMeta,
  route: state.router.location.pathname.split('/')[1],
}), actions)(PurchaseLogsScreen);
