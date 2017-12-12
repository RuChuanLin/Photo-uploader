const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const images = require('images');
const app = new (require('express'))();
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3003;
const compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json({ limit: '1mb' }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/photoes', (req, res) => {
  const { photoObj: { id, type, dataURL, thumbnail }, isNewPhoto } = req.body;
  const base64Data = dataURL.replace(`data:image/${type};base64,`, '');

  require('fs').writeFile(
    path.join(__dirname, './assets', `${id}.${type}`),
    base64Data,
    'base64',
    function(err) {
      if (err) {
        console.log(err);
        return;
      }
    }
  );

  if (isNewPhoto) {
    axios.post(`http://localhost:3000/photoes`, {
      id,
      type,
      thumbnail
    });
  } else {
    axios.patch(`http://localhost:3000/photoes/${id}`, {
      id,
      type,
      thumbnail
    });
  }

  axios.get(`http://localhost:3000/photoes`).then(photoList => {
    // 解circular reference
    let cache = [];
    let obj = JSON.stringify(photoList, function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null;
    res.send(obj);
  });
});

app.get('/fetchPhoto', (req, res) => {
  let { id, type, height, width } = req.query;
  const filename = `${id}.${type}`;
  console.log(height, width);

  if (height === '' || typeof +height !== 'number') {
    height = 0;
  }
  if (height === '' || typeof +width !== 'number') {
    width = 0;
  }
  height = +height;
  width = +width;
  if (width === 0 && height === 0) {
    res.send(
      new Buffer(
        require('fs').readFileSync(path.join(__dirname, './assets', filename)),
        'binary'
      ).toString('base64')
    );
    return;
  } else {
    const img = images(path.join(__dirname, './assets', filename));
    console.log(img.width, img.height);
    const imgRatio = img.height / img.width;
    if (height) {
      if (!width) {
        width = height / imgRatio;
      }
    } else {
      height = width * imgRatio;
    }
    console.log(width, height);
    res.send(
      img
        .resize(width, height)
        .encode(type, { operation: 50 })
        .toString('base64')
    );
  }

  // const extension = type.split('/')[1];
  // const base64Data = dataURL.replace(`data:${type};base64,`, '');

  // require('fs').writeFile(
  //   path.join(__dirname, './assets', `${id}.${extension}`),
  //   base64Data,
  //   'base64',
  //   function(err) {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //   }
  // );
  // axios
  //   .post(`http://localhost:3000/photoes`, {
  //     id,
  //     type,
  //     thumbnail
  //   })
  //   .then(res => {
  //     console.log(res);
  //   });
});

app.listen(port, function(err) {
  if (err) {
    console.error(error);
  } else {
    console.log(`Listening on port ${port}, go visit http://localhost:${port}`);
  }
});
