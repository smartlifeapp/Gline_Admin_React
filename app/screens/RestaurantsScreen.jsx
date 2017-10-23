import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { animateScroll } from 'react-scroll';

import SearchFilter from 'SearchFilter';
import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

class RestaurantsScreen extends Component {
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
    if (route === 'restaurants') this.props.getRestaurants(itemsMeta);
  }
  handlePageClick(page) {
    const { itemsMeta } = this.props;
    this.props.getRestaurants(Object.assign({}, itemsMeta, { page: page.selected + 1 }));
    animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormSubmit(nextMeta) {
    this.props.resetRestaurantsMeta(() => this.props.getRestaurants(nextMeta));
    animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormReset() {
    this.props.resetRestaurantsMeta(() => this.props.getRestaurants({}));
  }
  handleSetDate(startDate, endDate) {
    this.props.change('startDate', startDate);
    this.props.change('endDate', endDate);
  }
  handleHeadClick(itemsMeta, orderBy) {
    let orderDirection = 'DESC';
    if (itemsMeta.orderBy === orderBy) orderDirection = (itemsMeta.orderDirection.toUpperCase() === orderDirection) ? 'ASC' : 'DESC';
    this.props.getRestaurants({ orderBy, orderDirection });
  }
  handleItemClick(item) {
    this.props.setRestaurant(item, this.props.pushRoute(`/restaurant/${item.uid}`));
  }
  render() {
    const { items, itemsMeta } = this.props;
    const filterFields = ['nameAndTitle'];
    const titles = ['ID', '대표사진', '상호명', '제목', '상태', '등록일', '메모'];
    const itemKeys = ['id', 'photoUrl', 'name', 'title', 'status', 'createdAt', 'note'];
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

RestaurantsScreen = reduxForm({
  form: 'restaurantsFilter',
  initialValues: {
    // app: 'all',
    // userSearchType: 'email',
    // comment: '전체',
    // gender: 'all',
  },
})(RestaurantsScreen);

export default connect((state) => {
  const userGroup = state.auth.user.group;
  const isSuperUser = userGroup === 'super';
  return {
    userGroup,
    isSuperUser,
    items: state.restaurants.items,
    itemsMeta: Object.assign({}, state.restaurants.itemsMeta,
      !isSuperUser ? { app: userGroup } : {},
    ),
    itemsInitMeta: state.restaurants.itemsInitMeta,
    route: state.router.location.pathname.split('/')[1],
  };
}, actions)(RestaurantsScreen);
