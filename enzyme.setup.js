/* eslint implicit-dependencies/no-implicit: [2, { dev: true }] */

const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });
