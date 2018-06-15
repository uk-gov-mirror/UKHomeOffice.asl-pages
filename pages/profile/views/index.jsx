import React, { Fragment } from 'react';
import { isEmpty, map, chain } from 'lodash';
import { connect } from 'react-redux';
import dictionary from '@asl/dictionary';
import Snippet from '../../common/views/containers/snippet';

const getPremises = roles => {
  if (!roles) {
    return null;
  }
  const nacwo = roles.find(role => role.type === 'nacwo');
  if (!nacwo) {
    return null;
  }
  return chain(nacwo.places)
    .groupBy('site')
    .mapValues(v => chain(v)
      .groupBy('area')
      .mapValues(p => p.map(place => place.name))
      .value()
    )
    .value();
};

const Index = ({
  item: {
    name,
    pil,
    qualifications,
    address,
    postcode,
    telephone,
    email,
    roles
  },
  establishment: {
    name: establishmentName
  },
  ...props
}) => {
  const premises = getPremises(roles);
  return (
    <Fragment>
      <article className='profile grid-row'>
        <div className='column-two-thirds'>
          <header>
            <h2>&nbsp;</h2>
            <h1>{ name }</h1>
          </header>

          <dl className="inline">
            <dt><Snippet>establishmentName</Snippet></dt>
            <dd>{establishmentName}</dd>
            {
              pil && pil.licenceNumber && (
                <Fragment>
                  <dt><Snippet>licenceNumber</Snippet></dt>
                  <dd>{pil.licenceNumber}</dd>
                </Fragment>
              )
            }
          </dl>

          {
            (qualifications || premises || !isEmpty(roles)) && (
              <section className='profile-section'>
                <h3><Snippet>profile</Snippet></h3>
                <dl className="inline">
                  {
                    !isEmpty(roles) && (
                      <Fragment>
                        <dt><Snippet>roles</Snippet></dt>
                        <dd>
                          <ul>
                            {
                              roles.map(({ type, id }) =>
                                <li key={id}>{dictionary[type] || dictionary[type.toUpperCase()]} ({type.toUpperCase()})</li>
                              )
                            }
                          </ul>

                        </dd>
                      </Fragment>
                    )
                  }
                  {
                    qualifications && (
                      <Fragment>
                        <dt><Snippet>qualifications</Snippet></dt>
                        <dd>{qualifications}</dd>
                      </Fragment>
                    )
                  }
                  {
                    premises && (
                      <Fragment>
                        <dt><Snippet>premises</Snippet></dt>
                        <dd>
                          <ul>
                            {
                              map(premises, (p, site) =>
                                <li key={site}>
                                  {site}
                                  {
                                    map(p, (names, area) =>
                                      <Fragment key={area}>
                                        {
                                          area !== 'null'
                                            ? <Fragment>, {area} - <br /></Fragment>
                                            : <Fragment> - <br /></Fragment>
                                        }
                                        {
                                          names.join(', ')
                                        }
                                      </Fragment>
                                    )
                                  }
                                </li>
                              )
                            }
                          </ul>
                        </dd>
                      </Fragment>
                    )
                  }
                </dl>
              </section>
            )
          }
          {
            (address || telephone || email) && (
              <section className='profile-section'>
                <h3><Snippet>contactDetails.title</Snippet></h3>
                <dl className="inline">
                  {
                    address && (
                      <Fragment>
                        <dt><Snippet>contactDetails.professionalAddress</Snippet></dt>
                        <dd>{address}<br />{postcode}</dd>
                      </Fragment>
                    )
                  }
                  {
                    telephone && (
                      <Fragment>
                        <dt><Snippet>contactDetails.telephone</Snippet></dt>
                        <dd>{telephone}</dd>
                      </Fragment>
                    )
                  }
                  {
                    email && (
                      <Fragment>
                        <dt><Snippet>contactDetails.email</Snippet></dt>
                        <dd><a href={`mailto:${email}`}>{email}</a></dd>
                      </Fragment>
                    )
                  }
                </dl>
              </section>
            )
          }
        </div>
      </article>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { establishment }, item }) => ({ establishment, item });

module.exports = connect(mapStateToProps)(Index);
