import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { ImageUpload } from 'CommonComponents';
import actions from 'actions';
import { photoSizeUrl } from 'formatHelper';

const titles = {
  addCashLog: '캐시 추가/차감',
  addPointLog: '포인트 추가/차감',
  blockUser: '유전 차단',
  error: '오류',
  info: '알림',
  updateBannedWord: '금지어 수정',
  groupChat: '메시지 수정',
};

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <div className="modal-input-container">
    {type === 'textarea' && <textarea {...input} className="modal-input textarea" placeholder={placeholder} />}
    {type !== 'textarea' && <input className="modal-input" {...input} placeholder={placeholder} type={type} />}
    {touched && error && <span>{error}</span>}
  </div>
);

const Content = ({ type, onSubmit, onClose, object, onDelete, onGroupChatDelete, message, error, pristine, submitting, isUploading, onImageUpload, isImageUploaded }) => {
  switch (type) {
    case 'photo':
    console.log('content.object', object);
      const photoContent = photoSizeUrl(object.photoUrl, '-l') || photoSizeUrl(object.user.photoUrl, '-l');
      return (
        <div className="modal-body">
          <button className="no-design" onClick={onClose}>
            <img alt="photoContent" src={photoContent} style={{ maxWidth: 500, maxHeight: 500 }} />
          </button>
        </div>
      );
    case 'error':
      return (
        <div className="modal-body">
          <div className="modal-content">
            {message}
          </div>
          <form onSubmit={onSubmit} className="modal-form">
            <input type="button" value="확인" onClick={onClose} />
          </form>
        </div>
      );
      // return (
      //   <form onSubmit={onSubmit}>
      //     <p>{message}</p>
      //     <div className="modal modal-buttons">
      //       <input type="button" className="button dismiss" value="확인" onClick={onClose} />
      //     </div>
      //   </form>
      // );
    case 'groupChat':
      return (
        <div className="modal-body">
          <div className="modal-content">
            {object.type === 'text' && <Field name="content" component={renderField} type="textarea" />}
            {object.type === 'photo' && <ImageUpload source={photoSizeUrl(object.photoUrl, '-m')} onChange={onImageUpload} style={{ width: 80, height: 80 / object.ratio, objectFit: 'contain', marginBottom: 15 }} isUploading={isUploading} />}
            {object.type === 'photo' && <Field name="photoUrl" component={renderField} type="textarea" />}
          </div>
          <form onSubmit={onSubmit} className="modal-form">
            <button type="submit" disabled={(object.type === 'photo' && !isImageUploaded) || submitting}>수정</button>
            <input type="button" className="dismiss" value="취소" onClick={onClose} />
            <input type="button" className="alert" value={object.status === 'active' ? '삭제' : '복구'} onClick={onGroupChatDelete} />
          </form>
        </div>
      );
    case 'addPointLog': case 'addCashLog':
      return (
        <div className="modal-body">
          <div className="modal-content">
            <Field name="reason" component={renderField} type="text" placeholder="변동이유 (e.g. 우수회원)" />
            <Field name={type === 'addPointLog' ? 'point' : 'cash'} component={renderField} type="text" placeholder={`${type === 'addPointLog' ? '포인트' : '캐시'} (e.g. 1,000 또는 -1000)`} />
          </div>
          <form onSubmit={onSubmit} className="modal-form">
            <button type="submit" disabled={pristine || submitting}>등록</button>
            <input type="button" className="dismiss" value="취소" onClick={onClose} />
          </form>
        </div>
      );
    case 'blockUser':
      return (
        <div className="modal-body">
          <div className="modal-content">
            <Field name="bannedReason" component={renderField} type="text" placeholder="차단이유 (e.g. 타앱 유도)" />
            <Field name="bannedDuration" component={renderField} type="text" placeholder="차단기간(일) (e.g. 7)" />
            <form onSubmit={onSubmit} className="modal-form">
              <button type="submit" disabled={pristine || submitting}>등록</button>
              <input type="button" className="dismiss" value="취소" onClick={onClose} />
            </form>
          </div>
        </div>
      );
    case 'updateBannedWord':
      return (
        <div className="modal-body">
          <div className="modal-content">
            <Field name="word" component={renderField} type="text" placeholder="금지어" />
          </div>
          <form onSubmit={onSubmit} className="modal-form">
            <button type="submit" disabled={pristine || submitting}>수정</button>
            <input type="button" className="dismiss" value="취소" onClick={onClose} />
          </form>
        </div>
      );
    default:
      return <div />;
  }
};

