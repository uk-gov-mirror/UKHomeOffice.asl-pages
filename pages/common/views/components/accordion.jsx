import React from 'react';
import { every, castArray } from 'lodash';

class Accordion extends React.Component {

  componentDidMount() {
    const open = this.props.children.map(() => false);
    this.setState({ open });
  }

  toggle(i) {
    const open = this.state.open;
    open[i] = !open[i];
    this.setState({ open });
  }

  allOpen() {
    const open = this.state ? this.state.open : [];
    return every(open);
  }

  toggleAll() {
    if (this.allOpen()) {
      return this.setState({ open: this.state.open.map(() => false) });
    }
    return this.setState({ open: this.state.open.map(() => true) });
  }

  render() {
    let { closeAll, openAll } = this.props;
    closeAll = closeAll || 'Close all';
    openAll = openAll || 'Open all';
    return (
      <div className="accordion">
        <p className="toggles"><button onClick={() => this.toggleAll()}>{ this.allOpen() ? closeAll : openAll }</button></p>
        {
          castArray(this.props.children).map((child, i) => child && React.cloneElement(child, {
            key: i,
            onToggle: () => this.toggle(i),
            open: !this.state || this.state.open[i]
          }))
        }
      </div>
    );
  }

}

export default Accordion;
