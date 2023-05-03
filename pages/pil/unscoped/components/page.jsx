import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Link,
  Snippet,
  Header,
  Tabs
} from '@ukhomeoffice/asl-components';
import EstablishmentHeader from '../../../common/components/establishment-header';

export default function Page({ children, activeTab }) {
  const { establishment, allowedActions } = useSelector(state => state.static, shallowEqual);
  const showTraining = establishment.isTrainingEstablishment && allowedActions.includes('trainingCourse.read');
  const tabs = [
    {
      page: 'pils',
      key: 'list',
      label: <Snippet>tabs.general</Snippet>
    },
    {
      page: 'pils.courses.list',
      key: 'courses',
      label: <Snippet>tabs.courses</Snippet>
    }
  ];
  return (
    <Fragment>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={<EstablishmentHeader establishment={establishment}/>}
      />
      {
        showTraining && (
          <Tabs active={tabs.findIndex(tab => tab.key === activeTab)}>
            {
              tabs.map(tab => <Link key={tab.key} page={tab.page} label={tab.label} />)
            }
          </Tabs>
        )
      }
      { children }
    </Fragment>
  );
}