const NotificationModal = ({ message, onClose }) => {
  setTimeout(onClose, 4000);
  return (
    <div className="modal-notification notification-animation">
      <div className="modal-notification-header">ⅈ 알림</div>
      <div className="modal-notification-content">{message}</div>
    </div>
  );
};

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleGroupChatDelete = this.handleGroupChatDelete.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.state = {
      isImageUploaded: false,
    };
  }
  handleClose() {
    this.props.reset();
    this.props.closeModal();
  }
  handleDelete() {
    this.props.deleteBannedWord(this.props.modal.object.id, this.props.modal.index);
  }
  handleImageUpload(event) {
    if (event.target.files.length > 0) {
      this.props.uploadImage(event.target.files[0], ({ photoUrl, ratio }) => {
        const { modal: { object } } = this.props;
        this.props.updateModal({ object: Object.assign({}, object, { photoUrl, ratio }) });
        this.setState({ isImageUploaded: true });
      });
    }
  }
  handleGroupChatDelete() {
    const { modal: { object, objectType } } = this.props;
    this.props.putGroupChat({ type: objectType, uid: object.uid, status: object.status === 'active' ? 'adminDeleted' : 'active' });
  }
  handleFormSubmit(form) {
    const { modal: { object, objectType } } = this.props;
    const valueObject = form;
    let error = '';
    switch (this.props.modal.type) {
      case 'groupChat':
        if (form.content) this.props.putGroupChat({ type: objectType, uid: object.uid, content: form.content });
        if (this.state.isImageUploaded) this.props.putGroupChat({ type: objectType, uid: object.uid, photoUrl: object.photoUrl, ratio: object.ratio });
        break;
      case 'addPointLog':
        if (!valueObject.reason || !valueObject.point) error = '필드를 모두 입력해주세요.';
        valueObject.point = parseInt(valueObject.point.replace(',', ''), 10);
        if (isNaN(valueObject.point)) error = '포인트 필드는 숫자만 입력해주세요.';
        if (!error) this.props.postPointLog(this.props.user.id, valueObject);
        break;
      case 'addCashLog':
        if (!valueObject.reason || !valueObject.cash) error = '필드를 모두 입력해주세요.';
        valueObject.cash = parseInt(valueObject.cash.replace(',', ''), 10);
        if (isNaN(valueObject.cash)) error = '캐시 필드는 숫자만 입력해주세요.';
        if (!error) this.props.postCashLog(this.props.user.id, valueObject);
        break;
      case 'blockUser':
        if (!valueObject.bannedReason || !valueObject.bannedDuration) error = '필드를 모두 입력해주세요.';
        valueObject.method = 'block';
        if (!error) this.props.putUser({ id: this.props.user.id, updateForm: Object.assign({}, valueObject, { method: 'ban' }) });
        break;
      case 'updateBannedWord':
        if (!valueObject.word) error = '금지어를 입력해주세요.';
        if (!error) this.props.updateBannedWord(this.props.modal.object.id, valueObject, this.props.modal.index);
        break;
      default:
        break;
    }
    if (error) this.props.updateModal({ error });
  }
  renderModalHeader() {
    const { type, object } = this.props.modal;
    return (
      <div className="modal-header">
        {titles[type]}
      </div>
    );
  }
  renderModalContent() {
    const { handleSubmit, pristine, submitting, isUploading } = this.props;
    const { isImageUploaded } = this.state;
    return (
      <Content
        {...this.props.modal}
        pristine={pristine}
        submitting={submitting}
        onSubmit={handleSubmit(this.handleFormSubmit)}
        onClose={() => this.handleClose()}
        onDelete={() => this.handleDelete()}
        onGroupChatDelete={() => this.handleGroupChatDelete()}
        isUploading={isUploading}
        onImageUpload={this.handleImageUpload}
        isImageUploaded={isImageUploaded}
      />
    );
  }
  render() {
    if (!this.props.modal.isModalVisible) return <div />;
    const { type } = this.props.modal;
    if (type === 'notification') return <NotificationModal message={this.props.modal.message} onClose={() => this.handleClose()} />;
    return (
      <div className="modal-backdrop dark">
        <div className="screen" />
        <div className="modal-container">
          {type !== 'photo' && this.renderModalHeader()}
          {this.renderModalContent()}
        </div>
      </div>
    );
  }
}

Modal = reduxForm({
  form: 'modalForm',
})(Modal);

export default connect(state => ({
  modal: state.modal,
  user: state.users.item,
  enableReinitialize: true,
  initialValues: state.modal.object,
  isUploading: state.meta.isUploading,
}), actions)(Modal);
