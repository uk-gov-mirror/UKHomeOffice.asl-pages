import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, Metric, Tabs, Datatable, Countdown, Link } from '@asl/components';
import DateSelector from '../../components/date-selector';
import projectFormatters from '../../../../project/formatters';
import { formatDate } from '../../../../../lib/utils';
import { dateFormat } from '../../../../../constants';
import EstablishmentHeader from '../../../../common/components/establishment-header';

export default function Index() {
  const { establishment, year, ropsOverview, ropsStatus } = useSelector(state => state.static);

  const formatters = {
    ...projectFormatters(establishment.id),
    title: {
      format: (title, project) => {
        const page = ropsStatus === 'submitted' ? 'rops.procedures' : 'project.read';
        const rop = project.rops.find(r => r.year.toString() === year.toString());
        return <Link page={page} establishmentId={establishment.id} projectId={project.id} ropId={rop && rop.id} label={title} />;
      }
    },
    ropsDeadline: {
      format: (date, project) => {
        return (
          <Fragment>
            {formatDate(date, dateFormat.long)}
            <Countdown expiry={date} unit="day" showUrgent={10} showNotice={30} />
          </Fragment>
        );
      }
    },
    ropsSubmittedDate: {
      format: date => formatDate(date, dateFormat.long)
    },
    ropsStatus: {
      format: (value, project) => {
        if (ropsStatus === 'submitted') {
          return <span className="badge complete">SUBMITTED</span>;
        }
        const status = project.rops.find(r => r.status === 'draft') ? 'IN PROGRESS' : 'NOT STARTED';
        return <span className="badge">{status}</span>;
      }
    }
  };

  const tabs = [
    'outstanding',
    'submitted'
  ];

  return (
    <div>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={<EstablishmentHeader establishment={establishment}/>}
      />

      <DateSelector year={year} />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <Metric number={ropsOverview.due} label={<Snippet year={year}>overview.due</Snippet>} className="rops-due" />
        </div>
        <div className="govuk-grid-column-one-third">
          <Metric number={ropsOverview.submitted} label={<Snippet>overview.submitted</Snippet>} className="rops-submitted" />
        </div>
        <div className="govuk-grid-column-one-third">
          <Metric number={ropsOverview.outstanding} label={<Snippet>overview.outstanding</Snippet>} className="rops-outstanding" />
        </div>
      </div>

      <Tabs active={tabs.indexOf(ropsStatus)}>
        {
          tabs.map((tab, index) =>
            <a key={index} href={`?ropsStatus=${tab}`}><Snippet>{`tabs.${tab}`}</Snippet></a>
          )
        }
      </Tabs>

      { ropsStatus === 'submitted' &&
        <Link page="establishment.rops.download" year={year} label={<Snippet>actions.download</Snippet>} className="float-right" />
      }

      <Datatable formatters={formatters} />

    </div>
  );
}
