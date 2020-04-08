import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

export default function SchemaV0() {
  console.log('SchemaV0');

  const project = useSelector(state => state.project);

  console.log(project);

  return (
    <Fragment>
      <div className="logo"></div>
      <h3 className="licence">Non-technical Summary</h3>
      <h1 className="project-title">{project.title}</h1>
    </Fragment>
  );
}
