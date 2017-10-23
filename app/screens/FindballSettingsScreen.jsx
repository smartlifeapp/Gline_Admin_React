// 3rd apis
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
// components
import { Switch } from 'CommonComponents';
import { renderField } from 'renderField';
// actions
import actions from 'actions';

class FindballSettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleUpdateCurrentMission = this.handleUpdateCurrentMission.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.renderMission = this.renderMission.bind(this);
  }
  componentWillMount() {
    const { route } = this.props;
    if (route === 'findballSettings') {
      this.props.getCurrentMission();
      this.props.getGroupChatrooms({ type: 'mission' });
    }
  }
  handleItemClick({ route, uid }) {
    this.props.pushRoute(`/${route}/${uid}`);
  }
  handleUpdateCurrentMission(form) {
    if (form.int) this.props.putCurrentMission({ int: form.int });
  }
  handleUpdateItem({ item, type }) {
    const { missions } = this.props;
    switch (type) {
      case 'status':
        if (item) {
          this.props.putGroupChatroom({ uid: item.uid, updateForm: { status: item.status === 'active' ? 'inactive' : 'active' } }, (updatedItem) => {
            this.props.updateItemInGroupChatrooms({ uid: item.uid, type: 'missions', item: { status: updatedItem.status } });
          });
        }
        break;
      case 'statusAll':
        if (missions.length > 0) {
          let uids = '';
          missions.forEach((mission) => {
            uids += uids ? `,${mission.uid}` : mission.uid;
          });
          const isAllActive = missions.filter(mission => mission.status === 'inactive').length === 0;
          this.props.putGroupChatrooms({ uids, updateForm: { status: isAllActive ? 'inactive' : 'active' } }, () => {
            this.props.getGroupChatrooms({ type: 'mission' });
          });
        }
        break;
      case 'deleteHints':
        this.props.putGroupChats({ parentUids: item.uid, updateForm: { status: 'inactive' } }, () => {
          this.props.updateItemInGroupChatrooms({ uid: item.uid, type: 'missions', item: { hintCount: 0 } });
        });
        break;
      case 'deleteDiscussions':
        this.props.putGroupChats({ parentUids: item.discussionUid, updateForm: { status: 'inactive' } }, () => {
          this.props.updateItemInGroupChatrooms({ uid: item.uid, type: 'missions', item: { discussionCount: 0 } });
        });
        break;
      case 'deleteAllHints':
        if (missions.length > 0) {
          let parentUids = '';
          missions.forEach((mission) => {
            parentUids += parentUids ? `,${mission.uid}` : mission.uid;
          });
          this.props.putGroupChats({ parentUids, updateForm: { status: 'inactive' } }, () => {
            this.props.getGroupChatrooms({ type: 'mission' });
          });
        }
        break;
      case 'deleteAllDiscussions':
        if (missions.length > 0) {
          let parentUids = '';
          missions.forEach((mission) => {
            parentUids += parentUids ? `,${mission.discussionUid}` : mission.discussionUid;
          });
          this.props.putGroupChats({ parentUids, updateForm: { status: 'inactive' } }, () => {
            this.props.getGroupChatrooms({ type: 'mission' });
          });
        }
        break;
      default:
        break;
    }
  }
  renderMission({ item }) {
    const { isLoading } = this.props;
    return (
      <tr>
        <td>{item.title}</td>
        <td><button className="no-design" style={{ color: '#353535' }} onClick={() => this.handleItemClick({ route: 'mission', uid: item.uid })}>{item.hintCount}</button></td>
        <td><button className="no-design" style={{ color: '#353535' }} onClick={() => this.handleItemClick({ route: 'discussion', uid: item.discussionUid })}>{item.discussionCount}</button></td>
        <td><div style={{ display: 'flex', alignItems: 'center' }}><Switch on={item.status === 'active'} onClick={() => this.handleUpdateItem({ item, type: 'status' })} enabled={!isLoading} /></div></td>
        <td><button onClick={() => this.handleUpdateItem({ item, type: 'deleteHints' })} disabled={isLoading}>실행</button></td>
        <td><button onClick={() => this.handleUpdateItem({ item, type: 'deleteDiscussions' })} disabled={isLoading}>실행</button></td>
      </tr>
    );
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { missions, isLoading } = this.props;
    const allHints = (items) => {
      let hints = 0;
      items.forEach((item) => {
        if (item.hintCount) hints += item.hintCount;
      });
      return hints;
    };
    const allDiscussions = (items) => {
      let count = 0;
      items.forEach((item) => {
        if (item.discussionCount) count += item.discussionCount;
      });
      return count;
    };
    const isAllActive = missions.filter(item => item.status === 'inactive').length === 0;
    return (
      <div style={{ padding: 10, maxWidth: 700 }}>
        <form onSubmit={handleSubmit(this.handleUpdateCurrentMission)} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <Field name="int" label="현재 이벤트 회차" component={renderField} />
          <button type="submit" disabled={pristine || submitting}>수정</button>
        </form>
        <table>
          <thead>
            <tr>
              {['방 번호', '힌트 수', '토론 수', '진행 중', '힌트 초기화', '토론 초기화'].map(item => <th key={item}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {missions && missions.length > 0 && missions.map(item => <this.renderMission key={item.id} item={item} />)}
            <tr>
              <td style={{ fontWeight: 600 }}>전체</td>
              <td>{allHints(missions)}</td>
              <td>{allDiscussions(missions)}</td>
              <td><div style={{ display: 'flex', alignItems: 'center' }}><Switch on={isAllActive} onClick={() => this.handleUpdateItem({ type: 'statusAll' })} enabled={!isLoading} /></div></td>
              <td><button onClick={() => this.handleUpdateItem({ type: 'deleteAllHints' })} disabled={isLoading}>일괄실행</button></td>
              <td><button onClick={() => this.handleUpdateItem({ type: 'deleteAllDiscussions' })} disabled={isLoading}>일괄실행</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

FindballSettingsScreen = reduxForm({
  form: 'FindballSettingsForm',
})(FindballSettingsScreen);

export default connect((state) => {
  const currentMission = state.groupChats.meta.currentMission;
  return {
    isLoading: state.meta.isLoading,
    route: state.router.location.pathname.split('/')[1],
    missions: state.groupChats.missions,
    // discussions: state.groupChats.discussions,
    currentMission,
    enableReinitialize: true,
    initialValues: currentMission,
  };
}, actions)(FindballSettingsScreen);
