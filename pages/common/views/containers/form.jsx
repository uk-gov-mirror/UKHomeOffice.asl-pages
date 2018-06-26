import { mapValues } from 'lodash';
import { connect } from 'react-redux';
import Form from '../components/form';

const extendSchema = (field, formatter) => {
  if (!formatter) {
    return field;
  }
  return {
    ...field,
    ...formatter,
    options: formatter.mapOptions ? field.options.map(formatter.mapOptions) : field.options
  };
};

const mapStateToProps = ({ static: { schema, errors }, model }, { formatters = {} }) => {
  return {
    model,
    errors,
    schema: mapValues(schema, (field, key) => extendSchema(field, formatters[key]))
  };
};

export default connect(mapStateToProps)(Form);
