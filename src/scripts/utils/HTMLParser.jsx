import React from 'react';

class HTMLRenderer extends React.Component {
  createMarkup() {
    return { __html: this.props.htmlCode };
  }

  render() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}

export default HTMLRenderer;
