import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import get from 'lodash/get';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { ReviewFields } from '@asl/projects/client/components/review-fields';
import { Link, Snippet, Details } from '@asl/components';
import { dateFormat } from '../../../../../constants';
import { formatDate } from '../../../../../lib/utils';

function DaysSince({ days }) {
  if (days === 0) {
    return (
      <span className="deadline-passed">
        <br />
        <Snippet>deadline.today</Snippet>
      </span>
    );
  }

  if (days > 0) {
    return (
      <span className="deadline-passed">
        <br />
        <Snippet days={days}>{`deadline.passed.${days > 1 ? 'plural' : 'singular'}`}</Snippet>
      </span>
    );
  }

  return null; // still in future
}

export default function Deadline({ task }) {
  const { isAsru, isInspector, version } = useSelector(state => state.static, shallowEqual);

  const statutoryDeadline = get(task, 'data.deadline');
  const isExtended = get(statutoryDeadline, 'isExtended', false);
  const statutoryDeadlineDate = get(statutoryDeadline, isExtended ? 'extended' : 'standard');
  const internalDeadline = get(task, 'data.internalDeadline');
  const internalDeadlineDate = get(internalDeadline, isExtended ? 'extended' : 'standard');
  const activeDeadlineDate = get(task, 'activeDeadline');

  const continuation = get(task, 'data.continuation');
  const continuationRTE = get(version, 'data.expiring-yes');

  const removedStatutoryDeadline = get(task, 'data.removedDeadline');

  if (!activeDeadlineDate) {
    return null;
  }

  return (
    <div className="deadline">
      { isAsru &&
        <h2><Snippet date={formatDate(activeDeadlineDate, dateFormat.long)}>deadline.processBy</Snippet></h2>
      }

      <dl className="inline-wide">

        { isAsru && internalDeadline &&
          <Fragment>
            <dt><Snippet>deadline.internal</Snippet></dt>
            <dd>
              {formatDate(internalDeadlineDate, dateFormat.long)}
              <DaysSince days={differenceInCalendarDays(new Date(), internalDeadlineDate)} />
            </dd>
          </Fragment>
        }

        { statutoryDeadline &&
          <Fragment>
            <dt><Snippet>{`deadline.statutory.${statutoryDeadline.isExtended ? 'extended' : 'standard'}`}</Snippet></dt>
            <dd>
              {formatDate(statutoryDeadlineDate, dateFormat.long)}
              <DaysSince days={statutoryDeadline.daysSince} />

              {
                isInspector && <Details summary="Application not complete and correct">
                  <p><Snippet>removeDeadline.hint</Snippet></p>
                  <Link
                    page="task.read.removeDeadline"
                    taskId={task.id}
                    label={<Snippet>removeDeadline.button</Snippet>}
                    className="govuk-button button-warning"
                  />
                </Details>
              }

              {
                statutoryDeadline.isExtendable && isInspector &&
                  <Details summary="Extend deadline">
                    <p><Snippet>deadline.hint</Snippet></p>
                    <Link
                      page="task.read.extend"
                      taskId={task.id}
                      label={<Snippet>deadline.extend.button</Snippet>}
                      className="govuk-button button-secondary"
                    />
                  </Details>
              }
            </dd>
          </Fragment>
        }

        {
          removedStatutoryDeadline &&
          <Fragment>
            <dt><Snippet>{`deadline.statutory.${removedStatutoryDeadline.isExtended ? 'extended' : 'standard'}`}</Snippet></dt>
            <dd>
              <p><Snippet>reinstateDeadline.text</Snippet></p>

              {
                isInspector &&
                <Details summary="Reinstate deadline">
                  <p><Snippet>reinstateDeadline.hint</Snippet></p>
                  <Link
                    page="task.read.reinstateDeadline"
                    taskId={task.id}
                    label={<Snippet>reinstateDeadline.button</Snippet>}
                    className="govuk-button button-secondary"
                  />
                </Details>
              }
            </dd>
          </Fragment>
        }

        {
          continuation &&
            <Fragment>
              <dt><Snippet>continuation.title</Snippet></dt>
              <dd>
                {
                  continuation.map((item, index) => (
                    <p key={index}>
                      {
                        item['licence-number']
                          ? <Fragment>
                            <Snippet licenceNumber={item['licence-number']}>continuation.from</Snippet>
                            { item['expiry-date'] &&
                              <Fragment>
                                <br />
                                <Snippet expiry={formatDate(item['expiry-date'], dateFormat.medium)}>continuation.expiry</Snippet>
                              </Fragment>
                            }
                          </Fragment>
                          : <em>No answer provided</em>
                      }
                    </p>
                  ))
                }
              </dd>
            </Fragment>
        }
        {
          continuationRTE && (
            <Fragment>
              <dt><Snippet>continuation.rte</Snippet></dt>
              <dd>
                <ReviewFields
                  fields={[{ name: 'expiring-yes', type: 'texteditor' }]}
                  values={{ 'expiring-yes': continuationRTE }}
                  readonly={true}
                  noComments
                />
              </dd>
            </Fragment>
          )
        }
      </dl>

    </div>
  );
}
