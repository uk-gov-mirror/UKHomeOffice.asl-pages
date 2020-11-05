import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Field from '../../../nts/views/components/field';
import getSchema from '../../../nts/schema';

export default function NtsPdf() {
  const project = useSelector(state => state.application.project);
  const version = useSelector(state => state.project);
  const isTrainingLicence = version['training-licence'] || false;
  const sections = getSchema(project.schemaVersion);

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
                      <Field field={field} version={version} schemaVersion={project.schemaVersion} project={project} />
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
