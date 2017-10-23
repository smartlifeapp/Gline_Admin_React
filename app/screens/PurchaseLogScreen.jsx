// 3rd apis
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Scroll from 'react-scroll';
// views
import { FormFooter, UserProfileHeader } from 'CommonComponents';
import { renderField } from 'renderField';
// actions
import actions from 'actions';
// helpers
import { objectFormatter } from 'formatHelper';

const types = {
  inApp: '인앱결제',
  deposit: '입금',
  card: '신용카드',
  phone: '핸드폰',
  trans: '계좌이체',
};

const statuses = {
  waitingDeposit: '입금대기',
  approved: '승인',
  rejected: '관리자거부',
  userCanceled: '유저취소',
  adminDeleted: '관리자삭제',
};

export class PurchaseLogScreen extends Component {
  constructor(props) {
    super(props);
    this.handleStatusChangeClick = this.handleStatusChangeClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }
  componentWillMount() {
    const route = this.props.pathname.split('/')[1];
    const id = this.props.pathname.split('/')[2];
    if (route === 'purchaseLog' && id) this.props.getPurchaseLog(id);
    const scroll = Scroll.animateScroll;
    scroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
  }
  handleStatusChangeClick(method) {
    const { purchaseLog } = this.props;
    this.props.putPurchaseLogWithMethod({ uid: purchaseLog.uid, method }, () => this.props.getPurchaseLog(purchaseLog.uid));
  }
  handleFormSubmit(values) {
    const updateForm = {
      status: values.status,
      note: values.note,
    };
    this.props.putPurchaseLog({ uid: values.id, updateForm });
  }
  handlePhotoClick() {
    const { user } = this.props.purchaseLog;
    if (user.photoUrl) this.props.openModal({ type: 'photo', object: user });
  }
  handleUserClick(user) {
    this.props.setUser(user, () => this.props.pushRoute(`/user/${user.uid}`));
  }
  renderContent() {
    return (
      <div className="card-container">
        <div className="card-header">구매 상세 정보</div>
        <div className="card-body">
          <div className="card-row">
            <Field name="purchasedItem" label="상품명" extraClassName="" component={renderField} />
            <Field name="status" label="상태" selectOptions={statuses} component={renderField} />
            <Field name="type" label="종류" selectOptions={types} component={renderField} />
          </div>
          <div className="card-row">
            <Field name="price" label="가격" component={renderField} />
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
    const { purchaseLog, handleSubmit, pristine, reset, submitting } = this.props;
    const formFooterProps = { handleFormSubmit: this.handleFormSubmit, handleSubmit, pristine, reset, submitting };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: 15, marginBottom: 90 }}>
        <UserProfileHeader user={purchaseLog.user} onUserClick={this.handleUserClick} onPhotoClick={this.handlePhotoClick} />
        {purchaseLog.status === 'waitingDeposit' && <div style={{ textAlign: 'center' }}>
          <button onClick={() => this.handleStatusChangeClick('approve')}>입금확인</button>
        </div>}
        {this.renderContent()}
        <FormFooter {...formFooterProps} />
      </div>
    );
  }
}

PurchaseLogScreen = reduxForm({
  form: 'purchaseLogForm',
})(PurchaseLogScreen);

export default connect(state => ({
  pathname: state.router.location.pathname,
  purchaseLog: state.purchaseLogs.item,
  enableReinitialize: true,
  initialValues: objectFormatter(state.purchaseLogs.item),
}), actions)(PurchaseLogScreen);
