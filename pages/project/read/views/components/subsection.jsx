import React from 'react';
import classnames from 'classnames';

export default function Subsection({ title, content, children, className }) {
  return (
    <section className={classnames('subsection', className)}>
      { title && <h2>{ title }</h2> }
      { content && <p>{ content }</p> }
      { children }
    </section>
  );
}
