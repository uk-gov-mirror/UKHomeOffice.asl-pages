import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Field from '../../../nts/views/components/field';
import RaSummary from '../../../nts/views/components/ra-summary';
import getSchema from '../../../nts/schema';

export default function NtsPdf() {
  const { project, includeDraftRa } = useSelector(state => state.application);
  const version = useSelector(state => state.project);
  const isTrainingLicence = version['training-licence'] || false;
  const sections = getSchema(project.schemaVersion);
  const ra = includeDraftRa ? project.draftRa : project.grantedRa;

  return (
    <Fragment>
      <div className="logo"></div>
      <h3 className="licence">Non-technical Summary</h3>
      <h1 className="project-title">{project.title}</h1>

      {
        Object.keys(sections)
          .map((sectionName, sectionIndex) => {
            const section = sections[sectionName];
            const fields = section.fields.filter(f => isTrainingLicence ? f.training !== false : f.training !== true);

            return (
              <Fragment key={sectionName}>
                { sectionIndex !== 0 && <h2>{section.title}</h2> }
                { section.subtitle && <h3>{section.subtitle}</h3> }
                {
                  fields.map((field, index) => (
                    <div key={index} className="q-and-a">
                      {
                        field.heading && (
                          field.heading === 'Retrospective assessment'
                            ? <h2>{field.heading}</h2>
                            : <h3>{field.heading}</h3>
                        )
                      }
                      { field.label && field.name !== 'species' && <h4>{field.label}</h4> }

                      {
                        (field.type !== 'RetrospectivePlaceholder' || !ra) && <Field field={field} version={version} schemaVersion={project.schemaVersion} project={project} />
                      }
                      {
                        field.raSummary && <RaSummary fields={field.raSummary} project={project} isPdf={true} includeDraftRa={includeDraftRa} />
                      }
                    </div>
                  ))
                }
              </Fragment>
            );
          })
      }
    </Fragment>
  );
}
