import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet, Form, ErrorSummary, ApplyChanges, Header } from '@asl/components';
import { Warning, Button } from '@ukhomeoffice/react-components';

const formatters = {
  role: {
    mapOptions: opt => {
      return {
        value: opt,
        label: <Snippet>{`fields.role.options.${opt}.label`}</Snippet>,
        hint: (
          <Snippet optional>{`fields.role.options.${opt}.hint`}</Snippet>
        )
      };
    }
  }
};

function PermissionsForm({ formFields, profile }) {
  return (
    <Fragment>
      {
        formFields
      }
      <Warning><Snippet>adminWarning</Snippet></Warning>
      <Button type="submit"><Snippet>buttons.submit</Snippet></Button>
    </Fragment>
  );
}

export default function Page() {
  const { hasProjects, hasPil, hasRoles, hasAdditionalProjects, url, profile } = useSelector(state => state.static);

  const nonRemovable = hasProjects || hasPil || hasRoles || hasAdditionalProjects;

  return (
    <Fragment>
      <ErrorSummary />
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={profile.name}
      />
      <Form formatters={formatters} submit={false} detachFields>
        <PermissionsForm />
      </Form>

      <Fragment>
        <hr />
        <h2><Snippet>remove.title</Snippet></h2>
        <p>
          {
            nonRemovable
              ? <Snippet hasProjects={hasProjects} hasPil={hasPil} hasRoles={hasRoles} hasAdditionalProjects={hasAdditionalProjects}>remove.nonRemovable</Snippet>
              : <Snippet>remove.warning</Snippet>
          }
        </p>
        <ApplyChanges type="form" method="POST" action={`${url}/remove`}>
          <button className="govuk-button" disabled={nonRemovable}>
            <Snippet>buttons.remove</Snippet>
          </button>
        </ApplyChanges>
        <p>
          <Link
            page="profile.read"
            label={<Snippet>pages.profile.links.back</Snippet>}
          />
        </p>
      </Fragment>

    </Fragment>
  );
}
