import React, { Component } from 'react';
import Snippet from '../containers/snippet';

class Tasklist extends Component {
  render() {
    const { tasks } = this.props;
    const outstandingCount = tasks.length;

    return (
      <div className="tasklist">
        <h2><Snippet>tasklist.title</Snippet></h2>
        <p>
          <Snippet count={outstandingCount}>{`tasklist.outstanding.${outstandingCount > 0 ? 'some' : 'none'}`}</Snippet>
        </p>

        {
          tasks.length > 0 && (
            <table className="govuk-table">
              <thead>
                <tr>
                  <th><Snippet>tasklist.headings.received</Snippet></th>
                  <th><Snippet>tasklist.headings.establishment</Snippet></th>
                  <th><Snippet>tasklist.headings.licence</Snippet></th>
                  <th><Snippet>tasklist.headings.type</Snippet></th>
                </tr>
              </thead>
              <tbody>
                {
                  tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.receivedAt}</td>
                      <td>{task.establishment && task.establishment.name}</td>
                      <td>{task.licence}</td>
                      <td>
                        <a href={task.action.url}>{task.action.label}</a>
                        <br />
                        {task.action.details}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
    );
  }
}

export default Tasklist;
