// 3rd apis
import React from 'react';
import { connect } from 'react-redux';
// components
import Table from 'Table';
// actions
import actions from 'actions';

class GroupChatroomsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  componentWillMount() {
    const { route } = this.props;
    if (['missions', 'discussions', 'teamplays'].indexOf(route) !== -1) {
      this.props.getGroupChatrooms({ type: route.slice(0, route.length - 1) });
    }
  }
  handleItemClick(item) {
    const { route } = this.props;
    this.props.updateGroupChatsMeta({ selectedRoom: item }, () => {
      this.props.setUser(item, this.props.pushRoute(`/${route.slice(0, route.length - 1)}/${item.uid}`));
    });
  }
  render() {
    const { items, route, itemsMeta } = this.props;
    const defaultTitle = ['ID', '제목', '상태', '메모'];
    const defaultItemKeys = ['id', 'title', 'status', 'note'];
    const titles = {
      missions: defaultTitle,
      discussions: defaultTitle,
      teamplays: ['ID', '제목', '지역', '도시', '상태', '메모'],
    }[route];
    const itemKeys = {
      missions: defaultItemKeys,
      discussions: defaultItemKeys,
      teamplays: ['id', 'title', 'addressProvince', 'addressCity', 'status', 'note'],
    }[route];
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

export default connect((state) => {
  const route = state.router.location.pathname.split('/')[1];
  const items = { missions: state.groupChats.missions, discussions: state.groupChats.discussions, teamplays: state.groupChats.teamplays }[route];
  const itemsMeta = { missions: state.groupChats.missionsMeta, discussions: state.groupChats.discussionsMeta, teamplays: state.groupChats.teamplaysMeta }[route];
  return {
    route,
    items,
    itemsMeta,
  };
}, actions)(GroupChatroomsScreen);
