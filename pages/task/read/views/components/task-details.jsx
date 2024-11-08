import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { differenceInYears } from 'date-fns';
import { Snippet, Link } from '@ukhomeoffice/asl-components';
import * as participantDetails from '../../../../../pages/pil/unscoped/courses/participants/add/content/index';

function ProjectTitle({ project, establishment }) {
  return (
    <Fragment>
      <dt>Project title</dt>
      <dd>
        <Link
          page="project.read"
          establishmentId={establishment.id}
          projectId={project.id}
          label={project.title || 'Untitled project'}
        />
      </dd>
    </Fragment>
  );
}

function ProfileLink({ profile, establishment, type }) {
  const { isAsru } = useSelector(state => state.static);
  const label = `${profile.firstName} ${profile.lastName}`;

  return (
    <Fragment>
      <dt><Snippet>{`profileLink.${type}`}</Snippet></dt>
      <dd>
        { (type === 'global' || isAsru)
          ? <Link page="globalProfile" profileId={profile.id} label={label} />
          : <Link page="profile.read" establishmentId={establishment.id} profileId={profile.id} label={label} />
        }
      </dd>
    </Fragment>
  );
}

function Over18({ profile }) {
  const over18 = profile.dob ? differenceInYears(new Date(), new Date(profile.dob)) >= 18 : 'unknown';
  return (
    <Fragment>
      <dt><Snippet>pil.applicant.over18</Snippet></dt>
      <dd>
        { !profile.dob && <Snippet>pil.applicant.missingDob</Snippet> }
        { profile.dob && (over18 ? 'Yes' : 'No') }
      </dd>
    </Fragment>
  );
}

function LicenceNumber({ children }) {
  if (!children) {
    return null;
  }

  return (
    <Fragment>
      <dt>Licence number</dt>
      <dd>{ children }</dd>
    </Fragment>
  );
}

function EstablishmentLink({ establishment }) {
  return (
    <Fragment>
      <dt>Establishment</dt>
      <dd>
        <Link page="establishment" establishmentId={establishment.id} label={`${establishment.name}`} />
        { establishment.status === 'inactive' && <span> (Draft)</span> }
      </dd>
    </Fragment>
  );
}

function OrgAndQualificationDetails({ trainingTask, trainingCourse }) {
  const higherEducation = trainingCourse.coursePurpose === 'higherEducation';
  const training = trainingCourse.coursePurpose === 'training';

  return (
    <>
      { trainingTask.organisation &&
        <Fragment>
          <dt>{ participantDetails.fields.organisation.label }</dt>
          <dd>{ trainingTask.organisation }</dd>
        </Fragment>
      }

      { higherEducation &&
        <Fragment>
          <dt>{ participantDetails.fields.qualificationLevelAndSubject.label }</dt>
          <dd>{ trainingTask.qualificationLevelAndSubject }</dd>
        </Fragment>
      }

      { training &&
        <Fragment>
          <dt>{ participantDetails.fields.jobTitleOrQualification.label }</dt>
          <dd>{ trainingTask.jobTitleOrQualification }</dd>

          <dt>{ participantDetails.fields.fieldOfExpertise.label }</dt>
          <dd>{ trainingTask.fieldOfExpertise }</dd>
        </Fragment>
      }
    </>
  );
}

function EstablishmentsList({ establishments }) {
  return (
    <Fragment>
      <dt>Establishments</dt>
      <dd>
        <ul className="establishments">
          {
            (establishments || []).map(e =>
              <li key={e.id}><Link page="establishment" establishmentId={e.id} label={`${e.name}`} /></li>
            )
          }
        </ul>
      </dd>
    </Fragment>
  );
}

function ROPYear({ task }) {
  if (task.data.model !== 'rop') {
    return null;
  }
  const year = useSelector(state => state.static.values.year);
  return <Fragment>
    <dt>Return for year</dt>
    <dd>{ year }</dd>
  </Fragment>;
}

