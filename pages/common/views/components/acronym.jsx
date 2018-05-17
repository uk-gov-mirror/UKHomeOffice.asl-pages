const React = require('react');

const dictionary = require('@asl/dictionary');

const Acronym = ({
  children
}) => (
  dictionary[children]
    ? <abbr title={dictionary[children]}>{children}</abbr>
    : children
);

module.exports = Acronym;
