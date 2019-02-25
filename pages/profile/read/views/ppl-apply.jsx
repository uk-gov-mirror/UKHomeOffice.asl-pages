import React from 'react';
import { Snippet } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';

class PplApply extends React.Component {
  render() {
    const { allowedActions, estId } = this.props;

    if (!allowedActions.includes('project.apply')) {
      return null;
    }
    return (
      <div>
        <p>
          <form method='POST' action={`/e/${estId}/projects/create`}>
            <Button className='govuk-button add-margin'>
              <Snippet>buttons.pplApply</Snippet>
            </Button>
          </form>
        </p>
      </div>
    );
  }
}

export default PplApply;
