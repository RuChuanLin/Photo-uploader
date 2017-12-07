import { UPLOAD_PHOTO, UPDATE_PHOTO } from './types';
import axios from 'axios';

export const uploadPhoto = photoURL => async dispatch => {
  const res = await axios.get(photoURL, {
    responseType: 'arraybuffer',
    crossdomain: true
  });
  dispatch({
    type: UPLOAD_PHOTO,
    payload: `data:image/jpeg;base64,${new Buffer(res.data, 'binary').toString(
      'base64'
    )}`
  });
};

export const updatePhoto = dataURL => dispatch => {
  dispatch({
    type: UPDATE_PHOTO,
    payload: dataURL
  });
};
