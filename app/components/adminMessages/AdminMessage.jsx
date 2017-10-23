import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Scroll from 'react-scroll';
import actions from 'actions';
import NotificationModal from 'NotificationModal';
import { renderField } from 'renderField';

const statuses = {
  unsent: '발송대기',
  sent: '발송완료',
  eror: '오류발생',
};

export class AdminMessage extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }
  componentWillMount() {
    const id = this.props.router.location.pathname.split('/')[2];
    if (id) this.props.getAdminMessage(id);
    const scroll = Scroll.animateScroll;
    scroll.scrollToTop({ duration: 0, smooth: true, delay: 0 });
  }
  handleFormSubmit(values) {
    const updateValues = {
      status: values.status,
    };
    this.props.updateAdminMessage(values.id, updateValues);
  }
  handleModalClick() {
    this.props.dismissAdminMessagesModal();
  }
  render() {
    const { success, error, handleSubmit, pristine, reset, submitting } = this.props;
    const { adminMessage } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="content-container row">
            <Field name="sectionTitle" label="푸시메시지 상세" component={renderField} />
            <Field name="title" label="제목" extraClassName="" component={renderField} />
            <Field name="status" label="상태" selectOptions={statuses} extraClassName="medium-6 large-4" component={renderField} />
            <Field name="receiverCount" label="받은유저수" selectOptions={statuses} extraClassName="medium-6 large-4" component={renderField} />
            <Field name="createdAt" label="등록일" extraClassName="medium-6 large-4" component={renderField} />
            <Field name="updatedAt" label="수정일" extraClassName="medium-6 large-4" component={renderField} />
            <Field name="deletedAt" label="삭제일" extraClassName="medium-6 large-4" component={renderField} />
            <Field name="content" label="내용" extraClassName="" component={renderField} />
          </div>
          <fieldset className="form-footer">
            <div className="buttons">
              <button type="submit" className="button main-button" disabled={pristine || submitting}>저장</button>
              <button type="button" className="button main-button reset" disabled={pristine || submitting} onClick={reset}>리셋</button>
            </div>
          </fieldset>
        </form>
        <NotificationModal success={success} error={error} onModalClick={this.handleModalClick} />
      </div>
    );
  }
}

AdminMessage = reduxForm({
  form: 'adminMessageForm',
})(AdminMessage);

function mapStateToProps(state) {
  return {
    router: state.router,
    adminMessage: state.adminMessages.item,
    success: state.adminMessages.success,
    error: state.adminMessages.error,
    enableReinitialize: true,
    initialValues: state.adminMessages.item,
  };
}

AdminMessage = connect(mapStateToProps, actions)(AdminMessage);
export default AdminMessage;