function ProjectDetails({ task }) {
  const project = useSelector(state => state.static.project) || useSelector(state => state.static.values.project);
  const version = useSelector(state => state.static.version);
  const establishment = useSelector(state => state.static.establishment) || task.data.establishment;
  const isApplication = task.type === 'application';
  const isAmendment = task.type === 'amendment';
  const profileType = isApplication ? 'applicant' : isAmendment ? 'amendment' : 'licenceHolder';

  const profile = isApplication
    ? project.licenceHolder
    : (version ? version.licenceHolder : project.licenceHolder);

  return (
    <dl className="inline-wide">
      <ProjectTitle project={project} establishment={establishment} />
      <ProfileLink profile={profile} establishment={establishment} type={profileType} />
      <LicenceNumber>{project.licenceNumber}</LicenceNumber>
      <EstablishmentLink establishment={establishment} />
      { task.data.model === 'rop' && <ROPYear task={task} /> }
    </dl>
  );
}

function PilDetails({ task }) {
  const profile = useSelector(state => state.static.profile) || get(task, 'data.modelData.profile');
  const pil = profile.pil;
  const establishment = (pil && pil.establishment) ? pil.establishment : get(task, 'data.establishment');
  const isApplication = task.type === 'application';
  const profileType = isApplication ? 'applicant' : 'licenceHolder';
  const trainingTask = get(task, 'data.data');
  const trainingCourse = get(task, 'data.modelData.trainingCourse');

  return (
    <dl className="inline-wide">
      <ProfileLink profile={profile} establishment={establishment} type={profileType} />
      { isApplication && <Over18 profile={profile} /> }
      { !isApplication && profile.pilLicenceNumber &&
        <LicenceNumber>
          <Link page="pil.read" establishmentId={establishment.id} profileId={profile.id} label={profile.pilLicenceNumber} />
        </LicenceNumber>
      }
      {trainingCourse ? <OrgAndQualificationDetails trainingTask={trainingTask} trainingCourse={trainingCourse}/> : null }

      <EstablishmentLink establishment={establishment} />
    </dl>
  );
}

function ProfileDetails({ task }) {
  const profile = useSelector(state => state.static.values);
  const isApplication = task.type === 'application';
  const establishments = profile.establishments;

  return (
    <dl className="inline-wide">
      <ProfileLink profile={profile} type="global" />
      { isApplication && <Over18 profile={profile} /> }
      { !isApplication && profile.pilLicenceNumber && profile.pil &&
        <LicenceNumber>
          <Link page="pil.read" establishmentId={profile.pil.establishmentId} profileId={profile.id} label={profile.pilLicenceNumber} />
        </LicenceNumber>
      }
      <EstablishmentsList establishments={establishments} />
    </dl>
  );
}

function EstablishmentDetails({ task }) {
  const establishment = useSelector(state => state.static.establishment);
  const showNprc = establishment.nprc && (!establishment.pelh || establishment.pelh.id !== establishment.nprc.id);

  return (
    <dl className="inline-wide">
      <EstablishmentLink establishment={establishment} />
      <LicenceNumber>{establishment.licenceNumber}</LicenceNumber>
      { establishment.pelh &&
        <ProfileLink profile={establishment.pelh} establishment={establishment} type="pelh" />
      }
      { showNprc &&
        <ProfileLink profile={establishment.nprc} establishment={establishment} type="nprc" />
      }
    </dl>
  );
}

export default function TaskDetails({ task }) {
  const model = get(task, 'data.model');

  return (
    <div className="task-details">
      <h2><Snippet>sticky-nav.details</Snippet></h2>
      {
        model === 'profile' && <ProfileDetails task={task} />
      }

      {
        ['project', 'retrospective-assessment', 'rop'].includes(model) &&
          <ProjectDetails task={task} />
      }

      {
        ['pil', 'trainingPil'].includes(model) &&
          <PilDetails task={task} />
      }

      {
        ['establishment', 'place', 'role'].includes(model) &&
          <EstablishmentDetails task={task} />
      }
    </div>
  );
}
