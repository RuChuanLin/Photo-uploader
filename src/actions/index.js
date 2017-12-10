import { UPLOAD_PHOTO, UPDATE_PHOTO, SAVE_PHOTO, FETCH_PHOTO } from './types';
import axios from 'axios';
import resizebase64 from 'resize-base64';

import Photo from '../model/Photo';

export const uploadPhoto = photoURL => async dispatch => {
  const res = await axios.get(photoURL, {
    responseType: 'arraybuffer',
    crossdomain: true
  });
  const id = Math.random()
    .toString(36)
    .slice(-12);
  let type = res.headers['content-type'].split(';')[0];
  type = type.split('/')[1];
  dispatch({
    type: UPLOAD_PHOTO,
    payload: new Photo({
      id,
      type,
      dataURL: `data:image/${type};base64,${new Buffer(
        res.data,
        'binary'
      ).toString('base64')}`
    })
  });
};

export const updatePhoto = dataObj => {
  return {
    type: UPDATE_PHOTO,
    payload: dataObj
  };
};

export const postPhoto = photoObj => async dispatch => {
  const thumbnail = resizebase64(photoObj.getPhotoDataURL(), 50, 25);
  photoObj.setThumbnail(thumbnail);
  const res = await axios.post(`http://localhost:3003/photoes`, photoObj);
};

export const fetchPhoto = (id, type) => async dispatch => {
  const res = await axios.get(
    `http://localhost:3003/fetchPhoto?id=${id}&type=${type}`
  );
  const newPhoto = new Photo({
    id,
    type,
    dataURL: `data:image/${type};base64,${res.data}`
  });
  console.log(newPhoto);
  dispatch({
    type: FETCH_PHOTO,
    payload: newPhoto
  });
};
