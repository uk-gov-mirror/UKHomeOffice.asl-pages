require('babel-register')({
  ignore: false,
  extensions: ['.jsx'],
  presets: [
    'react',
    [
      'env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: 'transform-object-rest-spread'
});
