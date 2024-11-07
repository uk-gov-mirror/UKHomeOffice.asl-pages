const { omit } = require('lodash');

function participantDetailsSchemaHelper (schema, trainingCourse) {
  if (trainingCourse.coursePurpose === 'higherEducation') {
    return omit(schema, ['jobTitleOrQualification', 'fieldOfExpertise', 'applicantTrainingUseAtWork']);
  } else if (trainingCourse.coursePurpose === 'training') {
    return omit(schema, ['qualificationLevelAndSubject', 'applicantLearningUse']);
  } else {
    throw new Error(`Invalid course purpose: ${trainingCourse.coursePurpose}`);
  }
}

module.exports = participantDetailsSchemaHelper;
