import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import Scroll from 'react-scroll';

import SearchFilter from 'SearchFilter';
import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

class VideoChatLogs extends Component {
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
    if (route === 'videoChatLogs') this.props.getVideoChatLogs(itemsMeta);
  }
  handlePageClick(page) {
    const { itemsMeta } = this.props;
    this.props.getVideoChatLogs(Object.assign({}, itemsMeta, { page: page.selected + 1 }));
    Scroll.animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
  }
  handleFormSubmit(nextMeta) {
    const { initMeta } = this.props;
    console.log('nextMeta', nextMeta);
    this.props.getVideoChatLogs(Object.assign({}, nextMeta, initMeta), 'createdAt');
  }
  handleSetDate(startDate, endDate) {
    this.props.change('startDate', startDate);
    this.props.change('endDate', endDate);
  }
  handleHeadClick(itemsMeta, order) {
    let orderBy = 'DESC';
    if (itemsMeta.order === order) orderBy = (itemsMeta.orderBy.toUpperCase() === orderBy) ? 'ASC' : 'DESC';
    this.props.getVideoChatLogs({ order, orderBy });
  }
  handleItemClick(item) {
    this.props.setVideoChatLog(item);
    this.props.dispatch(push(`/videoChatLog/${item.id}`));
  }
  render() {
    const { items, itemsMeta } = this.props;
    const filterFields = ['app', 'targetApp', 'date'];
    const titles = ['ID', '보낸 앱', '보낸 닉네임', '받은 앱', '받은 닉네임', '시간(초)', '요청시간', '시작시간', '끝난시간', '상태', '메모'];
    const itemKeys = ['id', 'user1.app', 'user1.nickname', 'user2.app', 'user2.nickname', 'duration', 'createdAt', 'startedAt', 'endedAt', 'status', 'note'];
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

VideoChatLogs = reduxForm({
  form: 'videoChatLogsFilter',
  initialValues: {
    app: 'all',
    targetApp: 'all',
    videoChatLogSearchType: 'email',
    comment: '전체',
    gender: 'all',
  },
})(VideoChatLogs);

export default connect((state) => {
  const userGroup = state.auth.user.group;
  const isSuperUser = userGroup === 'super';
  return {
    userGroup,
    isSuperUser,
    items: state.videoChatLogs.items,
    itemsMeta: Object.assign({}, state.videoChatLogs.itemsMeta,
      !isSuperUser ? { app: userGroup } : {},
    ),
    initMeta: !isSuperUser ? { app: userGroup, page: 1 } : { page: 1 },
    route: state.router.location.pathname.split('/')[1],
  };
}, actions)(VideoChatLogs);
