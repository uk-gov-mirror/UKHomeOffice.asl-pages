import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet } from '@ukhomeoffice/asl-components';
import Success from '../../../success/views';

export default (...props) => {
  const allowedActions = useSelector(state => state.static.allowedActions);
  const canViewPils = allowedActions.includes('pil.list');
  const onwardLink = canViewPils ? <Link page="pils" label={<Snippet>breadcrumbs.pils.list</Snippet>} /> : null;

  return <Success onwardLink={ onwardLink } />;
};
