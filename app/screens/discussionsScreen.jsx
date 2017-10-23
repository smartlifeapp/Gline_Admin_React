// 3rd apis
import React from 'react';
import { connect } from 'react-redux';
// components
import Table from 'Table';
// actions
import actions from 'actions';

class DiscussionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  componentWillMount() {
    const { route } = this.props;
    if (route === 'discussions') this.props.getGroupChatrooms({ type: 'discussion' });
  }
  handleItemClick(item) {
    this.props.setUser(item, this.props.pushRoute(`/discussion/${item.uid}`));
  }
  render() {
    const { items, itemsMeta } = this.props;
    const titles = ['ID', '제목', '상태', '메모'];
    const itemKeys = ['id', 'title', 'status', 'note'];
    return (
      <div>
        <Table
          titles={titles}
          items={items}
          itemKeys={itemKeys}
          itemsMeta={itemsMeta}
          onHeadClick={this.handleHeadClick}
          onItemClick={this.handleItemClick}
        />
      </div>
    );
  }
}

export default connect(state => ({
  items: state.groupChats.discussions,
  itemsMeta: state.groupChats.discussionsMeta,
  route: state.router.location.pathname.split('/')[1],
}), actions)(DiscussionsScreen);
