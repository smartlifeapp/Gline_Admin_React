import {
  TOGGLE_MENU,
  TOGGLE_FILTER,
  UNAUTH_ADMIN,
  START_LOADING,
  STOP_LOADING,
} from 'actionTypes';


const extraHeaderTitles = [{
  route: '/admin/',
  menu: '기본관리',
  subMenu: '관리자상세',
}, {
  route: '/adminMessage/',
  menu: '기본관리',
  subMenu: '메시지관리',
}, {
  route: '/cashLog/',
  menu: '포인트&캐시관리',
  subMenu: '캐시상세',
}, {
  route: '/cashoutRequest/',
  menu: '포인트&캐시관리',
  subMenu: '환급상세',
}, {
  route: '/accommodation/',
  menu: '게시물관리',
  subMenu: '숙소상세',
}, {
  route: '/restaurant/',
  menu: '게시물관리',
  subMenu: '음식점상세',
}, {
  route: '/comment/',
  menu: '게시물관리',
  subMenu: '댓글상세',
}, {
  route: '/review/',
  menu: '게시물관리',
  subMenu: '여행후기상세',
}, {
  route: '/pointLog/',
  menu: '포인트&캐시관리',
  subMenu: '포인트상세',
}, {
  route: '/purchaseLog/',
  menu: '포인트&캐시관리',
  subMenu: '구매상세',
}, {
  route: '/talk/',
  menu: '게시물관리',
  subMenu: '토크상세',
}, {
  route: '/user/',
  menu: '회원관리',
  subMenu: '회원상세',
}, {
  route: '/userUpdateLog/',
  menu: '회원관리',
  subMenu: '회원변경 히스토리 상세',
}, {
  route: '/mission/',
  menu: '방관리',
  subMenu: '힌트방 상세',
}, {
  route: '/discussion/',
  menu: '방관리',
  subMenu: '토론방 상세',
}, {
  route: '/confirmShot/',
  menu: '방관리',
  subMenu: '인증샷 상세',
}, {
  route: '/teamplay/',
  menu: '방관리',
  subMenu: '팀플레이 상세',
}];

const menuSections = [{
  title: '기본관리',
  icon: 'account_balance',
  items: [{
    title: '관리자관리',
    linkTo: '/admins',
  }, {
    title: '금지어관리',
    linkTo: '/bannedWords',
  }],
}, {
  title: '결제관리',
  icon: 'attach_money',
  items: [{
    title: '구매내역',
    linkTo: '/purchaseLogs',
  }],
}, {
  title: '회원관리',
  icon: 'supervisor_account',
  items: [{
    title: '회원목록',
    linkTo: '/users',
  }, {
    title: '신고목록',
    linkTo: '/reports',
  }],
}, {
  title: '방관리',
  icon: 'chat',
  items: [{
    title: '파인드볼 설정',
    linkTo: '/findballSettings',
  }, {
    title: '힌트방',
    linkTo: '/missions',
  }, {
    title: '토론방',
    linkTo: '/discussions',
  }, {
    title: '인증샷',
    linkTo: '/confirmShot/c1879193f8fe4a44af0dc06b713305ad',
  }, {
    title: '팀플레이',
    linkTo: '/teamplays',
  }],
}, {
  title: '게시물관리',
  icon: 'photo_camera',
  items: [{
    title: '가이드라인 이야기',
    linkTo: '/storys',
  }, {
    title: '숙박',
    linkTo: '/accommodations',
  }, {
    title: '여행후기',
    linkTo: '/reviews',
  }, {
    title: '댓글',
    linkTo: '/comments',
 }, {
   title: '설정',
   linkTo: '/settings',
 }],
}];
// , {
//   title: '이벤트 설정',
//   linkTo: '/eventSettings',
// }
// , {
//   title: '메시지관리',
//   linkTo: '/adminMessages',
// }, {
//   title: '설정',
//   linkTo: '/settings',
// }

export const metaReducer = (state, action) => {
  const initialValues = {
    isLoading: false,
    isMenuVisible: window.innerWidth >= 768,
    isModalSubmitted: false,
    isFilterVisible: window.innerWidth >= 768,
    nav: { menuSections, extraHeaderTitles },
  };
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case TOGGLE_MENU:
      return { ...state, isMenuVisible: !state.isMenuVisible };
    case TOGGLE_FILTER:
      return { ...state, isFilterVisible: !state.isFilterVisible };
    case UNAUTH_ADMIN:
      return initialValues;
    default:
      return state || initialValues;
  }
};
