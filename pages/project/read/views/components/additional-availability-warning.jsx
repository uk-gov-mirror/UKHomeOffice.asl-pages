import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@ukhomeoffice/asl-components';
import { Warning } from '@ukhomeoffice/react-components';

export default function AdditionalAvailabilityWarning() {
  const additionalAvailability = useSelector(state => state.static.additionalAvailability);
  if (!additionalAvailability) {
    return null;
  }
  return (
    <Warning>
      <Snippet>warnings.aa</Snippet>
    </Warning>
  );
}
