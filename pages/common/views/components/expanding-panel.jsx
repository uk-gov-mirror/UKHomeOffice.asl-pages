import React from 'react';

class ExpandingPanel extends React.Component {

  componentDidMount() {
    this.setState({ open: false });
  }

  controlled() {
    return typeof this.props.open === 'boolean';
  }

  toggle () {
    if (this.controlled()) {
      return this.props.onToggle();
    }
    return this.setState({ open: !this.state.open });
  }

  isOpen() {
    if (this.controlled()) {
      return this.props.open;
    }
    return !this.state || this.state.open;
  }

  render() {
    return (
      <section className={`expanding-panel${this.isOpen() ? ' open' : ''}`}>
        <header onClick={() => this.toggle()}>
          <h3>{ this.props.title }</h3>
        </header>

        { this.isOpen() && <div className="content">{ this.props.children }</div> }
      </section>
    );
  }

}

export default ExpandingPanel;
