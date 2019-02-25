import React from 'react';
import {
  Link,
  Snippet
} from '@asl/components';

class PilApply extends React.Component {

  render() {
    const
      {
        allowedActions,
        pil,
        estId,
        profileId
      } = this.props;

    if (!allowedActions.includes('pil.create')) {
      return null;
    }
    if (pil && pil.status === 'active') {
      return null;
    }
    const incomplete = pil && pil.status !== 'active';
    return (
      <div>
        <p>
          <Link
            page='pil.create'
            establishmentId={estId}
            profileId={profileId}
            className="govuk-button"
            label={<Snippet>{`buttons.${incomplete ? 'continue' : 'pilApply'}`}</Snippet>}
          />
        </p>
      </div>
    );
  }
}

export default (PilApply);
