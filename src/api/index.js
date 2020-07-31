import axios from 'axios';
const ACCESS_TOKEN = '20f07f91f3303b2f66ab6f61698d977d69b83d64';

const picseeRequest = axios.create({ baseURL: `https://api.pics.ee/v1/links` });

export const apiGetUrl = data =>
  picseeRequest.post(
    `?access_token=${ACCESS_TOKEN}&caller=client-simple&lang=zh-tw`,
    data
  );

export const apiUpdateUrl = ({ currentEncodeld, newEncodeld }) =>
  picseeRequest.post(
    `/${currentEncodeld}/encodeld/?access_token=${ACCESS_TOKEN}&caller=client-simple&lang=zh-tw`,
    { value: newEncodeld }
  );
