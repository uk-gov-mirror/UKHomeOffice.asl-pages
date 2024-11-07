import React from 'react';
import { useSelector } from 'react-redux';
import { pick, omit } from 'lodash';
import { FormLayout, Header, Snippet, ModelSummary } from '@ukhomeoffice/asl-components';
import { format } from 'date-fns';
import { dateFormat } from '../../../../../../../constants';
import participantSchema from '../schema';
import courseSchema from '../../../schema';
import formatters from '../../../formatters';
import participantDetailsSchemaHelper from '../helpers/participant-details-schema-helper';

const localFormatters = {
  dob: {
    format: dob => format(dob, dateFormat.long)
  }
};

export default function Confirm() {
  const course = useSelector(state => state.static.course);
  const coursePurposeSchema = participantDetailsSchemaHelper(participantSchema, course);

  const selectedSchemaItems = ['firstName', 'lastName', 'email', 'dob'];
  const selectedCourseSchemaItems = ['title', 'coursePurpose', 'startDate', 'species', 'projectId', 'projectTitle'];

  return (
    <FormLayout cancelLink="pils.courses.participants.add">
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={course.title}
      />
      <ModelSummary schema={pick(coursePurposeSchema, selectedSchemaItems)} formatters={{ ...formatters, ...localFormatters }} />
      <ModelSummary model={course} schema={pick(courseSchema, selectedCourseSchemaItems)} formatters={formatters} />
      <ModelSummary schema={omit(coursePurposeSchema, selectedSchemaItems)} formatters={{ ...formatters, ...localFormatters }} />
    </FormLayout>
  );
}
