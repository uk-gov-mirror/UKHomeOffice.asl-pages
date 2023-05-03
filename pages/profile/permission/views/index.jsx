import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet, Form, ErrorSummary, Header } from '@ukhomeoffice/asl-components';
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
  const { hasProjects, hasPil, hasRoles, hasAdditionalProjects, profile } = useSelector(state => state.static);

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
        <p>
          {
            nonRemovable
              ? <Button disabled={true} className="button-warning"><Snippet>buttons.remove</Snippet></Button>
              : <Link
                className="govuk-button button-warning"
                page="profile.remove"
                label={<Snippet>buttons.remove</Snippet>}
              />
          }
        </p>
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
