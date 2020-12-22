const { Worker } = require('worker_threads');

module.exports = (before, after, options) => {
  if (!before && after) {
    return { added: [], removed: [] };
  }
  return new Promise((resolve, reject) => {
    const worker = new Worker(require.resolve('./worker'), {
      workerData: { before, after, ...options }
    });
    let value = { added: [], removed: [] };
    worker.on('message', msg => {
      value = msg;
    });
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code === 0) {
        resolve(value);
      }
      reject(new Error(`Diff worker exited with code: ${code}`));
    });

    setTimeout(() => {
      worker.terminate();
      resolve(value);
    }, 5000);
  });
};
