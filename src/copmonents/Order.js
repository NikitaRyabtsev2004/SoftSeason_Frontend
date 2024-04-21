import React, { Component } from 'react'

export class Order extends Component {
    animateAndDelete = (id) => {
        let element = document.getElementById(id);
        element.style.opacity = "0";
        element.style.height = "0px";
        setTimeout(() => this.props.onDelete(id), 500);
    }

    render() {
        return (
            <>
                <div className='item' id={this.props.item.id}>
                    <h2>{this.props.item.title}</h2>
                    <img src={"./img/" + this.props.item.img[0]} alt={this.props.item.title} />
                    <b>{this.props.item.price}$</b>
                    <span className="close rounded heavy" onClick={() => this.animateAndDelete(this.props.item.id)}></span>
                </div>
            </>
        );
    }
}

export default Order