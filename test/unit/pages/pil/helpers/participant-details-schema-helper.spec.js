const { omit } = require('lodash');
const { describe, it, expect } = require('@jest/globals');
const participantDetailsSchemaHelper = require('../../../../../pages/pil/unscoped/courses/participants/add/helpers/participant-details-schema-helper');

describe('participantDetailsSchemaHelper', () => {
  const schema = {
    jobTitle: 'Developer',
    fieldOfExpertise: 'Software Engineering',
    applicantTrainingUse: 'Development',
    qualificationLevelAndSubject: 'BSc Computer Science',
    applicantLearning: 'Advanced Programming'
  };

  it('should omit jobTitle, fieldOfExpertise, and applicantTrainingUse for higherEducation course purpose', () => {
    const trainingCourse = { coursePurpose: 'higherEducation' };
    const result = participantDetailsSchemaHelper(schema, trainingCourse);
    expect(result).toEqual(omit(schema, ['jobTitleOrQualification', 'fieldOfExpertise', 'applicantTrainingUseAtWork']));
  });

  it('should omit qualificationLevelAndSubject and applicantLearning for training course purpose', () => {
    const trainingCourse = { coursePurpose: 'training' };
    const result = participantDetailsSchemaHelper(schema, trainingCourse);
    expect(result).toEqual(omit(schema, ['qualificationLevelAndSubject', 'applicantLearningUse']));
  });

  it('should throw an error for invalid course purpose', () => {
    const trainingCourse = { coursePurpose: 'invalid-purpose' };
    expect(() => participantDetailsSchemaHelper(schema, trainingCourse)).toThrowError('Invalid course purpose: invalid-purpose');
  });
});
