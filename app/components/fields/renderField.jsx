import React from 'react';
import { photoSizeUrl } from 'formatHelper';

const disabledFields = ['id', 'createdAt', 'updatedAt', 'deletedAt', 'point', 'cash', 'totalPoint', 'totalCash', 'purchasedItem', 'price', 'type', 'duration', 'endedAt', 'startedAt', 'canceledAt', 'acceptedAt', 'declinedAt', 'lastActivityAt'];

export const renderField = ({ disabled, input, type, label, photoUrl, selectOptions, onPhotoClick, meta: { touched, error }, inputStyle, containerStyle, labelStyle, contentStyle, placeholder }) => {
  switch (input.name) {
    case 'category': case 'status': case 'type': case 'gender': case 'isOnline': case 'isChatting': case 'isLoggedIn':
      return (
        <div className={`form-group ${input.name}`} key={input.name} style={containerStyle || {}}>
          {label && <div className={`form-label ${input.name}`}>{label}</div>}
          <div className={`form-content ${input.name}`}>
            <select {...input} style={inputStyle || {}} disabled={disabledFields.filter(field => field === input.name).length > 0 || disabled}>
              {Object.entries(selectOptions).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </select>
          </div>
        </div>
      );
    // case 'isOnline': case 'isChatting':
    //   return (
    //     <div className={`form-group ${input.name}`} key={input.name} style={containerStyle || {}}>
    //       <div className={`form-label ${input.name}`}>{label}</div>
    //       <div className={`form-content ${input.name}`}>
    //         <select {...input} style={inputStyle || {}} disabled={disabledFields.filter(field => field === input.name).length > 0}>
    //           {Object.entries(selectOptions).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
    //         </select>
    //       </div>
    //     </div>
    //   );
    case 'content':
      return (
        <div className={`form-group ${input.name}`} key={input.name} style={containerStyle || {}}>
          {label && <div className="form-label">{label}</div>}
          <div className={`form-content ${input.name}`} style={contentStyle || {}}>
            <textarea {...input} className="content" style={inputStyle || {}} disabled={disabled} />
          </div>
        </div>
      );
    default:
      return (
        <div className={`form-group ${input.name}`} key={input.name} style={containerStyle || {}}>
          <div className={`form-label ${input.name}`}>{label}</div>
          <div className={`form-content ${input.name}`}>
            {(input.name === 'photoUrl' && input.value) && <button className="no-design" style={{ height: 50, width: 50, margin: 0, padding: 0 }} onClick={() => onPhotoClick(photoUrl)}><img src={photoSizeUrl(photoUrl, '-m')} alt="포토" style={{ width: 50, height: 50, objectFit: 'contain', borderRadius: 4 }} /></button>}
            <input className={input.name} style={inputStyle || {}} {...input} type={type || 'text'} disabled={disabledFields.filter(field => field === input.name).length > 0 || disabled} placeholder={placeholder} />
          </div>
        </div>
      );

  }
};
