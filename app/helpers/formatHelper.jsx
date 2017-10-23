export function numberWithCommas(x) {
  if (!x) return '0';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const isFirstChatForDay = (prevDateString, currentDateString) => {
  if (!prevDateString) return true;
  return prevDateString.slice(0, 10) !== currentDateString.slice(0, 10);
};

export function photoSizeUrl(url, size) {
  if (!url) return null;
  // bypass pre-uploaded images;
  if (url.match(/\/images\/.+[0-9]{3,4}x[0-9]{3,4}\.[jpeng]{3,4}/)) return url;
  if (url.match(/images\/2016\/01\/01/)) return url;
  if (url.includes('.gif')) return url;
  if (!url.includes('http')) return url;
  if (url.includes('.jpg')) {
    return url.replace('.jpg', `${size}.jpg`);
  } else if (url.includes('.jpeg')) {
    return url.replace('.jpeg', `${size}.jpg`);
  } else if (url.includes('.png')) {
    return url.replace('.png', `${size}.jpg`);
  }
  return url;
}

export function objectFormatter(origObj) {
  const isDate = (key, value) => (key.includes('At') || key.includes('Until')) && value;
  const isBoolean = key => ['isOnline', 'isChatting', 'isLoggedIn'].indexOf(key) !== -1;
  const isPurchasedItem = key => key === 'purchasedItem';
  const obj = Object.assign({}, origObj);
  Object.entries(obj).forEach(([key, value]) => {
    if (isDate(key, value)) {
      obj[key] = dateFormatter(new Date(obj[key]), 'YYYY-MM-DD HH:MM:SS');
    } else if (isBoolean(key)) {
      obj[key] = value ? 'Y' : 'N';
    } else if (isPurchasedItem(key)) {
      obj[key] = {
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
      }[value];
    }
  });
  return obj;
}

export function dateFormatter(inputDate, format) {
  if (!inputDate) return '';
  function toDateCompString(intValue) {
    if (intValue >= 10) return intValue.toString();
    return `0${intValue}`;
  }
  // const sourceDate = typeof inputDate.getMonth === 'function' ? inputDate : new Date(inputDate);
  const sourceDate = new Date(inputDate);
  const fullYear = sourceDate.getFullYear();
  const year = `${fullYear}`.slice(2);
  const month = toDateCompString(sourceDate.getMonth() + 1);
  const date = toDateCompString(sourceDate.getDate());
  const hours = toDateCompString(sourceDate.getHours());
  const minutes = toDateCompString(sourceDate.getMinutes());
  const seconds = toDateCompString(sourceDate.getSeconds());
  const day = sourceDate.getDay();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  switch (format) {
    case 'YYYY년 MM월 DD일 E요일':
      return `${fullYear}년 ${month}월 ${date}일 ${days[day]}요일`;
    case 'YY-MM-DD HH:MM':
      return `${year}-${month}-${date} ${hours}:${minutes}`;
    case 'YY-MM-DD HH:MM:SS':
      return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    case 'YYYY-MM-DD HH:MM:SS':
      return `${fullYear}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    case 'HH:MM':
      return `${hours}:${minutes}`;
    default: // 'YYYY-MM-DD HH-MM-SS'
      return `${fullYear}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  }
}

export function ageFrom(userBirthday) {
  let birthYear = userBirthday.toString();
  birthYear = birthYear.slice(0, 4);
  birthYear = parseInt(birthYear, 10);
  const today = new Date();
  const thisYear = today.getFullYear();
  return (thisYear - birthYear) + 1;
}

// resize //
function resize(image, maxWidth, maxHeight, quality) {
  const canvas = document.createElement('canvas');
  let width = image.width;
  let height = image.height;
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', quality);
}

function b64toBlob(b64Data, pContentType, pSliceSize) {
  const contentType = pContentType || 'image/jpeg';
  const sliceSize = pSliceSize || 512;
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export function resizeImage(file, maxWidth, maxHeight, fn) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    const image = new Image();
    image.src = dataUrl;
    image.onload = () => {
      const resizedDataUrl = resize(image, maxWidth, maxHeight, 1.0);
      const block = resizedDataUrl.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      const resizedImage = b64toBlob(realData, contentType);
      fn({ resizedImage, width: image.width, height: image.height });
    };
  };
}
