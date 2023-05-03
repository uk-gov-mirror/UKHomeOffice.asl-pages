import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Details,
  Header,
  Snippet,
  WidthContainer,
  Tabs,
  Link,
  Inset,
  ErrorSummary
} from '@ukhomeoffice/asl-components';
import { Warning, Select } from '@ukhomeoffice/react-components';
import { getUrl } from '@ukhomeoffice/asl-components/src/link';
import format from 'date-fns/format';
import isFuture from 'date-fns/is_future';
import { dateFormat } from '../../../../constants';
import { numberWithCommas } from '../../../../lib/utils';
import EstablishmentHeader from '../../../common/components/establishment-header';

function Fee({ type }) {
  const fees = useSelector(state => state.static.fees);
  const num = fees[type];
  return (
    <div>
      <h3><Snippet>{`fees.summary.${type}`}</Snippet></h3>
      <h1>
        {'£'}
        <span>{ numberWithCommas(num) }</span>
      </h1>
    </div>
  );
}

export default function Fees({ tab, tabs, children, subtitle = '' }) {
  const { establishment, year } = useSelector(state => state.static, shallowEqual);
  const { years } = useSelector(state => state.static.fees);

  const options = years
    .sort((a, b) => b - a)
    .map(year => {
      year = parseInt(year, 10);
      const date = `${year}-04-06`;
      const endDate = `${year + 1}-04-05`;
      const start = format(date, dateFormat.long);
      const end = format(endDate, dateFormat.long);
      return {
        value: year,
        label: `${start} to ${end}${isFuture(endDate) ? ' (projection)' : ''}`
      };
    });

  tabs = tabs || [
    {
      page: 'establishment.fees.overview',
      key: 'fees.tabs.overview'
    },
    {
      page: 'establishment.fees.personal',
      key: 'fees.tabs.personal'
    },
    {
      page: 'establishment.fees.details',
      key: 'fees.tabs.details'
    }
  ];

  const targets = years.reduce((obj, year) => {
    return {
      ...obj,
      [year]: getUrl({ page: tabs[tab].page, year })
    };
  }, {});

  function onYearSelect(e) {
    const year = e.target.value;
    window.location.href = targets[year];
  }

  return (
    <Fragment>
      <WidthContainer>
        <ErrorSummary />
        <Header
          title={<Snippet>fees.title</Snippet>}
          subtitle={establishment ? <EstablishmentHeader establishment={establishment}/> : subtitle}
        />
        <div className="subtitle">
          <Snippet>fees.period</Snippet>
          <Select
            name="year"
            label=""
            options={options}
            className="inline"
            onChange={onYearSelect}
            value={year}
            nullOption={false}
          />
        </div>
        <Warning><Snippet>fees.disclaimer</Snippet></Warning>
        <Details
          className="margin-bottom"
          summary={<Snippet>fees.details.summary</Snippet>}
        >
          <Inset>
            <Snippet>fees.details.content</Snippet>
          </Inset>
        </Details>
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
        <div className="tab-content table-wrapper">
          <h2><Snippet>title</Snippet></h2>
          { children }
        </div>
      </Fragment>
    </Fragment>
  );
}
