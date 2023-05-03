import React from 'react';
import merge from 'lodash/merge';
import { Datatable } from '@ukhomeoffice/asl-components';
import taskFormatters from '../formatters';

export default function ({ formatters = {} }) {
  return <Datatable formatters={merge({}, taskFormatters, formatters)} className="tasklist" />;
}
