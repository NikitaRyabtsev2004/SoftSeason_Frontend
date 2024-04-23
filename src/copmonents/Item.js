import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        };
    }
    handleImageClick = () => {
        this.setState(prevState => ({
            isClicked: !prevState.isClicked
        }));
    };

    render() {
        return (
            <div className='item'>
                <div className='image-container'>
                    <div className='mainImg'>
                        <LazyLoadImage
                            className='img'
                            src={"./img/" + this.props.item.img[0]}
                            alt={this.props.item.title}
                            effect="blur"
                            onClick={() => this.props.onShowItem(this.props.item)} />
                    </div>
                    <LazyLoadImage
                        className={`${this.state.isClicked ? 'img1-click' : 'img1'}`}
                        src={"./imgMacro/" + this.props.item.imgMacro[0]}
                        alt={this.props.item.title}
                        effect="blur"
                        onClick={this.handleImageClick}
                    />
                    <h2>{this.props.item.title}</h2>
                    <p>{this.props.item.desc}</p>
                    <b>{this.props.item.price}$</b>
                    <div className='add-to-cart' onClick={() => { alert(`${this.props.item.title} был добавлен в корзину `); this.props.onAdd(this.props.item); }}>+</div>
                </div>
            </div >
        );
    }
}

export default Item