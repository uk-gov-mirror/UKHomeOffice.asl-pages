import { connect } from 'react-redux';
import React from 'react';
import {
  Link,
  Snippet
} from '@asl/components';

const PilApply = ({
  isUser,
  allowedActions,
  pil
}) => {
  if (!isUser && !allowedActions.includes('pil.create')) {
    return null;
  }
  if (pil && pil.status === 'active') {
    return null;
  }
  const incomplete = pil && pil.status !== 'active';
  return (
    <div>
      <p><Snippet>{`pil.${isUser ? 'user' : 'other'}.${incomplete ? 'incomplete' : 'notStarted'}`}</Snippet></p>
      <p>
        <Link
          page='pil.create'
          className="govuk-button"
          label={<Snippet>{`buttons.${incomplete ? 'continue' : 'pilApply'}`}</Snippet>}
        />
      </p>
    </div>
  );
};

const mapStateToProps = ({ static: { isUser, allowedActions } }) => ({ isUser, allowedActions });

export default connect(mapStateToProps)(PilApply);
