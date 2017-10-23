// 3rd apis
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import Scroll from 'react-scroll';
// view
import { renderField } from 'renderField';
import { FormFooter, UserProfileHeader } from 'CommonComponents';
// actions
import actions from 'actions';
// helpers
import { objectFormatter } from 'formatHelper';

const statuses = {
  listed: '정상',
  adminDeleted: '관리자삭제',
};

export class CashLog extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }
  componentWillMount() {
    const route = this.props.router.location.pathname.split('/')[1];
    const id = this.props.router.location.pathname.split('/')[2];
    if (route === 'cashLog' && id) this.props.getCashLog(id);
    const scroll = Scroll.animateScroll;
    scroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
  }
  handleFormSubmit(values) {
    const updateValues = {
      status: values.status,
      reason: values.reason,
      note: values.note,
    };
    this.props.updateCashLog(values.id, updateValues);
  }
  handlePhotoClick() {
    const { user } = this.props.cashLog;
    if (user.photoUrl) this.props.openModal({ type: 'photo', object: user });
  }
  handleUserClick(user) {
    this.props.setUser(user);
    this.props.dispatch(push(`/user/${user.id}`));
  }
  renderContent() {
    return (
      <div className="card-container">
        <div className="card-header">캐시 상세 정보</div>
        <div className="card-body">
          <div className="card-row">
            <Field name="status" label="상태" selectOptions={statuses} component={renderField} />
            <Field name="reason" label="변동이유" component={renderField} />
            <Field name="cash" label="변동캐시" component={renderField} />
            <Field name="totalCash" label="전체캐시" component={renderField} />
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
    if (!this.props.cashLog.id) return <div />;
    const { cashLog, handleSubmit, pristine, reset, submitting } = this.props;
    const formFooterProps = { handleFormSubmit: this.handleFormSubmit, handleSubmit, pristine, reset, submitting };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: 15, marginBottom: 90 }}>
        <UserProfileHeader user={cashLog.user} onUserClick={this.handleUserClick} onPhotoClick={this.handlePhotoClick} />
        {this.renderContent()}
        <FormFooter {...formFooterProps} />
      </div>
    );
  }
}

CashLog = reduxForm({
  form: 'cashLogForm',
})(CashLog);

export default connect(state => ({
  router: state.router,
  cashLog: state.cashLogs.item,
  enableReinitialize: true,
  initialValues: objectFormatter(state.cashLogs.item),
}), actions)(CashLog);
