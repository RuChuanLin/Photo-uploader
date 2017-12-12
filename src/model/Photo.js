export default class Photo {
  constructor({ id, type, thumbnail, dataURL }) {
    this.id = id;
    this.type = type;
    this.thumbnail = thumbnail;
    this.dataURL = dataURL;
    this.height;
    this.width;
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
  setPhotoDataURL(dataURL) {
    this.dataURL = dataURL;
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
  setHW({ height, width }) {
    if (height === undefined && width === undefined) {
      return;
    } else if (height === undefined && width) {
      this.height = width / this.width * this.height;
      this.width = width;
    } else if (width === undefined && height) {
      this.width = height / this.height * this.width;
      this.height = height;
    } else {
      this.width = width;
      this.height = height;
    }
  }
}
