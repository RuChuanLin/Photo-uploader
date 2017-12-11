export default class Photo {
  constructor({ id, type, thumbnail, dataURL }) {
    this.id = id;
    this.type = type;
    this.thumbnail = thumbnail;
    this.dataURL = dataURL;
    if (this.dataURL) {
      this.getHW();
    }
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

  getHW() {
    const self = this;
    const i = new Image();
    i.src = this.dataURL;
    i.onload = function() {
      self.width = i.width;
      self.height = i.height;
    };
  }
}
