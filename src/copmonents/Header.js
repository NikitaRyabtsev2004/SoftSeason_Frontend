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
        };
        this.handleFormOpen = this.handleFormOpen.bind(this);
    }

    handleFormOpen = () => {
        this.setState(prevState => ({
            isFormModalOpen: !prevState.isFormModalOpen
        }));
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
                        <p className="sum">Сумма: {new Intl.NumberFormat().format(sum)}$</p>
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
                        <div style={{ display: "flex", justifyContent: "" }}>
                            <div style={{ userSelect: "none" }} className="cart-container">
                                <FaShoppingCart onClick={() => { this.setState({ cartOpen: !this.state.cartOpen }); this.props.toggleCartVisibility(); }} className={`shop-cart-button ${this.state.cartOpen && 'active'}`} />
                                {this.state.cartOpen !== null && (
                                    <div class="shop-cart-container">
                                        <div className={`shop-cart ${this.state.cartOpen ? '' : 'close'}`}>
                                            {this.props.orders.length > 0 ? showOrders(this.props) : showNothing()}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div style={{ userSelect: "none" }} className='buy' onClick={this.props.handleFormOpen}>Оставить заявку</div>
                            <ul style={{ userSelect: "none" }} className='nav'>
                                {this.props.isLoggedIn ? (
                                    <>
                                        <li>{this.state.email}</li>
                                        <li></li>
                                    </>
                                ) : (
                                    <li onClick={this.props.openLoginModal}>Войти</li>
                                )}
                                <li onClick={this.props.handleLogout}>Выйти</li>
                                <li onClick={this.props.handleDarkTheme}>Поменять тему</li>
                            </ul>
                        </div>
                    </div>
                </header>
            </>
        );
    }
}

export default Header;