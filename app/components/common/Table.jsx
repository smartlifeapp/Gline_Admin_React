import React from 'react';
import { ageFrom, dateFormatter, numberWithCommas, photoSizeUrl } from 'formatHelper';

export const appIconImages = {
  '라이브 설레임愛': require('app_icon_seolleim.png'),
  설레임: require('app_icon_seolleim.png'),
  DEV: require('app_icon_seolleim.png'),
  하이러브: require('app_icon_hilove.png'),
  손대면톡: require('app_icon_sondaemyeon.png'),
  썸라이브: require('app_icon_somelive.png'),
};

const convertibleFields = ['status', 'type', 'purchasedItem'];
const convertibleValues = {
  inApp: '인앱결제',
  deposit: '무통장입금',
  phone: '핸드폰',
  card: '신용카드',
  listed: '정상',
  unlisted: '숨김',
  active: '정상',
  inactive: '숨김',
  adminDeleted: '관리자삭제',
  autoDeleted: '자동삭제',
  userDeleted: '유저삭제',
  userCanceled: '유저취소',
  rejected: '관리자거부',
  waitingDeposit: '입금대기',
  approved: '승인',
  pointGiven: '지급완료',
  male: '남성',
  female: '여성',
  dealt: '처리완료',
  undealt: '처리대기',
  requested: '신청',
  canceled: '신청취소',
  accepted: '수락',
  declined: '거부',
  inChat: '채팅중',
  ended: '채팅종료',
  normal: '정상',
  banned: '차단',
  deregistered: '탈퇴',
  '1month': '1개월',
  '3months': '3개월',
  '4months': '4개월',
  '5months': '5개월',
  '6months': '6개월',
  '1monthWithPosting': '1개월+등록',
  '3monthsWithPosting': '3개월+등록',
  '4monthsWithPosting': '4개월+등록',
  '5monthsWithPosting': '5개월+등록',
  '6monthsWithPosting': '6개월+등록',
  posting: '등록권',
};
const convertValue = (field, originalValue) => {
  if (convertibleFields.indexOf(field) === -1) return originalValue;
  const convertedValue = Object.entries(convertibleValues).filter(obj => obj[0] === originalValue);
  return convertedValue[0] ? convertedValue[0][1] : originalValue;
};
const isBoolean = key => ['isLoggedIn', 'isOnline', 'isChatting'].indexOf(key) !== -1;
const isApp = key => key === 'app';
const isOs = key => key === 'platform';
const isGender = key => key.includes('gender');
const isNested = key => key.includes('.');
const isImage = key => key.toLowerCase().includes('photourl');
const isDate = key => key.includes('At') || key.includes('Until');
const isNumber = key => ['point', 'cash', 'totalPoint', 'totalCash', 'money', 'price'].indexOf(key) !== -1;
const isAge = key => key === 'birthday';

const renderValue = (origKey, key, value) => {
  if (isImage(key)) return RenderImage(origKey, key, value);
  if (isDate(key)) return RenderDate(origKey, key, value);
  if (isAge(key)) return RenderAge(origKey, key, value);
  if (isNumber(key)) return RenderNumber(origKey, key, value);
  if (isGender(key)) return RenderGenderIcon(origKey, key, value);
  if (isOs(key)) return RenderOsIcon(origKey, key, value);
  if (isApp(key)) return RenderAppIcon(origKey, key, value);
  if (isBoolean(key)) return RenderBoolean(origKey, key, value);
  return Text(origKey, key, value);
};
const RenderBoolean = (origKey, key, value) => <td className={origKey} key={key}>{value ? '✓' : ''}</td>;
const RenderImage = (origKey, key, url) => {
  if (!url) return <td className={origKey} key={key} />;
  return <td className={key} key={origKey}><img src={photoSizeUrl(url, '-xs')} alt="사진" style={{ width: 30, height: 30, objectFit: 'cover' }} /></td>;
};
const Text = (origKey, key, value) => <td className={`${key} ${key === 'status' ? value : ''}`} key={origKey}>{convertValue(key, value)}</td>;
const RenderNumber = (origKey, key, value) => <td className={key} key={origKey}>{numberWithCommas(value)}</td>;
const RenderDate = (origKey, key, value) => <td className={key} key={origKey}>{dateFormatter(value, 'YYYY-MM-DD HH:MM:SS')}</td>;
const RenderAge = (origKey, key, value) => <td className={key} key={origKey}>{ageFrom(value)}세</td>;
const RenderGenderIcon = (origKey, key, value) => {
  const genderIcon = value === 'female' ? require('ic_female.png') : require('ic_male.png');
  return (
    <td className={key} key={origKey}>
      <img alt={value} src={genderIcon} style={{ width: 'auto', height: 14 }} />
    </td>
  );
};
const RenderOsIcon = (origKey, key, value) => {
  const osIcon = value === 'ios' ? require('ic_ios_text_logo.png') : require('ic_android_text_logo.png');
  return (
    <td className={key} key={origKey}>
      <img alt={value} src={osIcon} style={{ height: 12, width: 'auto' }} />
    </td>
  );
};
const RenderAppIcon = (origKey, key, value) => {
  const appIcon = appIconImages[value];
  return (
    <td className={key} key={origKey}>
      <img alt={value} src={appIcon} style={{ width: 20, height: 20, objectFit: 'contain' }} />
    </td>
  );
};

const BodyRows = ({ item, keys, onItemClick }) => (
  <tr onClick={() => onItemClick(item)}>
    {keys.map((key) => {
      if (isNested(key)) {
        const nestedKey = key.split('.')[1];
        const nestedValue = item[key.split('.')[0]][key.split('.')[1]];
        return renderValue(key, nestedKey, nestedValue);
      }
      return renderValue(key, key, item[key]);
    })}
  </tr>
);

const orderIcon = (index, itemKeys, itemsMeta) => {
  if (itemKeys[index] === itemsMeta.orderBy) {
    return (itemsMeta.orderDirection === 'DESC') ? <i className="material-icons">keyboard_arrow_down</i> : <i className="material-icons">keyboard_arrow_up</i>;
  }
  return <div />;
};

const Table = (props) => {
  const { items, itemsMeta, onHeadClick, onItemClick } = props;
  const titles = ['NO'].concat(props.titles);
  const itemKeys = ['no'].concat(props.itemKeys);
  if (!items || items.length === 0) return <div />;
  return (
    <table>
      <thead>
        <tr>
          {titles.map((title, index) => (<th className={itemKeys[index]} key={title} onClick={() => index === 0 ? {} : onHeadClick(itemsMeta, itemKeys[index])}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {title}
              {orderIcon(index, itemKeys, itemsMeta)}
            </div>
          </th>))}
        </tr>
      </thead>
      <tbody>
        {items.map((itemOriginal, index) => {
          const { itemCount, page, limit } = itemsMeta;
          const offset = (page - 1) * limit;
          const item = Object.assign({}, itemOriginal, { no: (itemCount - offset) - index });
          return <BodyRows key={item.id} item={item} keys={itemKeys} onItemClick={onItemClick} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
