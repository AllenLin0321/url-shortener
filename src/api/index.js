import axios from 'axios';
const ACCESS_TOKEN =
  process.env.REACT_APP_PICSEE_TOKEN ||
  '20f07f91f3303b2f66ab6f61698d977d69b83d64';
const picseeRequest = axios.create({ baseURL: `https://api.pics.ee/v1/links` });

export const apiGetUrl = data =>
  picseeRequest.post(
    `?access_token=${ACCESS_TOKEN}&caller=client-simple&lang=zh-tw`,
    data
  );

export const apiUpdateUrl = ({ currentEncodeId, newEncodeId }) =>
  picseeRequest.post(
    `/${currentEncodeId}/encodeld/?access_token=${ACCESS_TOKEN}&caller=client-simple&lang=zh-tw`,
    { value: newEncodeId }
  );

export const apiDeleteUrl = encodeId => {
  picseeRequest.delete(
    `https://api.pics.ee/v1/links/${encodeId}/disable?access_token=${ACCESS_TOKEN}`
  );
};
