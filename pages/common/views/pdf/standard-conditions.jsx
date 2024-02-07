import React from 'react';
import { Markdown } from '@ukhomeoffice/asl-components';

const StandardConditions = ({ conditions, className, title = 'Standard conditions' }) => (
  <section className={`section standard-conditions ${className}`}>
    <h2>{title}</h2>
    <ol>
      {
        conditions.map((condition, index) => (
          <li key={index}>
            <div className="purple-inset">
              <Markdown significantLineBreaks>{condition}</Markdown>
            </div>
          </li>
        ))
      }
    </ol>
  </section>
);

export default StandardConditions;
