export const userUpdateForm = (user) => {
  const updateValues = {
    status: user.status,
    email: user.email,
    name: user.name,
    nickname: user.nickname,
    birthday: user.birthday,
    gender: user.gender,
    phoneNumber: user.phoneNumber,
    comment: user.comment,
    photoUrl: user.photoUrl,
    latitude: user.latitude,
    longitude: user.longitude,
    ipAddress: user.ipAddress,
    loginCount: user.loginCount,
    clickCount: user.clickCount,
    isChatting: user.isChatting === 'true',
    isLoggedIn: user.isLoggedIn === 'true',
    createdAt: user.createdAt,
    profileUpdatedAt: user.profileUpdatedAt,
    passwordUpdatedAt: user.passwordUpdatedAt,
    deletedAt: user.deletedAt,
    lastLoggedInAt: user.lastLoggedInAt,
    bannedUntil: user.bannedUntil,
    bannedReason: user.bannedReason,
  };
  return updateValues;
};
