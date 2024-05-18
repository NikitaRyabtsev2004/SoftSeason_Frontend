import React, { Component } from 'react'
import Item from './Item.js'
export class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const shuffledItems = [...this.props.items].sort(() => Math.random() - 0.5);
    return (
      <main>
        {shuffledItems.map(el => (
          <Item onShowItem={this.props.onShowItem} key={el.id} item={el} onAdd={this.props.onAdd} />
        ))}
      </main>
    )
  }
}

export default Items