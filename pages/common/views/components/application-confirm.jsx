import React, { Component } from 'react';
import Snippet from '../containers/snippet';

class ApplicationConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.confirm = this.confirm.bind(this);
  }

  confirm(e) {
    this.setState({checked: !this.state.checked});
  }

  render() {
    return (
      <div className="application-confirm">
        <h2><Snippet>pil.confirm.title</Snippet></h2>
        <form method="POST" noValidate>
          <div className="govuk-form-group">
            <div className="govuk-checkboxes">
              <div className="govuk-checkboxes__item">
                <input
                  type="checkbox"
                  className="govuk-checkboxes__input"
                  id="pil-application-confirm"
                  onChange={this.confirm}
                  checked={this.state.checked}
                />
                <label htmlFor="pil-application-confirm" className="govuk-label govuk-checkboxes__label">
                  <Snippet>pil.confirm.summary</Snippet>
                </label>
              </div>
            </div>
          </div>
          {
            this.state.checked &&
              <div className="govuk-form-group">
                <button type="submit" className="govuk-button"><Snippet>actions.submit</Snippet></button>
                <input type="hidden" name="action" value="submit-pil-application" />
              </div>
          }
        </form>
      </div>
    );
  }

}

export default ApplicationConfirm;
