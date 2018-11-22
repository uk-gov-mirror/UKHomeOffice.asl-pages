import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import {
  Search,
  Datatable,
  FilterSummary,
  LinkFilter,
  Acronym,
  Snippet,
  Join,
  Link,
  Header
} from '@asl/components';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym>{data}</Acronym>;
};

export const formatters = {
  name: {
    format: (name, person) => <Link page="profile.view" profileId={person.id} label={ name } />
  },
  roles: {
    accessor: row => row.roles && row.roles.map(v => v.type),
    format: data => data && joinAcronyms(data.map(d => d.toUpperCase()))
  },
  pil: {
    format: data => data || '-'
  }
};

const PeopleList = () => (
  <Fragment>
    <Header
      title={<Snippet>pages.profile.list</Snippet>}
      subtitle={name}
    />
    <Search label={<Snippet>searchText</Snippet>} />
    <LinkFilter
      prop="roles"
      formatter={filter => <Acronym>{filter.toUpperCase()}</Acronym>}
      append={['pilh', 'pplh']}
    />
    <div className="table-heading">
      <FilterSummary />
    </div>
    <Datatable formatters={formatters} />
  </Fragment>
);

class Tabs extends Component {
  componentDidMount() {
    this.tabClicked = this.tabClicked.bind(this);
  }

  tabClicked(tab) {

  }

  tabHidden(tab) {
    // return this.state ? this.state.tab !== tab :
  }

  render() {
    const { tabs } = this.props;
    return (
      <section className="govuk-tabs">
        <nav>
          <ul>
            {
              Object.keys(tabs).map(tab => (
                <li>
                  <a href="#" onClick={(e) => {
                    e.preventDefaut();
                    this.tabClicked(tab);
                  }}>{tab}</a>
                </li>
              ))
            }
          </ul>
        </nav>
        {
          Object.keys(tabs).map(tab => (
            <div className={classnames('tab', { hidden: this.tabHidden(tab) })}></div>
          ))
        }
      </section>
    )
  }
}

const People = ({
  establishment: { name },
  allowedActions,
  ...props
}) => (
  <Fragment>
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.profile.list</Snippet></h1>
    </header>
    {
      allowedActions.includes('profile.invite') && (
        <Link page="profile.invite" label={<Snippet>invite</Snippet>} />
      )
    }
    <Tabs tabs={{active: {}, invited: {}}} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, allowedActions } }) => ({ establishment, allowedActions });

export default connect(mapStateToProps)(People);
