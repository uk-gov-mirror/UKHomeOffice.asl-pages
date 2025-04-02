import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Snippet, Header, Form, TrainingSummary, Details, Inset, SupportingLinks, Link } from '@ukhomeoffice/asl-components';
import MandatoryTrainingRequirements from '../../components/mandatory-training-requirements';
import content from '../content/index';

const Page = () => {
  const { profile, role } = useSelector(state => state.static, shallowEqual);
  const roleType = role.type;

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <span className="govuk-caption-l">{profile.firstName} {profile.lastName}</span>
        <Form cancelLink="profile.read">
          <Header title={`${roleType.toUpperCase()} ${content.title}`}/>
          <p className="govuk-body">{content.nacwoMandatoryTrainingDesc}</p>
          <ul className="govuk-list govuk-list--bullet govuk-list--spaced">
            <li>{content.trianingUnless1}</li>
            <li>{content.trianingUnless2}</li>
          </ul>

          <Details summary={<Snippet>nacwoMandatoryTrainingRequirements</Snippet>} className="margin-bottom">
            <Inset><MandatoryTrainingRequirements /></Inset>
          </Details>

          <Details summary={<Snippet>checkTrainingRecord</Snippet>} className="margin-bottom">
            <Inset>
              <TrainingSummary certificates={profile.certificates} />
              <Link page="training.dashboard" label="Manage training"/>
            </Inset>
          </Details>
        </Form>
      </div>

      <SupportingLinks sectionTitle={<Snippet>supportingGuidanceTitle</Snippet>} links={mandatoryTrainingSupportingLinks} />
    </div>
  );
};

export default Page;

const mandatoryTrainingSupportingLinks = [
  {
    href: 'https://www.gov.uk/guidance/nominate-someone-for-a-named-animal-care-and-welfare-officer-role',
    label: 'Adding a NACWO role'
  },
  {
    href: 'https://www.gov.uk/government/publications/training-and-development-under-the-animals-scientific-procedures-act',
    label: 'Guidance on training and continuous professional development (CPD) under ASPA'
  }
];
