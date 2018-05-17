require('babel-register')({
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
