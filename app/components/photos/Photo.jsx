// 3rd apis
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { push } from 'react-router-redux';
import Scroll from 'react-scroll';
// view
import { FormFooter, UserProfileHeader } from 'CommonComponents';
import { renderField } from 'renderField';
// actions
import actions from 'actions';
// helpers
import { objectFormatter } from 'formatHelper';

const categories = {
  일상: '일상',
  여행: '여행',
  유머: '유머',
  음식: '음식',
  기타: '기타',
};

const statuses = {
  listed: '정상',
  unlisted: '숨김',
  adminDeleted: '관리자삭제',
  autoDeleted: '자동삭제',
  userDeleted: '유저삭제',
};

export class Photo extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }
  componentWillMount() {
    const route = this.props.pathname.split('/')[1];
    const id = this.props.pathname.split('/')[2];
    if (route === 'photo' && id) this.props.getPhoto(id);
    const scroll = Scroll.animateScroll;
    scroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
  }
  handleFormSubmit(values) {
    const updateValues = {
      category: values.category,
      title: values.title,
      content: values.content,
      photoUrl: values.photoUrl,
      status: values.status,
      clickCount: parseInt(values.clickCount, 10),
      likeCount: parseInt(values.likeCount, 10),
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
      deletedAt: values.updatedAt,
      note: values.note,
    };
    this.props.updatePhoto(values.id, updateValues);
  }
  handleUserClick(user) {
    this.props.setUser(user);
    this.props.dispatch(push(`/user/${user.id}`));
  }
  handlePhotoClick(isContent) {
    const { photo } = this.props;
    if (!isContent && photo.user.photoUrl) this.props.openModal({ type: 'photo', object: photo.user });
    if (isContent && photo.photoUrl) this.props.openModal({ type: 'photo', object: photo });
  }
  handleModalClick() {
    this.props.dismissPhotosModal();
  }
  renderContent() {
    const { photoUrl } = this.props;
    return (
      <div className="card-container">
        <div className="card-header">포토 상세 정보</div>
        <div className="card-body">
          <div className="card-row">
            <Field name="photoUrl" label="사진" photoUrl={photoUrl} component={renderField} onPhotoClick={() => this.handlePhotoClick(true)} />
            <div className="card-column">
              <Field name="title" label="제목" component={renderField} containerStyle={{ flex: 1 }} inputStyle={{ width: '100%' }} />
              <Field name="content" label="내용" component={renderField} containerStyle={{ flex: 1 }} />
            </div>
          </div>
          <div className="card-row">
            <Field name="status" label="상태" selectOptions={statuses} component={renderField} />
            <Field name="category" label="카테고리" selectOptions={categories} component={renderField} />
          </div>
          <div className="card-row">
            <Field name="clickCount" label="열람 수" component={renderField} />
            <Field name="likeCount" label="좋아요 수" component={renderField} />
            <Field name="commentCount" label="댓글 수" component={renderField} />
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
    if (!this.props.photo.id) return <div />;
    const { photo, handleSubmit, pristine, reset, submitting } = this.props;
    const formFooterProps = { handleFormSubmit: this.handleFormSubmit, handleSubmit, pristine, reset, submitting };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: 15, marginBottom: 90 }}>
        <UserProfileHeader user={photo.user} onUserClick={this.handleUserClick} onPhotoClick={this.handlePhotoClick} />
        {this.renderContent()}
        <FormFooter {...formFooterProps} />
      </div>
    );
  }
}

Photo = reduxForm({
  form: 'photoForm',
})(Photo);
const selector = formValueSelector('photoForm');

function mapStateToProps(state) {
  const photoUrl = selector(state, 'photoUrl');
  return {
    pathname: state.router.location.pathname,
    photo: state.photos.item,
    photoUrl,
    enableReinitialize: true,
    initialValues: objectFormatter(state.photos.item),
  };
}

Photo = connect(mapStateToProps, actions)(Photo);
export default Photo;
