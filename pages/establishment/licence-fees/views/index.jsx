import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  Header,
  Snippet,
  WidthContainer,
  Tabs,
  Link,
  Inset,
  ErrorSummary
} from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../constants';
import { numberWithCommas } from '../../../../lib/utils';

function Fee({ type }) {
  const fees = useSelector(state => state.static.fees);
  const num = fees[type];
  return (
    <div>
      <h3><Snippet>{`fees.summary.${type}`}</Snippet></h3>
      <h1>£{numberWithCommas(num)}</h1>
    </div>
  );
}

export default function Fees({ tab, tabs, children, subtitle = '' }) {
  const establishment = useSelector(state => state.static.establishment);
  const allowedActions = useSelector(state => state.static.allowedActions);
  const fees = useSelector(state => state.static.fees);

  tabs = tabs || [
    {
      page: 'establishment.fees.overview',
      key: 'fees.tabs.overview'
    },
    {
      page: 'establishment.fees.personal',
      key: allowedActions.includes('pil.updateBillable')
        ? 'fees.tabs.allPersonal'
        : 'fees.tabs.personal'
    }
  ];

  return (
    <Fragment>
      <WidthContainer>
        <ErrorSummary />
        <Header
          title={<Snippet>fees.title</Snippet>}
          subtitle={establishment ? establishment.name : subtitle}
        />
        <p className="subtitle">
          <Snippet
            start={format(fees.startDate, dateFormat.medium)}
            end={format(fees.endDate, dateFormat.medium)}
          >
            fees.period
          </Snippet>
        </p>
        <Warning><Snippet>fees.disclaimer</Snippet></Warning>
        <details className="margin-bottom">
          <summary><Snippet>fees.details.summary</Snippet></summary>
          <Inset>
            <Snippet>fees.details.content</Snippet>
          </Inset>
        </details>
      </WidthContainer>
      <Fragment>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <Fee type="establishment"></Fee>
          </div>
          <div className="govuk-grid-column-one-third">
            <Fee type="personal"></Fee>
          </div>
          <div className="govuk-grid-column-one-third">
            <Fee type="total"></Fee>
          </div>
        </div>
        <Tabs active={tab}>
          {
            tabs.map(({ page, key, ...props }, index) => <Link key={index} page={page} label={<Snippet>{key}</Snippet>} {...props} />)
          }
        </Tabs>
        <h2><Snippet>title</Snippet></h2>
        { children }
      </Fragment>
    </Fragment>
  );
}
