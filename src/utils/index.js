import { message } from 'antd';

export const onCopyUrl = url => {
  navigator.clipboard.writeText(url);
  message.success(`${url} copied 🎉`);
};

export const validURL = str => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};

export const getUrlEncodeId = url => {
  const picseeUrl = new URL(url);
  return picseeUrl.pathname.substring(1); //去斜線
};
