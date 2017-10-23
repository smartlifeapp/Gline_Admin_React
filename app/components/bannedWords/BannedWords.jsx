import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { push } from 'react-router-redux';
import Scroll from 'react-scroll';

import SearchFilter from 'SearchFilter';
import Table from 'Table';
import Pagination from 'Pagination';
import actions from 'actions';

class BannedWords extends Component {
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
    this.props.getBannedWords({});
  }
  handlePageClick(page) {
    Scroll.animateScroll.scrollTo(0, { duration: 300, smooth: true, delay: 100 });
    this.props.getBannedWords({ ...this.props.bannedWordsMeta, page: page.selected + 1 });
  }
  handleFormSubmit(nextMeta) {
    this.props.getBannedWords(nextMeta, 'createdAt');
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
    this.props.getBannedWords({ order, orderBy });
  }
  handleItemClick(item) {
    const index = this.props.bannedWords.items.findIndex(word => word.id === item.id);
    this.props.openModal({ type: 'updateBannedWord', object: item, index });
  }
  handleReload() {
    this.props.getBannedWords({});
  }
  render() {
    const { items, itemsMeta } = this.props.bannedWords;
    const filterFields = ['word', 'registerButton'];
    const titles = ['ID', '금지어', '등록일'];
    const itemKeys = ['id', 'word', 'createdAt'];
    return (
      <div>
        <SearchFilter
          meta={this.props}
          fields={filterFields}
          dateLabel="등록일"
          onSetDate={this.handleSetDate}
          onSubmit={this.handleFormSubmit}
          onRegister={this.handleRegister}
          onReload={this.handleReload}
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

BannedWords = reduxForm({
  form: 'bannedWordsFilter',
  initialValues: {
    word: '',
  },
})(BannedWords);

const selector = formValueSelector('bannedWordsFilter');
BannedWords = connect((state) => {
  const word = selector(state, 'word');
  return {
    word,
    bannedWords: state.bannedWords,
  };
}, actions)(BannedWords);

export default BannedWords;
