import React from 'react';
import { connect } from 'react-redux';
import { Success, Snippet } from '@asl/components';

const Index = ({ profile }) => (
  <div className="govuk-grid-row">
    <div className="govuk-grid-column-two-thirds">
      <Success
        title={<Snippet>{`success.title`}</Snippet>}
        subtitle={<Snippet optional email={profile.email}>{`success.subtitle`}</Snippet>}
        nextSteps={<Snippet optional>{`success.body`}</Snippet>}
      />
    </div>
  </div>
);

const mapStateToProps = ({ static: { profile } }) => ({ profile });

export default connect(mapStateToProps)(Index);
