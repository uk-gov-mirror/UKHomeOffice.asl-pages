import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Header, Link, Snippet, Form } from '@ukhomeoffice/asl-components';
import { Warning } from '@ukhomeoffice/react-components';
import EstablishmentHeader from '../../../common/components/establishment-header';

const Index = () => {
  const isOwnProfile = useSelector(state => state.static.isOwnProfile, shallowEqual);
  const profile = useSelector(state => state.model, shallowEqual);
  const drafts = profile.drafts || [];
  const establishment = useSelector(state => state.static.establishment, shallowEqual);

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Form cancelLink={isOwnProfile ? 'dashboard' : 'profile.permission'} submit={{ className: 'button-warning' }}>
            <Header
              title={<Snippet>title</Snippet>}
              subtitle={<EstablishmentHeader establishment={establishment}/>}
            />
            <p><Snippet>intro</Snippet></p>

            {
              drafts.length > 0 && <Fragment>
                <Warning><Snippet>drafts.warning</Snippet></Warning>
                <p>Applications to be deleted:</p>
                <ul>
                  {
                    drafts.map(project => {
                      return <li key={project.id}>
                        <Link page="project.read" projectId={project.id} label={project.title} />
                      </li>;
                    })
                  }
                </ul>
                <p>Applications that need to be kept should be downloaded or transferred to another person first.</p>
              </Fragment>
            }
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
