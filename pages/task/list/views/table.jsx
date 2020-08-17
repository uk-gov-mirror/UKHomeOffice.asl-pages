import React from 'react';
import { Datatable } from '@asl/components';
import formatters from '../formatters';

export default function () {
  return <Datatable formatters={formatters} className="tasklist" />;
}
