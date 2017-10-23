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
  undealt: '처리대기',
  dealt: '처리완료',
  rejected: '관리자거부',
  userCanceled: '유저취소',
  adminDeleted: '관리자삭제',
};

export class CashoutRequest extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }
  componentWillMount() {
    const route = this.props.pathname.split('/')[1];
    const id = this.props.pathname.split('/')[2];
    if (route === 'cashoutRequest' && id) this.props.getCashoutRequest(id);
    const scroll = Scroll.animateScroll;
    scroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
  }
  handleFormSubmit(values) {
    const updateValues = {
      status: values.status,
      citizenId: values.citizenId,
      phoneNumber: values.phoneNumber,
      bankName: values.bankName,
      bankAccountNo: values.bankAccountNo,
      note: values.note,
    };
    this.props.updateCashoutRequest(values.id, updateValues);
  }
  handlePhotoClick() {
    const { user } = this.props.cashoutRequest;
    if (user.photoUrl) this.props.openModal({ type: 'photo', object: user });
  }
  handleUserClick(user) {
    this.props.setUser(user);
    this.props.dispatch(push(`/user/${user.id}`));
  }
  renderDefaultInfo() {
    return (
      <div className="card-container">
        <div className="card-header">기본 정보</div>
        <div className="card-body">
          <Field name="status" label="상태" selectOptions={statuses} component={renderField} />
          <Field name="cash" label="사용캐시" component={renderField} />
          <Field name="money" label="신청금액" component={renderField} />
        </div>
      </div>
    );
  }
  renderUserInfo() {
    return (
      <div className="card-container">
        <div className="card-header">회원 정보</div>
        <div className="card-body">
          <Field name="name" label="예금주" component={renderField} />
          <Field name="citizenId" label="주민번호" component={renderField} />
          <Field name="phoneNumber" label="연락처" component={renderField} />
        </div>
      </div>
    );
  }
  renderBankInfo() {
    return (
      <div className="card-container">
        <div className="card-header">은행 정보</div>
        <div className="card-body">
          <Field name="bankName" label="은행명" component={renderField} />
          <Field name="bankAccountNo" label="계좌번호" component={renderField} />
        </div>
      </div>
    );
  }
  renderContent() {
    return (
      <div className="card-container">
        <div className="card-header">상세 정보</div>
        <div className="card-body">
          <div className="card-row">
            <Field name="createdAt" label="요청일" component={renderField} />
            <Field name="updatedAt" label="수정일" component={renderField} />
            <Field name="deletedAt" label="삭제일" component={renderField} />
          </div>
          <Field name="note" label="메모" placeholder="관리자용 메모 (유저 열람 불가)" component={renderField} />
        </div>
      </div>
    );
  }
  render() {
    if (!this.props.cashoutRequest.id) return <div />;
    const { cashoutRequest, handleSubmit, pristine, reset, submitting } = this.props;
    const formFooterProps = { handleFormSubmit: this.handleFormSubmit, handleSubmit, pristine, reset, submitting };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: 15, marginBottom: 90 }}>
        <UserProfileHeader user={cashoutRequest.user} onUserClick={this.handleUserClick} onPhotoClick={this.handlePhotoClick} />
        {this.renderDefaultInfo()}
        {this.renderUserInfo()}
        {this.renderBankInfo()}
        {this.renderContent()}
        <FormFooter {...formFooterProps} />
      </div>
    );
  }
}

CashoutRequest = reduxForm({
  form: 'cashoutRequestForm',
})(CashoutRequest);

export default connect(state => ({
  pathname: state.router.location.pathname,
  cashoutRequest: state.cashoutRequests.item,
  enableReinitialize: true,
  initialValues: objectFormatter(state.cashoutRequests.item),
}), actions)(CashoutRequest);
