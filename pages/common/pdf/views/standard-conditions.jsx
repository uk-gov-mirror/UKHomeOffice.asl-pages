import React from 'react';
import ReactMarkdown from 'react-markdown';

const StandardConditions = ({ conditions }) => (
  <section className="section standard-conditions">
    <h2>Standard conditions</h2>
    <ol>
      {
        conditions.map((condition, index) => (
          <li key={index}>
            <div className="purple-inset">
              <ReactMarkdown>{condition}</ReactMarkdown>
            </div>
          </li>
        ))
      }
    </ol>
  </section>
);

export default StandardConditions;
