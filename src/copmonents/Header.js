import React, { Component } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Order from "./Order";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOpen: false,
      isFormModalOpen: false,
      email: props.email || localStorage.getItem('email') || '',
      theme: false,
      shouldRenderCart: false,
    };
    this.timer = null;
    this.handleFormOpen = this.handleFormOpen.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartVisible !== this.props.cartVisible) {
      if (this.props.cartVisible) {
        clearTimeout(this.timer);
        this.setState({ shouldRenderCart: true });
        setTimeout(() => this.setState({ cartOpen: true }), 0);
      } else {
        this.setState({ cartOpen: false });
        this.timer = setTimeout(() => this.setState({ shouldRenderCart: false }), 1500);
      }
    }
  }

  handleFormOpen = () => {
    this.setState(prevState => ({
      isFormModalOpen: !prevState.isFormModalOpen
    }));
  }

  handleScroll = () => {
    if (this.state.cartOpen === true) {
      this.setState({ cartOpen: false });
      this.props.toggleCartVisibility();
    }
  }

  render() {
    const showOrders = (props) => {
    let sum = 0;
    props.orders.forEach(el => sum += Number.parseFloat(el.price));
      return (
        <div>
          <div>
            {props.orders.map(el => (
              <Order onDelete={props.onDelete} key={el.id} item={el} />
            ))}
            <p className="sum">Сумма: {new Intl.NumberFormat().format(sum)} ₽</p>
            <div style={{ userSelect: "none" }} className='buy' onClick={this.props.handleFormOpen}>Заказать</div>
          </div>
        </div>
      );
    };

    const showNothing = () => {
      return (
        <div className='empty'>
          <h2>Корзина пуста</h2>
        </div>
      );
    };

    return (
      <> 
        <header>
          <div className='upHeader' >
            <span style={{ userSelect: "none" }} className='logo'>SoftSeason</span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "" }}>
              <div style={{ userSelect: "none" }} className="cart-container">
                {this.state.shouldRenderCart && (
                  <div className="shop-cart-container">
                    <div className={`shop-cart ${this.state.cartOpen ? '' : 'close'}`}>
                      {this.props.orders.length > 0 ? showOrders(this.props) : showNothing()}
                    </div>
                  </div>
                )}
              </div>
              <ul style={{ userSelect: "none" }} className='nav'>
                <li onClick={() => { this.setState({ cartOpen:!this.state.cartOpen }); console.log(this.state.cartOpen); this.props.toggleCartVisibility(); }}>
                  <FaShoppingCart /> {this.props.orders.length === 0 ? '' : this.props.orders.length} Корзина 
                </li>
                <li onClick={this.props.handleDarkTheme}>Поменять тему</li>
                {this.props.isLoggedIn ? (
                  <>
                    <li>{localStorage.getItem('email')}</li>
                    <li onClick={this.props.handleLogout}>Выйти</li>
                  </>
                ) : (
                  <li onClick={this.props.openLoginModal}>Войти | Зарегестрироваться</li>
                )}
              </ul>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
