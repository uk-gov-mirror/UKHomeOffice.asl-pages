import React, { Component, Fragment } from 'react';

class AddAnother extends Component {

  constructor(props) {
    super(props);
    this.addAnother = this.addAnother.bind(this);
  }

  componentDidMount() {
    const visible = Array(this.props.totalCount).fill(false);
    visible.fill(true, 0, this.props.visibleCount);
    this.setState({ visible });
  }

  addAnother(e) {
    e.preventDefault();
    const visible = [ ...this.state.visible ];
    visible[visible.lastIndexOf(true) + 1] = true;
    this.setState({ visible });
  }

  render() {
    const {
      children,
      label,
      totalCount
    } = this.props;
    const visible = (this.state && this.state.visible) || Array(totalCount).fill(false);
    return (
      <Fragment>
        {visible.map((val) => {
          return val ? children : null;
        })}
        <div><a href="#" onClick={e => this.addAnother(e)}>{label}</a></div>
      </Fragment>
    );
  }
}

export default AddAnother;
