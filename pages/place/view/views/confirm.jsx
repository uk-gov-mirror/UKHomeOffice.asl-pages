import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import Diff from '../../../common/views/containers/diff';
import Snippet from '../../../common/views/containers/snippet';
import { joinAcronyms } from '../../../common/formatters';

const formatters = {
  suitability: { format: joinAcronyms },
  holding: { format: joinAcronyms },
  nacwo: { format: val => get(val, 'profile.name') }
};

const Confirm = ({
  establishment: {
    name,
    licenceNumber,
    pelh: {
      name: pelhName
    }
  },
  ...props
}) => (
  <Fragment>
    <div className="grid-row">
      <div className="column-two-thirds">
        <header>
          <h2>&nbsp;</h2>
          <h1><Snippet>pages.place.confirm</Snippet></h1>
        </header>
        <dl className="inline">
          <dt><Snippet>establishment</Snippet></dt>
          <dd>{ name }</dd>

          <dt><Snippet>licenceNumber</Snippet></dt>
          <dd>{ licenceNumber }</dd>

          <dt><Snippet>licenceHolder</Snippet></dt>
          <dd>{ pelhName }</dd>
        </dl>
        <hr />
        <Diff formatters={formatters} />
        <div className="control-bar block">
          <p><Snippet>declaration</Snippet></p>
          <form method="POST">
            <input type="hidden" name="submit" value="true" />
            <button className="button"><Snippet>buttons.submit</Snippet></button>
          </form>
          <a href="?edit=true"><Snippet>buttons.edit</Snippet></a>
          <a href="?clear=true"><Snippet>buttons.cancel</Snippet></a>
        </div>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Confirm);
