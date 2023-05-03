import React from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Snippet,
  Link,
  FormLayout
} from '@ukhomeoffice/asl-components';
import LicensedToCarryOut from '../../components/licensed-to-carry-out';
import NamedPeople from '../../components/named-people';

const Index = ({ model, establishment }) => {
  return (
    <FormLayout className="establishment-apply">
      <Header title={<Snippet>page.title</Snippet>} />
      <p><Snippet>page.summary</Snippet></p>

      <section className="details">
        <h2><Snippet>section.details.title</Snippet></h2>
        <dl className="inline">
          <dt><Snippet>section.details.fields.name.label</Snippet></dt>
          <dd>{establishment.name || '-'}</dd>

          <dt><Snippet>section.details.fields.corporateStatus.label</Snippet></dt>
          <dd>{(establishment.corporateStatus && <Snippet>{`section.details.fields.corporateStatus.options.${establishment.corporateStatus}`}</Snippet>) || '-'}</dd>

          <dt><Snippet>section.details.fields.address.label</Snippet></dt>
          <dd>{establishment.address || '-'}</dd>

          <dt><Snippet>section.details.fields.licensed.label</Snippet></dt>
          <dd><LicensedToCarryOut establishment={establishment} /></dd>
        </dl>
        <p><Link page="establishment.update" label={<Snippet>section.details.actions.edit</Snippet>} /></p>
      </section>

      <section className="approved-areas">
        <h2><Snippet>section.approvedAreas.title</Snippet></h2>
        <dl className="inline">
          <dt><Snippet>section.approvedAreas.fields.total.label</Snippet></dt>
          <dd>{establishment.placesCount}</dd>
        </dl>
        <p><Link page="place.list" label={<Snippet>section.approvedAreas.actions.add</Snippet>} /></p>
      </section>

      <section className="named-people">
        <h2><Snippet>section.namedPeople.title</Snippet></h2>
        <p className="govuk-hint"><Snippet>section.namedPeople.hint</Snippet></p>
        <NamedPeople establishment={establishment} showLinks={true} />
      </section>

    </FormLayout>
  );
};

const mapStateToProps = ({ model, static: { establishment, schema, csrfToken } }) => ({ model, establishment, schema, csrfToken });

export default connect(mapStateToProps)(Index);
