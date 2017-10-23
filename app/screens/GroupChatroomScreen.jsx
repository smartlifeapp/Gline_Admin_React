// 3rd apis
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { animateScroll, Element, scroller } from 'react-scroll';
import VisibilitySensor from 'react-visibility-sensor';
// views
import { ImageUpload } from 'CommonComponents';
import { renderField } from 'renderField';
// actions
import actions from 'actions';
// helpers
import { photoSizeUrl, isFirstChatForDay, dateFormatter, ageFrom } from 'formatHelper';

export class GroupChatroomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleFirstItemVisible = this.handleFirstItemVisible.bind(this);
    this.handleLastItemVisible = this.handleLastItemVisible.bind(this);
    this.handleUpdateChatroom = this.handleUpdateChatroom.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.state = {
      route: undefined,
      uid: undefined,
      isInitialDataLoaded: false,
    };
  }
  componentWillMount() {
    const { route, uid } = this.props;
    if (['mission', 'discussion', 'teamplay', 'confirmShot'].indexOf(route) !== -1 && uid) {
      this.setState({ route, uid });
      this.props.getGroupChatroom({ uid });
      this.props.getGroupChats({ type: route, parentUid: uid }, () => {
        animateScroll.scrollToBottom({ duration: 0, smooth: true, delay: 0, offset: 0 });
        setTimeout(() => this.setState({ isInitialDataLoaded: true }), 1000);
      });
    }
  }
  componentWillUnmount() {
    const { route } = this.state;
    if (route) {
      this.props.resetGroupChats({ type: route });
    }
  }
  handleFormSubmit(form) {
    if (form.content && form.content.length > 0) {
      const { route, uid } = this.props;
      this.props.postGroupChat({ type: route, parentUid: uid, content: form.content }, () => {
        this.props.reset();
        animateScroll.scrollToBottom();
      });
    }
  }
  handleFirstItemVisible(isVisible) {
    const { isInitialDataLoaded } = this.state;
    const { route, uid, isLoading, items, meta: { isMoreDataAvailable } } = this.props;
    if (!isLoading && items.length >= 30 && isMoreDataAvailable && isVisible && isInitialDataLoaded) {
      const prevFirstItemId = items[0].id;
      this.props.updateGroupChatsMeta({ prevFirstItemId });
      this.props.getGroupChats({ type: route, parentUid: uid, firstItemId: items[0].id }, () => {
        scroller.scrollTo('scrollToElement', { duration: 0, smooth: true, offset: -64 });
      });
    }
  }
  handleLastItemVisible(isVisible) {
    const { meta: { isBottomScreenVisible } } = this.props;
    if (isBottomScreenVisible !== isVisible) {
      this.props.updateGroupChatsMeta({ isBottomScreenVisible: isVisible });
    }
  }
  handleImageUpload(event) {
    if (event.target.files.length > 0) {
      this.props.uploadImage(event.target.files[0], ({ photoUrl, ratio }) => {
        const { route, uid } = this.props;
        this.props.postGroupChat({ type: route, parentUid: uid, photoUrl, ratio });
      });
    }
  }
  handleItemClick(item) {
    const { route, authUser } = this.props;
    if (route !== 'mission' || (route === 'mission' && authUser.group === 'super')) {
      this.props.openModal({ type: 'groupChat', object: item, objectType: route });
    }
  }
  handleUpdateChatroom(form) {
    const { uid } = this.props;
    this.props.putGroupChatroom({ uid, updateForm: { status: form.status, title: form.title } });
  }
  handleUserClick(item) {
    this.props.setUser(item, () => this.props.pushRoute(`/user/${item.uid}`));
  }
  renderItem({ dateHeader, item, previousItem, firstItemId, isLastItem }) {
    const { meta: { prevFirstItemId } } = this.props;
    const isMyChat = item.userUid === 'manager';
    const isNewPoster = !previousItem || previousItem.userUid !== item.userUid || dateHeader;
    let containerStyle = isMyChat ? 'groupchat-container mine' : 'groupchat-container';
    if (item.status !== 'active') containerStyle += ' deleted';
    const bubbleStyle = isMyChat ? 'groupchat-bubble mine' : 'groupchat-bubble';
    const imageWidth = 300;
    const photoChatStyle = { width: imageWidth, height: item.ratio ? imageWidth / item.ratio : imageWidth, objectFit: item.ratio ? 'cover' : 'contain' };
    const dateStyle = isMyChat ? 'groupchat-date mine' : 'groupchat-date';
    const deleteStyle = isMyChat ? 'groupchat-delete mine' : 'groupchat-delete';
    const createdAt = dateFormatter(new Date(item.createdAt), 'HH:MM');
    const profileImage = item.user && item.user.photoUrl ? photoSizeUrl(item.user.photoUrl, '-s') : require('img_profile_placeholder.png');
    return (
      <div>
        {/*dateHeader*/}
        {dateHeader && <div className="groupchat-date-header">
          {dateFormatter(new Date(item.createdAt), 'YYYY년 MM월 DD일 E요일')}
        </div>}
        <div className={containerStyle}>
          {/*scrollHelper*/}
          {prevFirstItemId && <Element name="scrollToElement" />}
          {firstItemId && item.id === firstItemId && <VisibilitySensor onChange={this.handleFirstItemVisible} />}
          {isLastItem && <VisibilitySensor onChange={this.handleLastItemVisible} />}
          {/*profile*/}
          {(!isMyChat && isNewPoster) ? <button className="no-design" style={{ float: 'left' }} onClick={() => this.handleUserClick(item.user)}><img alt="profile" src={profileImage} className="groupchat-profile" /></button> : <div className="groupchat-profile" />}
          {/*nickname & userInfo*/}
          {!isMyChat && isNewPoster && item.user && <div>{`${item.user.nickname} (${ageFrom(item.user.birthday)}세, ${item.user.gender === 'male' ? '남성' : '여성'}`}</div>}
          {/*content-button*/}
          <button className="no-design" onClick={() => this.handleItemClick(item)}>
            {/*text*/}
            {item.type === 'text' && <div className={bubbleStyle}>
              {item.content}
            </div>}
            {/*photo*/}
            {item.type === 'photo' && <img alt="groupChat photo" src={photoSizeUrl(item.photoUrl, '-l')} style={photoChatStyle} />}
            {/*date*/}
            <div>
              {item.status !== 'active' && <div className={deleteStyle}>삭제됨</div>}
              <div className={dateStyle}>{createdAt}</div>
            </div>
          </button>
        </div>
      </div>
    );
  }
  renderInputContainer() {
    const { route, authUser, formValues: { content } } = this.props;
    const { handleSubmit, pristine, submitting, isUploading } = this.props;
    const authDisabled = route === 'mission' && authUser.group !== 'super';
    return (
      <div className="groupchat-input-container">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field name="content" component={renderField} disabled={authDisabled} />
          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <button type="submit" disabled={pristine || submitting || authDisabled || !content}>등록</button>
            <input type="button" className="secondary" disabled={authDisabled} onClick={() => this.props.reset()} value="리셋" />
            <ImageUpload source={require('btn_image_upload.png')} onChange={this.handleImageUpload} style={{ height: 34, width: 80, objectFit: 'contain' }} isUploading={isUploading} disabled={authDisabled} />
          </div>
        </form>
      </div>
    );
  }
  renderHeader() {
    const { route, authUser, formValues: { title, status }, meta: { selectedRoom } } = this.props;
    const { handleSubmit, pristine, submitting } = this.props;
    const titleDisabled = route !== 'teamplay';
    const statusDisabled = route === 'mission' && authUser.group !== 'super';
    const submitButtonDisabled = pristine || submitting || (titleDisabled && statusDisabled) || (title === selectedRoom.title && status === selectedRoom.status);
    return (
      <div className="groupchat-header-container">
        <form onSubmit={handleSubmit(this.handleUpdateChatroom)}>
          <Field label="제목" name="title" component={renderField} maxLength={50} disabled={titleDisabled} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Field label="상태" name="status" selectOptions={{ active: '정상', inactive: '숨김', userDeleted: '유저삭제', adminDeleted: '관리자삭제' }} component={renderField} disabled={statusDisabled} />
            <button type="submit" disabled={submitButtonDisabled}>수정</button>
          </div>
        </form>
      </div>
    );
  }
  render() {
    const { items } = this.props;
    return (
      <div style={{ paddingTop: 100, paddingBottom: 130 }}>
        {this.renderHeader()}
        {items && items.length > 0 && items.map((item, index) => <this.renderItem key={item.id} dateHeader={isFirstChatForDay(index !== 0 && items[index - 1].createdAt, item.createdAt)} item={item} isLastItem={index === items.length - 1} previousItem={index === 0 ? undefined : items[index - 1]} firstItemId={items[0].id} />)}
        {this.renderInputContainer()}
      </div>
    );
  }
}

GroupChatroomScreen = reduxForm({
  form: 'groupChatroomForm',
})(GroupChatroomScreen);
const selector = formValueSelector('groupChatroomForm');

export default connect((state) => {
  const title = selector(state, 'title');
  const status = selector(state, 'status');
  const content = selector(state, 'content');
  const pathname = state.router.location.pathname;
  const route = pathname.split('/')[1];
  const uid = pathname.split('/')[2];
  const items = { mission: state.groupChats.mission, discussion: state.groupChats.discussion, confirmShot: state.groupChats.confirmShot, teamplay: state.groupChats.teamplay }[route];
  return {
    formValues: {
      title, status, content,
    },
    authUser: state.auth.user,
    isLoading: state.meta.isLoading,
    isUploading: state.meta.isUploading,
    route,
    uid,
    items,
    meta: state.groupChats.meta,
    initialValues: state.groupChats.meta.selectedRoom,
    enableReinitialize: true,
  };
}, actions)(GroupChatroomScreen);
