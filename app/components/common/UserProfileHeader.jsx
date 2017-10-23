import React from 'react';
import { photoSizeUrl, ageFrom, numberWithCommas } from 'formatHelper';

const statuses = {
  subscribed: '정회원',
  free: '일반회원',
  normal: '정상',
  banned: '차단',
  deregistered: '탈퇴',
  adminDeleted: '관리자삭제',
};

const RenderGenderIcon = (value) => {
  const genderIcon = value === 'female' ? require('ic_female.png') : require('ic_male.png');
  return (
    <img alt={value} src={genderIcon} style={{ width: 20, height: 20, objectFit: 'contain' }} />
  );
};

export const UserProfileHeader = (props) => {
  const { user } = props;
  if (!user) return <div />;
  console.log('user', user);
  const profilePhoto = photoSizeUrl(user.photoUrl, '-m') || require('img_profile_placeholder.png');

  return (
    <div className="user-container">
      <button onClick={() => props.onPhotoClick(user)} className="no-design" style={{ height: 140, width: 140, margin: 0, padding: 0 }}>
        <img className="user-profile" src={profilePhoto} alt="profile" />
      </button>
      <div className="user-content-container">
        <div className="user-content-row" style={{ alignItems: 'flex-start' }}>
          <div className="user-content-column" style={{ flex: 1, alignItems: 'flex-start' }}>
            <div className="user-content-row">
              <div className="user-nickname">{user.nickname}</div>
              <div className="user-email">{user.email}</div>
              <div className={`user-status ${user.status}`}>{statuses[user.status]}</div>
            </div>
            <div className="user-content-row">
              {RenderGenderIcon(user.gender)}
              <div className="user-age">{ageFrom(user.birthday)}세</div>
            </div>
          </div>
          {/*<div className="user-content-row">
            <div className="user-value-container" style={{ marginRight: 15 }}>
              <div className="user-value-content">{numberWithCommas(user.point)}</div>
              <div className="user-value-label">Point</div>
            </div>
            <div className="user-value-container">
              <div className="user-value-content">{numberWithCommas(user.cash)}</div>
              <div className="user-value-label">Cash</div>
            </div>
          </div>*/}
        </div>
        <div className="user-content-row" style={{ justifyContent: 'flex-end' }}>
          <button className="no-design" onClick={() => props.onUserClick(user)}>
            <img alt="forward" src={require('ic_forward_circle_filled_gray.png')} style={{ width: 34, height: 34, objectFit: 'contain' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
