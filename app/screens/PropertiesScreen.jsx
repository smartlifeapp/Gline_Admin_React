import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { animateScroll } from 'react-scroll';

import SearchFilter from 'SearchFilter';
import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

class PropertiesScreen extends Component {
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
    const { type, route } = this.props;
    if (['restaurants', 'accommodations', 'reviews', 'comments', 'reports'].indexOf(route) !== -1) this.props.getProperties({ type });
  }
  handlePageClick(page) {
    const { type } = this.props;
    this.props.getProperties({ type, nextMeta: { page: page.selected + 1 } });
    animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormSubmit(nextMeta) {
    const { type } = this.props;
    this.props.resetPropertiesMeta(() => this.props.getProperties({ type, nextMeta }));
    animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormReset() {
    const { type } = this.props;
    this.props.resetPropertiesMeta(() => this.props.getProperties({ type }));
  }
  handleSetDate(startDate, endDate) {
    this.props.change('startDate', startDate);
    this.props.change('endDate', endDate);
  }
  handleHeadClick(itemsMeta, orderBy) {
    const { type } = this.props;
    let orderDirection = 'DESC';
    if (itemsMeta.orderBy === orderBy) orderDirection = (itemsMeta.orderDirection.toUpperCase() === orderDirection) ? 'ASC' : 'DESC';
    this.props.getProperties({ type, nextMeta: { orderBy, orderDirection } });
  }
  handleItemClick(item) {
    const { type } = this.props;
    this.props.setProperty({ type, item }, this.props.pushRoute(`/${type}/${item.uid}`));
  }
  render() {
    const { route, items, itemsMeta } = this.props;
    if (!itemsMeta || !items || items.length === 0) return <div />;
    const filterFields = ['nameAndTitle'];
    const defaultTitle = ['ID', '대표사진', '상호명', '제목', '상태', '등록일', '메모'];
    const titles = {
      accommodations: defaultTitle,
      restaurants: defaultTitle,
      reviews: ['ID', '대표사진', '제목', '상태', '등록일', '메모'],
      comments: ['ID', '프로필', '닉네임', '성별', '내용', '등록일', '메모'],
      reports: ['ID', '신고한 Email', '신고받은 Email', '내용', '상태', '등록일', '메모'],
    }[route];
    const defaultItemKey = ['id', 'photoUrl', 'name', 'title', 'status', 'createdAt', 'note'];
    const itemKeys = {
      accommodations: defaultItemKey,
      restaurants: defaultItemKey,
      reviews: ['id', 'photoUrl', 'title', 'status', 'createdAt', 'note'],
      comments: ['id', 'user.photoUrl', 'user.nickname', 'user.gender', 'content', 'createdAt', 'note'],
      reports: ['id', 'email', 'targetEmail', 'content', 'status', 'createdAt', 'note'],
    }[route];
    return (
      <div>
        {['accommodations', 'restaurants', 'reviews'].indexOf(route) !== -1 && <SearchFilter
          meta={this.props}
          fields={filterFields}
          dateLabel="등록일"
          onSetDate={this.handleSetDate}
          onSubmit={this.handleFormSubmit}
          onReset={this.handleFormReset}
        />}
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

PropertiesScreen = reduxForm({
  form: 'propertiesForm',
  initialValues: {
    // app: 'all',
    // userSearchType: 'email',
    // comment: '전체',
    // gender: 'all',
  },
})(PropertiesScreen);

export default connect((state) => {
  const route = state.router.location.pathname.split('/')[1];
  return {
    type: route.slice(0, route.length - 1),
    route,
    authUser: state.auth.user,
    items: state.properties[route],
    itemsMeta: state.properties[`${route}Meta`],
  };
}, actions)(PropertiesScreen);
