import React from 'react';
import { every } from 'lodash';

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
    return (
      <div className="accordion">
        <p className="toggles"><button onClick={() => this.toggleAll()}>{ this.allOpen() ? 'Close all' : 'Open all' }</button></p>
        {
          this.props.children.map((child, i) => React.cloneElement(child, {
            onToggle: () => this.toggle(i),
            open: !this.state || this.state.open[i]
          }))
        }
      </div>
    );
  }

}

export default Accordion;
