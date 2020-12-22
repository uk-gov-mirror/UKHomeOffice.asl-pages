const { parentPort, workerData } = require('worker_threads');

const { Value } = require('slate');
const { diffWords, diffSentences, diffArrays } = require('diff');
const last = require('lodash/last');

const parseValue = (val) => {
  if (typeof val === 'string') {
    val = JSON.parse(val || '{}');
  }
  return Value.fromJSON(val || {});
};

const diff = (a, b, { type, granularity }) => {

  let diff = [];
  let added = [];
  let removed = [];
  let before;
  let after;
  let diffs;

  switch (type) {
    case 'text':
      diff = diffWords(a || '', b || '');
      break;
    case 'checkbox':
    case 'location-selector':
    case 'objective-selector':
    case 'permissible-purpose':
    case 'species-selector':
      diff = diffArrays((a || []).sort(), (b || []).sort());
      break;
    case 'texteditor':

      try {
        before = parseValue(a);
        after = parseValue(b);
      } catch (e) {
        return { error: e, added: [], removed: [] };
      }

      if (granularity === 'word') {
        diffs = diffWords(before.document.text, after.document.text);
      } else {
        diffs = diffSentences(before.document.text, after.document.text);
      }

      removed = diffs.reduce((arr, d) => {
        // ignore additions
        if (!d.added) {
          const prev = last(arr);
          const start = prev ? prev.start + prev.count : 0;
          return [...arr, { ...d, start, count: d.value.length }];
        }
        return arr;
      }, []).filter(d => d.removed);

      added = diffs.reduce((arr, d) => {
        // ignore removals
        if (!d.removed) {
          const prev = last(arr);
          const start = prev ? prev.start + prev.count : 0;
          return [...arr, { ...d, start, count: d.value.length }];
        }
        return arr;
      }, []).filter(d => d.added);

      return { added, removed, granularity };
  }

  return {
    added: diff.filter(item => !item.removed),
    removed: diff.filter(item => !item.added),
    granularity
  };
};

const { before, after, type } = workerData;

if (type === 'texteditor') {
  const sentences = diff(before, after, { type, granularity: 'sentence' });
  parentPort.postMessage({ ...sentences });
  const words = diff(before, after, { type, granularity: 'word' });
  parentPort.postMessage({ ...words });
} else {
  parentPort.postMessage(diff(before, after, { type }));
}
