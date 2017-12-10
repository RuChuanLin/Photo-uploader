export default class Photo {
  constructor({ id, type, thumbnail, dataURL }) {
    this.id = id;
    this.type = type;
    this.thumbnail = thumbnail;
    this.dataURL = dataURL;
  }
  getPhotoData() {
    return { id: this.id, type: this.type, thumbnail: this.thumbnail };
  }
  getPhotoDataURL() {
    return this.dataURL;
  }

  setThumbnail(thumbnail) {
    this.thumbnail = thumbnail;
  }
}
