import React from 'react';

export const FormFooter = (props) => {
  const { handleSubmit, pristine, reset, submitting, handleFormSubmit } = props;
  return (
    <div className="form-footer">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="buttons">
          <button type="submit" className="button main-button" disabled={pristine || submitting}>저장</button>
          <button type="button" className="button main-button reset" disabled={pristine || submitting} onClick={reset}>리셋</button>
        </div>
      </form>
    </div>
  );
};

export default FormFooter;
