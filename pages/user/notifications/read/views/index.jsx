import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet } from '@ukhomeoffice/asl-components';
import ReactMarkdown from 'react-markdown';

export default function Notification() {
  const notification = useSelector(state => state.static.notification);
  return (
    <Fragment>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={notification.subject}
      />
      <ReactMarkdown>{notification.html}</ReactMarkdown>
    </Fragment>
  );
}
