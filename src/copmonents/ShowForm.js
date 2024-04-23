import React, { Component } from 'react';
import Order from './Order';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm.js';

class FormModals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: '',
      phone: '',
      message: '',
      ip: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.props.isLoggedIn) {
      alert('Вы должны быть зарегистрированы');
      return;
    }

    else if (!this.state.name || !this.state.phone || !this.state.message) {
      alert('Все поля должны быть заполнены');
      return;
    }

    else if (this.checkRequestsCount()) {
      fetch('http://62.217.182.98:2000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip: this.state.ip,
          name: this.state.name,
          phone: this.state.phone,
          message: this.state.message,
          order: this.props.orders.map((order) => order.id),
          email: this.props.email,
          password: this.props.password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert('Отправлено');
          this.props.onClose();
        })
        .catch((error) => {
          console.error('Ошибка:', error);
          alert('Ошибка');
        });
    } else {
      alert('Превышено количество запросов');
    }
  }

  getIPAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ip1 = data.ip;
      this.setState({ ip: ip1 }, () => {
      });
    } catch (error) {
      console.error('Ошибка при получении IP адреса:', error);
    }
  }
  checkRequestsCount = () => {
    const { ip } = this.state;
    const lastRequestTime = localStorage.getItem(`${ip}_lastRequestTime`);
    const requestsCount = localStorage.getItem(`${ip}_requestsCount`) || 0;
    const currentTime = new Date().getTime();

    if (!lastRequestTime || currentTime - lastRequestTime >= 60 * 1000 * 60 * 0) {
      localStorage.setItem(`${ip}_lastRequestTime`, currentTime);
      localStorage.setItem(`${ip}_requestsCount`, 1);
      console.log(window.localStorage.getItem('isLogin'))
      return true;
    }

    if (requestsCount >= 2) {
      return false;
    }

    localStorage.setItem(`${ip}_requestsCount`, Number(requestsCount) + 1);
    return true;
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.getIPAddress();
    }
  }

  render() {

    let sum = this.props.orders.reduce((acc, order) => acc + Number.parseFloat(order.price), 0);
    const stripePromise = loadStripe('your_stripe_public_key');
    return (
      <div className="full-item">
        <div className="modal-overlay">
          <div className="modal-content">
            <form id="feedback-form">
              <label className='name1' htmlFor="name">Имя:</label>
              <input className='name'
                type="text"
                id="name"
                name="name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                required
              />

              <label className='phone1' htmlFor="phone">Телефон:</label>
              <input
                className='phone'
                type="tel"
                id="phone"
                name="phone"
                value={this.state.phone}
                onChange={(e) => this.setState({ phone: e.target.value })}
                required
              />

              <label className='message1' htmlFor="message">Сообщение:</label>
              <textarea
                className='message'
                id="message"
                rows="10"
                name="message"
                value={this.state.message}
                onChange={(e) => this.setState({ message: e.target.value })}
                required
              ></textarea>
              {this.props.orders.map((order) => (
                <Order key={order.id} item={order} onDelete={this.props.onDeleteOrder} />
              ))}

              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
              <button type='submit' onClick={this.handleSubmit}>Отправить</button>
              <p className="sum">Сумма: {new Intl.NumberFormat().format(sum)}$</p>
              <div className='closeButton' onClick={this.props.onClose}>×</div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default FormModals