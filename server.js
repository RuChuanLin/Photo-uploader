const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
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
  const { id, type, dataURL, thumbnail } = req.body;
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
  axios
    .post(`http://localhost:3000/photoes`, {
      id,
      type,
      thumbnail
    })
    .then(res => {
      console.log(res);
    });
});

app.get('/fetchPhoto', (req, res) => {
  const { id, type } = req.query;
  const filename = `${id}.${type}`;

  res.send(
    new Buffer(
      require('fs').readFileSync(path.join(__dirname, './assets', filename)),
      'binary'
    ).toString('base64')
  );
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
