import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Snippet, FormLayout, ApplyChanges } from '@asl/components';

const formatters = {
  permission: {
    mapOptions: opt => {
      return {
        value: opt,
        label: <Snippet>{`fields.permission.options.${opt}.label`}</Snippet>,
        hint: (
          <Snippet optional>{`fields.permission.options.${opt}.hint`}</Snippet>
        )
      };
    }
  }
};

const Page = ({ url }) => {
  return (
    <Fragment>
      <FormLayout formatters={formatters}>
        <header>
          <h1>
            <Snippet>title</Snippet>
          </h1>
        </header>
      </FormLayout>
      <Fragment>
        <h2>
          <Snippet>remove</Snippet>
        </h2>
        <p>
          <Snippet>copy</Snippet>
        </p>
        <ApplyChanges type="form" method="POST" action={`${url}/remove`}>
          <button className="govuk-button">
            <Snippet>buttons.remove</Snippet>
          </button>
        </ApplyChanges>
        <p>
          <Link
            page="profile.view"
            label={<Snippet>pages.profile.links.back</Snippet>}
          />
        </p>
      </Fragment>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { url } }) => ({ url });

export default connect(mapStateToProps)(Page);
