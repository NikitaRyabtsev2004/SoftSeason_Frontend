import React, { Component } from 'react';
import ShowText from './ShowText.js';

export class ShowFullItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false,
      currentImageIndex: 0,
      zoomed: false,
      mouseX: 0,
      mouseY: 0,
    };
  }

  toggleDescription = () => {
    this.setState({ showDescription: !this.state.showDescription, currentImageIndex: 0 });
  }

  nextImage = () => {
    const { currentImageIndex } = this.state;
    const lastIndex = this.props.item.img.length - 1;
    if (currentImageIndex < lastIndex) {
      this.setState({ currentImageIndex: currentImageIndex + 1 });
    } else {
      this.setState({ currentImageIndex: 0 });
    }
  }

  prevImage = () => {
    const { currentImageIndex } = this.state;
    const lastIndex = this.props.item.img.length - 1;
    if (currentImageIndex > 0) {
      this.setState({ currentImageIndex: currentImageIndex - 1 });
    } else {
      this.setState({ currentImageIndex: lastIndex });
    }
  }


  handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.setState({
      zoomed: !this.state.zoomed,
      mouseX: x,
      mouseY: y,
    });
  }
  handleMouseMove = (e) => {
    if (this.state.zoomed) {
      const { clientX, clientY } = e;
      const rect = e.currentTarget.getBoundingClientRect();
      const imgRect = e.target.getBoundingClientRect();
      const maxX = imgRect.width - (imgRect.width / this.state.zoomFactor);
      const maxY = imgRect.height - (imgRect.height / this.state.zoomFactor);
      const mouseX = Math.min(Math.max(clientX - rect.left, 0), maxX);
      const mouseY = Math.min(Math.max(clientY - rect.top, 0), maxY);

      this.setState({ mouseX, mouseY });
    }
  }

  render() {

    const { zoomed, mouseX, mouseY } = this.state;
    const { item } = this.props;
    const imageSrc = "./imgOriginal/" + item.img[this.state.currentImageIndex];
    const zoomFactor = 3;
    if (!item.img || item.img.length === 0) {
      return <div>No images available.</div>;
    }
    return (
      <div className='full-item' onMouseMove={this.handleMouseMove}>
        <div>
          <div className='img-hidden'>
            <img
              src={imageSrc}
              alt={item.title}
              onClick={this.handleImageClick}
              style={{
                cursor: zoomed ? 'zoom-out' : 'zoom-in',
                transform: zoomed ? `scale(${zoomFactor})` : 'scale(1)',
                transformOrigin: `${mouseX}px ${mouseY}px`,
                overflow: zoomed ? 'visible' : 'hidden',
                top: 0,
                left: 0,
              }}
            />
          </div>
          {item.img.length > 1 && (
            <div className='next-previous'>
              <div className='previous' style={{ fontStyle: 'normal' }} onClick={this.prevImage}>&#5130;</div>
              <div className='next' style={{ fontStyle: 'normal' }} onClick={this.nextImage}>&#5125;</div>
            </div>
          )}
          <h2>{item.title}</h2>
          <div>
            <ShowText textToShow={item.desc} />
          </div>
          <b>{item.price} ₽</b>
          <div className='closeButton' onClick={() => this.props.onShowItem(item)}>✖</div>
          <div className='add-to-cart' onClick={() => this.props.onAdd(item)}>＋</div>
        </div>
      </div>
    )
  }
}

export default ShowFullItem;
