import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import merge from 'lodash/merge';
import { Snippet, Link, Datatable } from '@ukhomeoffice/asl-components';
import Page from '../../../components/page';
import formatters from '../../formatters';

const listFormatters = {
  title: {
    format: (title, model) => <Link page="pils.courses.read" trainingCourseId={model.id} label={title} />
  }
};

export default function Courses() {
  const hasData = useSelector(state => state.datatable.data.rows.length) > 0;
  const allowedActions = useSelector(state => state.static.allowedActions);
  const canUpdate = allowedActions.includes('trainingCourse.update');
  return (
    <Page activeTab="courses">
      {
        canUpdate && (
          <Fragment>
            <Snippet>subtitle</Snippet>
            <p>
              <Link className="govuk-button" page="pils.courses.create" label={<Snippet>buttons.add</Snippet>} />
            </p>
          </Fragment>
        )
      }
      {
        hasData && <Datatable formatters={merge({}, formatters, listFormatters)} />
      }
      {
        !hasData && !canUpdate && <p><Snippet>cannot-update</Snippet></p>
      }
    </Page>
  );
}
