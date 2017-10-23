import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import Scroll from 'react-scroll';

import SearchFilter from 'SearchFilter';
import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

class Story extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { itemsMeta, route } = this.props;
    if (route === 'story') this.props.getPhotos(itemsMeta);
  }
  render() {
    const { isSuperUser, items, itemsMeta } = this.props;
    const filterFields = [].concat(isSuperUser ? ['app'] : [], ['title', 'content', 'userSearch', 'gender', 'date']);
    const titles = ['ID', 'title', 'content', 'url', 'etc', 'img'];
    const itemKeys = ['story.id', 'story.title', 'story.content', 'story.url', 'stoiry.url', 'story.etc', 'story.img'];
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

Story = reduxForm({
  form: 'storyFilter',
  initialValues: {
    app: 'all',
    userSearchType: 'email',
    comment: '전체',
    gender: 'all',
  },
})(Story);

export default connect((state) => {
  const userGroup = state.auth.user.group;
  const isSuperUser = userGroup === 'super';
  return {
    userGroup,
    isSuperUser,
    items: state.photos.items,
    itemsMeta: Object.assign({}, state.photos.itemsMeta,
      !isSuperUser ? { app: userGroup } : {},
    ),
    initMeta: !isSuperUser ? { app: userGroup, page: 1 } : { page: 1 },
    route: state.router.location.pathname.split('/')[1],
  };
}, actions)(Story);
