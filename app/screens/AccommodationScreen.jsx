// 3rd apis
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { push } from 'react-router-redux';
import { animateScroll } from 'react-scroll';
// view
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

const categories = {
  없음: '없음',
  모텔: '모텔',
  펜션: '펜션',
  사우나: '사우나',
  호텔: '호텔',
  리조트: '리조트',
  게스트하우스: '게스트하우스',
  캠핑장: '캠핑장',
  민박: '민박',
  한옥: '한옥',
};

export class AccommodationScreen extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }
  componentWillMount() {
    const { route, uid } = this.props;
    if (route === 'accommodation' && uid) this.props.getAccommodation(uid);
    animateScroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
  }
  handleFormSubmit(form) {
    this.props.updateAccommodation(form.uid, form);
  }
  handlePhotoClick(isContent) {
    const { item } = this.props;
    if (!isContent && item.user.photoUrl) this.props.openModal({ type: 'photo', object: item.user });
    if (isContent && item.photoUrl) this.props.openModal({ type: 'photo', object: item });
  }
  handleUserClick(user) {
    this.props.setUser(user);
    this.props.dispatch(push(`/user/${user.id}`));
  }
  renderBasic() {
    return (
      <div className="card-container">
        <div className="card-header">기본 정보</div>
        <div className="card-body">
          <div className="card-row">
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
              <Field name="category" selectOptions={categories} label="종류" component={renderField} />
              <Field name="name" label="상호명" component={renderField} />
            </div>
          </div>
          <div className="card-row">
            <Field name="phoneNumber" label="연락처" component={renderField} />
            <Field name="hirePrice" label="대실비용" component={renderField} />
            <Field name="stayPrice" label="숙박비용" component={renderField} />
          </div>
          <div className="card-row">
            <Field name="createdAt" label="등록일" component={renderField} />
            <Field name="updatedAt" label="수정일" component={renderField} />
            <Field name="deletedAt" label="삭제일" component={renderField} />
            {/*<Field name="registeredUntil" label="등록만료일" component={renderField} />*/}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <Field name="status" label="상태" selectOptions={statuses} component={renderField} />
            <Field name="note" label="메모" placeholder="관리자용 메모 (유저 열람 불가)" component={renderField} />
          </div>
        </div>
      </div>
    );
  }
  renderLocation() {
    const { item: { latitude, longitude } } = this.props;
    const link = `https://maps.google.com/?q=${latitude},${longitude}`;
    return (
      <div className="card-container">
        <div className="card-header">위치 정보</div>
        <div className="card-body">
          <Field name="address" label="주소" component={renderField} />
          <Field name="addressStreet1" label="상세주소" component={renderField} />
          <Field name="latitude" label="위도" component={renderField} />
          <Field name="longitude" label="경도" component={renderField} />
          {(latitude && longitude) && <a href={link} target="_blank" onClick={() => {}} style={{ display: 'flex', alignItems: 'center' }}>
            <img alt="link" src={require('ic_forward_circle_filled_gray.png')} style={{ width: 34, height: 34, objectFit: 'contain', marginLeft: 10 }} />
          </a>}
        </div>
      </div>
    );
  }
  renderDetail() {
    const { photoUrl, initialValues: { content } } = this.props;
    return (
      <div className="card-container">
        <div className="card-header">상세 정보</div>
        <div className="card-body">
          <div className="card-row">
            <Field name="photoUrl" label="대표사진" photoUrl={photoUrl} component={renderField} onPhotoClick={() => this.handlePhotoClick(true)} />
            <Field name="title" label="제목" component={renderField} containerStyle={{ flex: 1 }} />
          </div>
          <div className="card-row">
            <Field name="newPath" label="사진폴더명" component={renderField} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
            <Field name="content" label="내용" component={renderField} inputStyle={{ minHeight: 500, height: '100%' }} containerStyle={{ flex: 1 }} />
            <div className="property-content" style={{ width: 320 }} dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    );
  }
  render() {
    if (!this.props.item.uid) return <div />;
    const { item, handleSubmit, pristine, reset, submitting } = this.props;
    const formFooterProps = { handleFormSubmit: this.handleFormSubmit, handleSubmit, pristine, reset, submitting };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: 15, marginBottom: 90 }}>
        {/*<UserProfileHeader user={item.user} onUserClick={this.handleUserClick} onPhotoClick={this.handlePhotoClick} />*/}
        {this.renderBasic()}
        {this.renderLocation()}
        {this.renderDetail()}
        <FormFooter {...formFooterProps} />
      </div>
    );
  }
}

AccommodationScreen = reduxForm({
  form: 'accommodationForm',
})(AccommodationScreen);
const selector = formValueSelector('accommodationForm');

export default connect((state) => {
  const pathname = state.router.location.pathname;
  const route = pathname.split('/')[1];
  const uid = pathname.split('/')[2];
  const photoUrl = selector(state, 'photoUrl');
  return {
    pathname,
    route,
    uid,
    item: state.accommodations.item,
    photoUrl,
    enableReinitialize: true,
    initialValues: objectFormatter(state.accommodations.item),
  };
}, actions)(AccommodationScreen);
