import React from 'react';

const RenderField = ({ title, value }) => (
  <div className="section">
    <div className="title">{title}</div>
    <div className="content">{value}</div>
  </div>
);

const UserProfile = ({ user, onClick }) => {
  if (!user) return <div />;
  return (
    <div className="user-profile">
      <button onClick={() => onClick(user)}>
        <div><img src={user.photoUrl} alt="프로필 사진" /></div>
        <RenderField title="ID" value={user.id} />
        <RenderField title="앱" value={user.app} />
        <RenderField title="상태" value={user.status} />
        <RenderField title="이메일" value={user.email} />
        <RenderField title="이름" value={user.name} />
        <RenderField title="닉네임" value={user.nickname} />
        <RenderField title="성별" value={user.gender === 'male' ? '남성' : '여성'} />
        <RenderField title="생년월일" value={user.birthday} />
        <RenderField title="대화주제" value={user.comment} />
        <RenderField title="포인트" value={user.point} />
        <RenderField title="캐시" value={user.cash} />
        <RenderField title="가입일" value={user.createdAt} />
        <RenderField title="프로필수정일" value={user.profileUpdatedAt} />
      </button>
    </div>
  );
};

export default UserProfile;
