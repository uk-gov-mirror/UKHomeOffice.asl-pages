const React = require('react');

const Stub = props => {
  return <React.Fragment>
    { props.children }
  </React.Fragment>;
};

module.exports = Stub;
