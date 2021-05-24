import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from '@asl/components';
import format from 'date-fns/format';

export default function ProceduresDownloadLink({ className }) {
  const { project, year } = useSelector(state => state.static);
  const now = format(new Date(), 'DD-MM-YYYY');
  const filename = `procedures-added-to-rop-for-${project.licenceNumber}-in-${year}-downloaded-${now}.csv`;

  return <Link
    page="rops.procedures.list"
    query={{csv: { filename }}}
    label="Download table of procedures (CSV)"
    className={className}
  />;
}
