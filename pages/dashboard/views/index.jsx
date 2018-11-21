import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Datatable,
  Link,
  Snippet,
  Header,
  PanelList
} from '@asl/components';

export const formatters = {
  type: {
    format: (name, data) => {
      return (<Fragment>
        <a href={data.action.url}>{data.action.label}</a>
        <br />
        {data.action.details}
      </Fragment>);
    }
  }
};

const EstablishmentPanel = ({ id, name }) => (
  <Fragment>
    <p>
      <Link page="establishment.dashboard" establishmentId={id} label={name} />
    </p>
    <p>
      <Link page="profile.invite" establishmentId={id} label={<Snippet>pages.dashboard.invite</Snippet>}/>
    </p>
  </Fragment>
);

const Index = ({
  profile: {
    firstName,
    establishments
  },
  tasks
}) => (
  <Fragment>
    <Header
      title={<Snippet name={firstName}>pages.dashboard.greeting</Snippet>}
    />
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h2><Snippet>pages.dashboard.tasks</Snippet></h2>
        <Datatable formatters={formatters} />

        <PanelList panels={establishments.map(establishment => <EstablishmentPanel { ...establishment } />)}/>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { profile, tasks } }) => ({ profile, tasks });
export default connect(mapStateToProps)(Index);
