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
} from '@asl/components';
import { Warning, Select } from '@ukhomeoffice/react-components';
import { getUrl } from '@asl/components/src/link';
import format from 'date-fns/format';
import addYears from 'date-fns/add_years';
import isFuture from 'date-fns/is_future';
import { dateFormat } from '../../../../constants';
import { numberWithCommas } from '../../../../lib/utils';
import { fees as feeSettings } from '@asl/constants';

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

  const years = Object.keys(feeSettings).reverse();

  const options = years.map(year => {
    const date = `${year}-04-06`;
    const endDate = addYears(date, 1);
    const start = format(date, dateFormat.long);
    const end = format(endDate, dateFormat.long);
    return {
      value: year,
      label: `6th April ${start} to ${end}${isFuture(endDate) ? ' (projection)' : ''}`
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
          subtitle={establishment ? establishment.name : subtitle}
        />
        <div>
          <p className="subtitle">
            <span><Snippet>fees.period</Snippet></span>
            <Select
              options={options}
              className="inline"
              onChange={onYearSelect}
              value={year}
              nullOption={false}
            />
          </p>
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
