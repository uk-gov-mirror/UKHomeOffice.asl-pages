import React from 'react';
import { useSelector } from 'react-redux';
import pick from 'lodash/pick';
import { FormLayout, Header, Snippet, ModelSummary } from '@ukhomeoffice/asl-components';
import { format } from 'date-fns';
import { dateFormat } from '../../../../../../../constants';
import participantSchema from '../schema';
import courseSchema from '../../../schema';
import formatters from '../../../formatters';

const localFormatters = {
  dob: {
    format: dob => format(dob, dateFormat.long)
  }
};

export default function Confirm() {
  const course = useSelector(state => state.static.course);
  return (
    <FormLayout cancelLink="pils.courses.participants.add">
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={course.title}
      />
      <ModelSummary schema={participantSchema} formatters={{ ...formatters, ...localFormatters }} />
      <ModelSummary model={course} schema={pick(courseSchema, 'title', 'startDate')} formatters={formatters} />
      <ModelSummary model={course} schema={pick(courseSchema, 'species', 'projectId', 'projectTitle')} formatters={formatters} />
    </FormLayout>
  );
}
