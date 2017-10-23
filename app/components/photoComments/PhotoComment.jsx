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

const statuses = {
  listed: '정상',
  unlisted: '숨김',
  adminDeleted: '관리자삭제',
  autoDeleted: '자동삭제',
  userDeleted: '유저삭제',
};

export class PhotoComment extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }
  componentWillMount() {
    const route = this.props.pathname.split('/')[1];
    const id = this.props.pathname.split('/')[2];
    if (route === 'photoComment' && id) this.props.getPhotoComment(id);
    const scroll = Scroll.animateScroll;
    scroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
  }
  handleFormSubmit(values) {
    const updateValues = {
      content: values.content,
      status: values.status,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
      deletedAt: values.updatedAt,
      note: values.note,
    };
    this.props.updatePhotoComment(values.id, updateValues);
  }
  handlePhotoClick() {
    const { photoComment } = this.props;
    if (photoComment.user.photoUrl) this.props.openModal({ type: 'photo', object: photoComment.user });
  }
  handleUserClick(user) {
    this.props.setUser(user);
    this.props.dispatch(push(`/user/${user.id}`));
  }
  renderContent() {
    return (
      <div className="card-container">
        <div className="card-header">댓글 상세 정보</div>
        <div className="card-body">
          <div className="card-row">
            <Field name="content" label="댓글내용" component={renderField} containerStyle={{ flex: 1 }} />
          </div>
          <div className="card-row">
            <Field name="status" label="상태" selectOptions={statuses} component={renderField} />
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
    if (!this.props.photoComment.id) return <div />;
    const { photoComment, handleSubmit, pristine, reset, submitting } = this.props;
    const formFooterProps = { handleFormSubmit: this.handleFormSubmit, handleSubmit, pristine, reset, submitting };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: 15, marginBottom: 90 }}>
        <UserProfileHeader user={photoComment.user} onUserClick={this.handleUserClick} onPhotoClick={this.handlePhotoClick} />
        {this.renderContent()}
        <FormFooter {...formFooterProps} />
      </div>
    );
  }
}

PhotoComment = reduxForm({
  form: 'photoCommentForm',
})(PhotoComment);

function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname,
    photoComment: state.photoComments.item,
    enableReinitialize: true,
    initialValues: objectFormatter(state.photoComments.item),
  };
}

PhotoComment = connect(mapStateToProps, actions)(PhotoComment);
export default PhotoComment;
