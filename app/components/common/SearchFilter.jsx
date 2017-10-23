import React from 'react';
import { Field } from 'redux-form';
import * as dateUtils from 'dateUtils';

const comments = [
  '전체',
  '영상채팅 할래?',
  '지금 만날래?',
  '우리 친구할래?',
  '영화구경 할래?',
  '드라이브 할래?',
  '운동 같이할래?',
  '술 한잔할래?',
  '밥 같이 먹을래?',
  '우리 여행 갈래?',
  '심심해요~',
  '고민 있어요~',
  '애인 구해요~',
  '무엇이든 물어보세요~',
];

const renderField = ({ input, label, radioValue, placeholder, meta: { touched, error } }) => {
  switch (input.name) {
    case 'gender':
      return (
        <label htmlFor={input.name} style={{ display: 'flex', alignItems: 'center', paddingRight: 15 }}>
          <input {...input} type="radio" value={radioValue} checked={input.value === radioValue} />
          <div>{label}</div>
        </label>
      );
    case 'comment':
      return (
        <select className="form-content" {...input}>
          {comments.map(comment => <option key={comment} value={comment}>{comment}</option>)}
        </select>
      );
    case 'app': case 'targetApp':
      return (
        <select className="form-content" {...input}>
          <option value="all">전체</option>
          <option value="라이브 설레임愛">라이브 설레임愛</option>
          <option value="하이러브">하이러브</option>
          <option value="손대면톡">손대면톡</option>
          <option value="썸라이브">썸라이브</option>
        </select>
      );
    case 'userSearchType':
      return (
        <select className="form-content" {...input} style={{ marginRight: 5 }}>
          <option value="userId">유저ID</option>
          <option value="email">이메일</option>
          {/*<option value="name">이름</option>*/}
          <option value="nickname">닉네임</option>
          {/*<option value="phoneNumber">전화번호</option>*/}
        </select>
      );
    case 'userSearchWord':
      return (
        <input className="form-content" {...input} placeholder={label} type="text" />
      );
    case 'startDate': case 'endDate':
      return (
        <div className="form-content">
          <input {...input} placeholder={placeholder || label} type="text" className="date" />
          {touched && error && <span>{error}</span>}
        </div>
      );
    default:
      return (
        <div className="form-content">
          <input {...input} placeholder={placeholder || label} type="text" className={input.name} />
          {touched && error && <span>{error}</span>}
        </div>
      );
  }
};

const matchingFields = (meta, fields, dateLabel, convertDates) => {
  const calculatedFields = fields.map((field) => {
    switch (field) {
      case 'app':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">앱종류</div>
            <Field name="app" component={renderField} />
          </div>
        );
      case 'targetApp':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">받은앱종류</div>
            <Field name="targetApp" component={renderField} />
          </div>
        );
      case 'userSearch':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">검색어</div>
            <Field name="userSearchType" component={renderField} />
            <Field name="userSearchWord" component={renderField} type="text" label="검색어" className="" />
          </div>
        );
      case 'comment':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">대화주제</div>
            <Field name="comment" component={renderField} />
          </div>
        );
      case 'reason':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">변동이유</div>
            <Field name="reason" component={renderField} />
          </div>
        );
      case 'word':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">금지어</div>
            <Field name="word" component={renderField} />
          </div>
        );
      case 'nameAndTitle':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">상호명 & 제목</div>
            <Field name="nameAndTitle" component={renderField} />
          </div>
        );
      case 'title':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">제목</div>
            <Field name="title" component={renderField} />
          </div>
        );
      case 'content':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">내용</div>
            <Field name="content" component={renderField} />
          </div>
        );
      case 'gender':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">성별</div>
            <Field name="gender" component={renderField} label="전체" radioValue="all" />
            <Field name="gender" component={renderField} label="남성" radioValue="male" />
            <Field name="gender" component={renderField} label="여성" radioValue="female" />
          </div>
        );
      case 'date':
        return (
          <div className={`form-group ${field}`} key={field}>
            <div className="form-label">{dateLabel}</div>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Field name="startDate" component={renderField} placeholder="YYYY-MM-DD" />
                  <img alt="calendaricon" src={require('ic_calendar_lightgray.png')} style={{ width: 20, height: 20, margin: '0 3px 0 3px' }} />
                  <div style={{ margin: '0 10px 0 10px' }}>~</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Field name="endDate" component={renderField} placeholder="YYYY-MM-DD" />
                  <img alt="calendaricon" src={require('ic_calendar_lightgray.png')} style={{ width: 20, height: 20, margin: '0 3px 0 3px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <input className="small-button" type="button" value="전체" onClick={() => convertDates('all')} />
                <input className="small-button" type="button" value="오늘" onClick={() => convertDates(0)} />
                <input className="small-button" type="button" value="7일" onClick={() => convertDates(7)} />
                <input className="small-button" type="button" value="10일" onClick={() => convertDates(10)} />
                <input className="small-button" type="button" value="20일" onClick={() => convertDates(20)} />
              </div>
            </div>
          </div>
        );
      default:
        return <div key={field} />;
    }
  });

  if (calculatedFields.length === 0) return <div key="null" />;
  return calculatedFields;
};

const SearchFilter = ({ meta, fields, dateLabel, onSubmit, onReset, onSetDate, onRegister }) => {
  // let isRegister = false;
  const { handleSubmit, pristine, reset, submitting } = meta;
  const validateForm = (form) => {
    const { gender, nameAndTitle, userSearchType, userSearchWord, word, startDate, endDate } = form;
    const params = Object.assign({},
      userSearchType && userSearchType === 'userId' && userSearchWord && { userId: userSearchWord },
      userSearchType && userSearchType === 'email' && userSearchWord && { email: userSearchWord },
      userSearchType && userSearchType === 'nickname' && userSearchWord && { nickname: userSearchWord },
      nameAndTitle && { nameAndTitle },
      gender && { gender },
      word && { word },
      startDate && { startDate },
      endDate && { endDate },
    );
    return onSubmit(params);
  };
  const convertDates = (targetDate) => {
    if (targetDate === 'all') {
      return onSetDate('', '');
    }
    const today = new Date();
    const startDate = dateUtils.subtractDays(today, targetDate);
    return onSetDate(dateUtils.formatDate(startDate, 'YYYY-MM-DD'), dateUtils.formatDate(today, 'YYYY-MM-DD'));
  };
  const handleWordRegister = () => {
    if (meta.word.length > 0) {
      reset();
      onRegister(meta.word);
    }
  };
  const handleReset = () => {
    reset();
    onReset();
  };
  return (
    <div className="search-filter">
      {matchingFields(meta, fields, dateLabel, convertDates, handleSubmit(validateForm))}
      <form onSubmit={handleSubmit(validateForm)} className="form-submit">
        <button type="submit" disabled={submitting}>검색</button>
        {fields.indexOf('word') !== -1 ? <button type="button" disabled={pristine || submitting} onClick={() => handleWordRegister()}>등록</button> : <div />}
        <input type="button" className="secondary" onClick={() => handleReset()} value="리셋" />
      </form>
    </div>
  );
};

export default SearchFilter;
