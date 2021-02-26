const compare = require('./compare');
const { parentPort, workerData } = require('worker_threads');

const { before, after, type } = workerData;

if (type === 'texteditor') {
  const sentences = compare(before, after, { type, granularity: 'sentence' });
  parentPort.postMessage({ ...sentences });
  const words = compare(before, after, { type, granularity: 'word' });
  parentPort.postMessage({ ...words });
} else {
  parentPort.postMessage(compare(before, after, { type }));
}
