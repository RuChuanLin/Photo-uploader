import {
  UPLOAD_PHOTO,
  UPDATE_PHOTO,
  SAVE_PHOTO,
  FETCH_PHOTO,
  UPLOAD_PHOTO_LOCALLY,
  MAKE_THUMBNAIL,
  INIT_PHOTOLIST,
  UPDATE_PHOTOLIST
} from './types';
import axios from 'axios';
import resizebase64 from 'resize-base64';

import Photo from '../model/Photo';

const generateId = () =>
  Math.random()
    .toString(36)
    .slice(-12);

export const uploadPhoto = photoURL => async dispatch => {
  const res = await axios.get(photoURL, {
    responseType: 'arraybuffer',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
  const id = generateId();
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

export const uploadPhotoLocally = ({ dataURL, type }) => dispatch => {
  const id = generateId();
  const photo = new Photo({ id, type, dataURL });
  dispatch({
    type: UPLOAD_PHOTO_LOCALLY,
    payload: photo
  });
};

export const updatePhoto = dataObj => {
  return {
    type: UPDATE_PHOTO,
    payload: dataObj
  };
};

export const makingThumbnail = photoObj => dispatch => {
  const thumbnail = resizebase64(photoObj.getPhotoDataURL(), 50, 25);
  photoObj.setThumbnail(thumbnail);
  dispatch({
    type: MAKE_THUMBNAIL,
    payload: new Photo({ ...photoObj, thumbnail })
  });
};

export const postPhoto = (photoObj, isNewPhoto) => async dispatch => {
  makingThumbnail(photoObj)(dispatch);
  const res = await axios.post(`http://localhost:3003/photoes`, {
    photoObj,
    isNewPhoto
  });
  dispatch({
    type: UPDATE_PHOTOLIST,
    payload: res.data.data
  });
};

export const fetchPhoto = (id, type, { height, width }) => async dispatch => {
  console.log(
    `http://localhost:3003/fetchPhoto?id=${id}&type=${type}&height=${height}&width=${width}`
  );
  const res = await axios.get(
    `http://localhost:3003/fetchPhoto?id=${id}&type=${type}&height=${height}&width=${width}`,
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  );
  console.log(res);
  const newPhoto = new Photo({
    id,
    type,
    dataURL: `data:image/${type};base64,${res.data}`
  });
  dispatch({
    type: FETCH_PHOTO,
    payload: newPhoto
  });
};

export const initPhotoList = () => async dispatch => {
  const res = await axios.get(`http://localhost:3000/photoes`, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  });
  dispatch({
    type: INIT_PHOTOLIST,
    payload: res.data
  });
};
