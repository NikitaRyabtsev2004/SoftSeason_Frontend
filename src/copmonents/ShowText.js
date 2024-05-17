import React, { Component } from 'react';

export class ShowText extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: false };
  }

  toggleText = () => {
    this.setState({ showText: !this.state.showText });
  }

  render() {
    const { textToShow } = this.props;

    return (
      <div className='button-88-container'>
        <button className='button-88' onClick={this.toggleText}>
          {this.state.showText ? `\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Скрыть описание\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0` : `Показать полное описание`}
        </button>
        {this.state.showText && <p className="animated-text">{textToShow}</p>}
      </div>
    );
  }
}

export default ShowText;