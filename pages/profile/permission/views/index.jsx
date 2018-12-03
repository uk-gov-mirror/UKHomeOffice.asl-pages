import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Snippet, FormLayout, ApplyChanges, Header } from '@asl/components';

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

const Page = ({ url, isNamed }) => {
  return (
    <Fragment>
      <FormLayout formatters={formatters}>
        <Header title={<Snippet>title</Snippet>}/>
      </FormLayout>
      <Fragment>
        <h2>
          <Snippet>remove</Snippet>
        </h2>
        <p>
          {isNamed && (<Snippet>copy</Snippet>)}
          {!isNamed && (<Snippet>warning</Snippet>)}
        </p>
        <ApplyChanges type="form" method="POST" action={`${url}/remove`}>
          <button className="govuk-button" disabled={isNamed}>
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

const mapStateToProps = ({ static: { url, isNamed } }) => ({ url, isNamed });

export default connect(mapStateToProps)(Page);
