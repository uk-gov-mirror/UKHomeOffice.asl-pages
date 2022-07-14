import React from 'react';
import {shallow} from 'enzyme';
import Pil from "./pil";

describe('<PIL />', () => {

  test('renders when action is update', () => {
    const props = {
      task: {
        data: {
          data: {
            certificates: [{}, {}]
          }
        },
        isOpen: false
      }
    };
    const component = shallow(<Pil {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('renders only conditions when action is update-conditions', () => {
    const props = {
      task: {
        data: {
          action: 'update-conditions',
          data: {
            conditions: 'old-conditions'
          }
        },
        isOpen: false
      },
      values: {
        conditions: 'new-conditions'
      }
    };
    const component = shallow(<Pil {...props} />);
    expect(component).toMatchSnapshot();
  });
});
