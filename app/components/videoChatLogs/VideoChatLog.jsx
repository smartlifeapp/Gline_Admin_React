// 3rd apis
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import Scroll from 'react-scroll';
// views
import { FormFooter, UserProfileHeader } from 'CommonComponents';
import { renderField } from 'renderField';
// actions
import actions from 'actions';
// helpers
import { objectFormatter } from 'formatHelper';

// 'requested', 'canceled', 'accepted', 'declined', 'inChat', 'ended', 'adminDeleted'
const statuses = {
  requested: '신청',
  canceled: '신청취소',
  accepted: '수락',
  declined: '거부',
  inChat: '채팅중',
  ended: '채팅종료',
  adminDeleted: '관리자삭제',
};

export class VideoChatLog extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }
  componentWillMount() {
    const route = this.props.pathname.split('/')[1];
    const id = this.props.pathname.split('/')[2];
    if (route === 'videoChatLog' && id) this.props.getVideoChatLog(id);
    const scroll = Scroll.animateScroll;
    scroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
  }
  handleFormSubmit(form) {
    const updateForm = {
      status: form.status,
      reason: form.reason,
      note: form.note,
    };
    this.props.updateVideoChatLog(form.id, updateForm);
  }
  handlePhotoClick(user) {
    if (user && user.photoUrl) this.props.openModal({ type: 'photo', object: user });
  }
  handleUserClick(user) {
    this.props.setUser(user);
    this.props.dispatch(push(`/user/${user.id}`));
  }
  renderContent() {
    return (
      <div className="card-container">
        <div className="card-header">화상채팅 상세 정보</div>
        <div className="card-body">
          <div className="card-row">
            <Field name="status" label="상태" selectOptions={statuses} component={renderField} />
          </div>
          <div className="card-row">
            <Field name="startedAt" label="시작시간" component={renderField} />
            <Field name="endedAt" label="종료시간" component={renderField} />
            <Field name="duration" label="시간(초)" component={renderField} />
          </div>
          <div className="card-row">
            <Field name="canceledAt" label="취소시간" component={renderField} />
            <Field name="declinedAt" label="거부시간" component={renderField} />
          </div>
          <div className="card-row">
            <Field name="createdAt" label="등록일" component={renderField} />
            <Field name="updatedAt" label="수정일" component={renderField} />
            <Field name="deletedAt" label="삭제일" component={renderField} />
          </div>
          <Field name="note" label="메모" placeholder="관리자용 메모 (유저 열람 불가)" component={renderField} />
        </div>
      </div>
    );
  }
  render() {
    if (!this.props.videoChatLog.id) return <div />;
    const { videoChatLog, handleSubmit, pristine, reset, submitting } = this.props;
    const formFooterProps = { handleFormSubmit: this.handleFormSubmit, handleSubmit, pristine, reset, submitting };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: 15, marginBottom: 90 }}>
        <UserProfileHeader user={videoChatLog.user1} onUserClick={this.handleUserClick} onPhotoClick={this.handlePhotoClick} />
        <div style={{ display: 'flex', width: '100%', marginTop: 20, marginBottom: 40, justifyContent: 'center' }}>
          <img alt="icon down" src={require('ic_down_filled_blue.png')} style={{ width: 30, height: 30, objectFit: 'contain' }} />
        </div>
        <UserProfileHeader user={videoChatLog.user2} onUserClick={this.handleUserClick} onPhotoClick={this.handlePhotoClick} />
        {this.renderContent()}
        <FormFooter {...formFooterProps} />
      </div>
    );
  }
}

VideoChatLog = reduxForm({
  form: 'videoChatLogForm',
})(VideoChatLog);

export default connect(state => ({
  pathname: state.router.location.pathname,
  videoChatLog: state.videoChatLogs.item,
  enableReinitialize: true,
  initialValues: objectFormatter(state.videoChatLogs.item),
}), actions)(VideoChatLog);
