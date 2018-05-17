const React = require('react');
const Layout = require('./layouts/default');

class Index extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <h1 className="heading-large">{this.props.error.message}</h1>
        <pre>
          {this.props.error.stack}
        </pre>
      </Layout>
    );
  }
}

module.exports = Index;
