import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { animateScroll } from 'react-scroll';
import actions from 'actions';
import { renderField } from 'renderField';
import { photoSizeUrl, ageFrom, numberWithCommas, objectFormatter } from 'formatHelper';

const statuses = {
  subscribed: '정회원',
  free: '일반',
  banned: '차단',
  deregistered: '탈퇴',
  adminDeleted: '관리자삭제',
};

const genders = {
  male: '남성',
  female: '여성',
};

const RenderGenderIcon = (value) => {
  const genderIcon = value === 'female' ? require('ic_female.png') : require('ic_male.png');
  return (
    <img alt={value} src={genderIcon} style={{ width: 20, height: 20, objectFit: 'contain' }} />
  );
};

export class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleUserAction = this.handleUserAction.bind(this);
  }
  componentWillMount() {
    const { route, uid } = this.props;
    if (route === 'user' && uid) {
      this.props.getUser(uid);
    }
    animateScroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
  }
  handleFormSubmit(updateForm) {
    const { item: { id } } = this.props;
    this.props.putUser({ id, updateForm: Object.assign({}, updateForm, { method: 'update' }) });
  }
  handlePhotoClick() {
    const { user } = this.props;
    if (user.photoUrl) this.props.openModal({ type: 'photo', object: user });
  }
  handleUserAction(type) {
    this.props.openModal({ type });
  }
  renderHeader() {
    const { item } = this.props;
    const profilePhoto = photoSizeUrl(item.photoUrl, '-m') || require('img_profile_placeholder.png');
    return (
      <div className="user-container">
        <button onClick={this.handlePhotoClick} className="no-design" style={{ height: 140, width: 140, margin: 0, padding: 0 }}>
          <img className="user-profile" src={profilePhoto} alt="profile" />
        </button>
        <div className="user-content-container">
          <div className="user-content-row" style={{ alignItems: 'flex-start' }}>
            <div className="user-content-column" style={{ flex: 1, alignItems: 'flex-start' }}>
              <div className="user-content-row">
                <div className="user-id">{item.userId}</div>
                <div className="user-nickname">{item.nickname}</div>
                <div className={`user-status ${item.status}`}>{statuses[item.status]}</div>
              </div>
              <div className="user-content-row">
                {RenderGenderIcon(item.gender)}
                <div className="user-age">{ageFrom(item.birthday)}세</div>
              </div>
            </div>
          </div>
          <div className="user-content-row buttons">
            <input type="button" value="차단" onClick={() => this.handleUserAction('blockUser')} />
          </div>
        </div>
      </div>
    );
  }
  renderValueContainer(icon, label, value, onClick = () => {}, disabled = false) {
    return (
      <button className={`user-stat-value-container${disabled ? ' disabled' : ''}`} key={label} onClick={onClick} disabled={disabled} >
        <div className="user-stat-icon-container">
          <img alt={label} src={icon} className="user-stat-icon" />
        </div>
        <div className="user-stat-value-content-container">
          <div className="user-stat-value-content">{numberWithCommas(value)}</div>
          <div className="user-stat-value-label">{label}</div>
        </div>
      </button>
    );
  }
  renderActions() {
    const { user, user: { email } } = this.props;
    const containerStyle = { display: 'flex', width: '100%', flexWrap: 'wrap', flexDirection: 'row', margin: 5, justifyContent: 'center' };
    return (
      <div style={containerStyle}>
        {this.renderValueContainer(require('ic_talk_gray.png'), '토크 등록', numberWithCommas(user.talkCount), () => {
          this.props.updateTalksMeta({ email });
          this.props.pushRoute('/talks');
        }, user.talkCount === 0)}
        {this.renderValueContainer(require('ic_photo_gray.png'), '포토 등록', numberWithCommas(user.photoCount), () => {
          this.props.updatePhotosMeta({ email });
          this.props.pushRoute('/photos');
        }, user.photoCount === 0)}
        {this.renderValueContainer(require('ic_comment_gray.png'), '댓글 등록', numberWithCommas(user.photoCommentCount), () => {
          this.props.updatePhotoCommentsMeta({ email });
          this.props.pushRoute('/photoComments');
        }, user.photoCommentCount === 0)}
        {this.renderValueContainer(require('ic_like_gray.png'), '좋아요 클릭', numberWithCommas(user.photoRecommendCount), () => {}, true)}
        {this.renderValueContainer(require('ic_point_gray.png'), '포인트 내역', numberWithCommas(user.pointLogCount), () => {
          this.props.updatePointLogsMeta({ email });
          this.props.pushRoute('/pointLogs');
        }, user.pointLogCount === 0)}
        {this.renderValueContainer(require('ic_coins_gray.png'), '캐시 내역', numberWithCommas(user.cashLogCount), () => {
          this.props.updateCashLogsMeta({ email });
          this.props.pushRoute('/cashLogs');
        }, user.cashLogCount === 0)}
        {this.renderValueContainer(require('ic_purchase_gray.png'), '구매 내역', numberWithCommas(user.purchaseLogCount), () => {
          this.props.updatePurchaseLogsMeta({ email });
          this.props.pushRoute('/purchaseLogs');
        }, user.purchaseLogCount === 0)}
        {this.renderValueContainer(require('ic_money_gray.png'), '환급 신청', numberWithCommas(user.cashoutRequestCount), () => {
          this.props.updateCashoutRequestsMeta({ email });
          this.props.pushRoute('/cashoutRequests');
        }, user.cashoutRequestCount === 0)}
        {this.renderValueContainer(require('ic_chat_gray.png'), '보낸 쪽지', numberWithCommas(user.chatSentCount), () => {}, true)}
        {this.renderValueContainer(require('ic_chat_gray.png'), '받은 쪽지', numberWithCommas(user.chatReceivedCount), () => {}, true)}
        {this.renderValueContainer(require('ic_video_chat_gray.png'), '영상 신청', numberWithCommas(user.videoChatLogRequestCount), () => {
          this.props.updateVideoChatLogsMeta({ email, status: 'ended' });
          this.props.pushRoute('/videoChatLogs');
        }, user.videoChatLogRequestCount === 0)}
        {this.renderValueContainer(require('ic_video_chat_gray.png'), '영상 수락', numberWithCommas(user.videoChatLogReceivedCount), () => {
          this.props.updateVideoChatLogsMeta({ targetEmail: email, status: 'ended' });
          this.props.pushRoute('/videoChatLogs');
        }, user.videoChatLogReceivedCount === 0)}
      </div>
    );
  }
  renderDefaultInfo() {
    return (
      <div className="card-container">
        <div className="card-header">기본 정보</div>
        <div className="card-body">
          <Field name="id" label="ID" component={renderField} disabled />
          <Field name="userId" label="유저ID" component={renderField} />
          <Field name="email" label="이메일" component={renderField} />
          <Field name="nickname" label="닉네임" component={renderField} />
          <Field name="comment" label="대화주제" component={renderField} />
          <Field name="status" label="상태" selectOptions={statuses} component={renderField} />
        </div>
      </div>
    );
  }
  renderUserInfo() {
    return (
      <div className="card-container">
        <div className="card-header">회원 정보</div>
        <div className="card-body">
          <Field name="birthday" label="생년월일" component={renderField} />
          <Field name="gender" label="성별" selectOptions={genders} component={renderField} />
          <Field name="phoneNumber" label="연락처" component={renderField} />
        </div>
      </div>
    );
  }
  renderDetailInfo() {
    return (
      <div className="card-container">
        <div className="card-header">상세 정보</div>
        <div className="card-body">
          <div className="card-row">
            <Field name="loginCount" label="로그인 수" component={renderField} />
            <Field name="activityCount" label="활동 지수" component={renderField} />
            <Field name="clickCount" label="열람 수" component={renderField} />
          </div>
          <div className="card-row">
            <Field name="isOnline" label="온라인" selectOptions={{ Y: 'Y', N: 'N' }} component={renderField} />
            <Field name="isChatting" label="채팅 중" selectOptions={{ Y: 'Y', N: 'N' }} component={renderField} />
            <Field name="isLoggedIn" label="로그인 중" selectOptions={{ Y: 'Y', N: 'N' }} component={renderField} />
          </div>
          <div className="card-row">
            <Field name="subscribedUntil" label="이용권기간" component={renderField} />
            <Field name="registerUntil" label="등록기간" component={renderField} />
            <Field name="registerLimit" label="등록 가능 수" component={renderField} />
          </div>
          <div className="card-row">
            <Field name="createdAt" label="등록일" component={renderField} />
            <Field name="updatedAt" label="수정일" component={renderField} />
            <Field name="lastActivityAt" label="마지막 사용일" component={renderField} />
            <Field name="deletedAt" label="삭제일" component={renderField} />
          </div>
          <div className="card-row">
            <Field name="bannedUntil" label="차단해지일" component={renderField} />
            <Field name="banedReason" label="차단이유" component={renderField} />
          </div>
          <Field name="note" label="메모" placeholder="관리자용 메모 (유저 열람 불가)" component={renderField} />
        </div>
      </div>
    );
  }
  renderLocationInfo() {
    const { item } = this.props;
    const link = (item && item.latitude && item.longitude) ? `https://maps.google.com/?q=${item.latitude},${item.longitude}` : `http://ipinfo.io/${item.ipAddress}`;
    return (
      <div className="card-container">
        <div className="card-header">위치 정보</div>
        <div className="card-body">
          <Field name="ipAddress" label="IP주소" component={renderField} />
          <Field name="latitude" label="위도" component={renderField} />
          <Field name="longitude" label="경도" component={renderField} />
          <a href={link} target="_blank" onClick={() => {}}>
            <img alt="link" src={require('ic_forward_circle_filled_gray.png')} style={{ width: 34, height: 34, objectFit: 'contain', marginLeft: 10 }} />
          </a>
        </div>
      </div>
    );
  }
  renderFormFooter() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="form-footer">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="buttons">
            <button type="submit" className="button main-button" disabled={pristine || submitting}>저장</button>
            <button type="button" className="button main-button reset" disabled={pristine || submitting} onClick={reset}>리셋</button>
          </div>
        </form>
      </div>
    );
  }
  render() {
    if (!this.props.item || !this.props.item.uid) return <div />; //todo: render emptyContent
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: 15, marginBottom: 90 }}>
        {this.renderHeader()}
        {/*{this.renderActions()}*/}
        {this.renderDefaultInfo()}
        {this.renderUserInfo()}
        {this.renderDetailInfo()}
        {this.renderLocationInfo()}
        {this.renderFormFooter()}
      </div>
    );
  }
}

UserScreen = reduxForm({
  form: 'userForm',
})(UserScreen);

export default connect((state) => {
  const pathname = state.router.location.pathname;
  const route = pathname.split('/')[1];
  const uid = pathname.split('/')[2];
  return {
    pathname,
    route,
    uid,
    item: state.users.item,
    enableReinitialize: true,
    initialValues: objectFormatter(state.users.item),
  };
}, actions)(UserScreen);
