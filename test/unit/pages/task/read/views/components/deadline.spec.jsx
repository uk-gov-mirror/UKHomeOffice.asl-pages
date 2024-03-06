import React from 'react';
import MockDate from 'mockdate';
import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { render } from 'enzyme';
import Deadline from '../../../../../../../pages/task/read/views/components/deadline';

import { MockComponent } from '../../../../../../util/mock-component';
import { MockReduxProvider } from '../../../../../../util/mock-redux';

const REDUX_STATE = {
  static: {
    isAsru: true,
    isInspector: false,
    version: 1,
    content: {
      deadline: {
        processBy: 'Process by: {{date}}',
        internal: 'Internal deadline',
        today: '(Deadline is today)',
        passed: {
          singular: '(Deadline passed {{days}} day ago)',
          plural: '(Deadline passed {{days}} days ago)'
        }
      }
    }
  }
};

// noinspection JSUnusedGlobalSymbols
jest.mock('@asl/projects/client/components/review-fields', () => ({
  ReviewFields: (props) => {
    const Component = MockComponent;
    return <Component {...props} />;
  }
}));

function renderDeadline({ date }) {
  const task = {
    data: {
      internalDeadline: {
        standard: date
      }
    },
    activeDeadline: date
  };

  return render(
    <MockReduxProvider state={REDUX_STATE}>
      <Deadline task={task} />
    </MockReduxProvider>
  );
}

function nodeToText(node) {
  return [
    ...(typeof node.data === 'string' ? [node.data] : []),
    ...([...node.children ?? []].flatMap(nodeToText))
  ];
}

function definitionListAsObject(dl) {
  const [, definitions] = [...dl.children()].reduce(
    ([key, acc], element) => {
      if (element.name === 'dt') {
        const title = nodeToText(element).join(' ');
        return [title, { ...acc, [title]: [] }];
      }

      if (element.name === 'dd') {
        return [key, { ...acc, [key]: [...acc[key], ...nodeToText(element)] }];
      }

      return [key, acc];
    },
    [null, {}]
  );

  return definitions;
}

describe('When a task is due or overdue, a notice should be displayed', () => {
  afterEach(() => {
    MockDate.reset();
    jest.resetAllMocks();
  });

  test('When the task is not yet due, no notice is displayed', () => {
    MockDate.set('2023-09-07 08:00:00');
    const wrapper = renderDeadline({ date: '2023-09-08' });
    const dl = wrapper.find('div.deadline > dl.inline-wide');
    const definitions = definitionListAsObject(dl);

    expect(definitions['Internal deadline']).toEqual(['8 September 2023']);
  });

  test('When the task is due today, A due notice is displayed', () => {
    MockDate.set('2023-09-08 08:00:00');
    const wrapper = renderDeadline({ date: '2023-09-08' });
    const dl = wrapper.find('div.deadline > dl.inline-wide');
    const definitions = definitionListAsObject(dl);

    expect(definitions['Internal deadline']).toEqual([
      '8 September 2023',
      '(Deadline is today)'
    ]);
  });

  test('When the task is overdue by a minute, An deadline passed notice is displayed', () => {
    MockDate.set('2023-09-09 00:01:00');
    const wrapper = renderDeadline({ date: '2023-09-08' });
    const dl = wrapper.find('div.deadline > dl.inline-wide');
    const definitions = definitionListAsObject(dl);

    expect(definitions['Internal deadline']).toEqual([
      '8 September 2023',
      '(Deadline passed 1 day ago)'
    ]);
  });

  test('When the task is overdue by almost two days, An deadline passed notice is displayed', () => {
    MockDate.set('2023-09-09 23:59:59');
    const wrapper = renderDeadline({ date: '2023-09-08' });
    const dl = wrapper.find('div.deadline > dl.inline-wide');
    const definitions = definitionListAsObject(dl);

    expect(definitions['Internal deadline']).toEqual([
      '8 September 2023',
      '(Deadline passed 1 day ago)'
    ]);
  });

  test('When the task is overdue by multiple days, An deadline passed notice is displayed', () => {
    MockDate.set('2023-09-11 23:59:59');
    const wrapper = renderDeadline({ date: '2023-09-08' });
    const dl = wrapper.find('div.deadline > dl.inline-wide');
    const definitions = definitionListAsObject(dl);

    expect(definitions['Internal deadline']).toEqual([
      '8 September 2023',
      '(Deadline passed 3 days ago)'
    ]);
  });
});
