import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Inset,
  FormLayout,
  Header,
  Link
} from '@asl/components';
import formatters from '../../formatters';

const pageFormatters = {
  restrictions: { showIf: model => model.restrictions }
};

const Page = ({ model }) => {
  if (model.tasks && model.tasks.length) {
    return <Fragment>
      <p>This item cannot be modified as it is subject to current in progress changes.</p>
      <p><Link page="task.read" taskId={model.tasks[0].id} label="View open changes" /></p>
    </Fragment>
  }
  return <FormLayout formatters={Object.assign({}, formatters, pageFormatters)}>
    <Header title={<Snippet>pages.place.edit</Snippet>} />
    <Inset>
      <p>
        <Snippet>inset</Snippet>
      </p>
    </Inset>
  </FormLayout>
};

const mapStateToProps = ({ model }) => ({ model });

export default connect(mapStateToProps)(Page);
