import React, { Component } from 'react';
import Order from './Order';

class FormModals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: '',
      phone: '',
      message: '',
      address: '',
      ip: '',
      checkboxesChecked: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.props.isLoggedIn) {
      alert('Вы должны быть зарегистрированы');
      return;
    }

    else if (!this.state.name || !this.state.phone) {
      alert('Все поля должны быть заполнены');
      return;
    }

    else if (!this.state.checkboxesChecked) {
      alert('Необходимо отметить галочки');
      return;
    }

    else if (this.checkRequestsCount()) {
      fetch('http://localhost:2000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip: this.state.ip,
          name: this.state.name,
          phone: this.state.phone,
          address: this.state.address,
          message: this.state.message,
          order: this.props.orders.map((order) => order.id),
          email: this.props.email,
          password: this.props.password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert('Отправлено1');
          this.props.onClose();
          ////////////////
          fetch('http://localhost:2000/sendMail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ip: this.state.ip,
              name: this.state.name,
              phone: this.state.phone,
              address: this.state.address,
              message: this.state.message,
              order: this.props.orders.map((order) => order.id),
              email: this.props.email,
              password: this.props.password,
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch((error) => {
              console.error('Ошибка:', error);
              alert('Ошибка');
            });
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
      console.error('ERROR IP:', error);
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
    return (
      <>
        <div className="full-item">
          <div className="modal-overlay">
            <div className='cat'></div>
            <div className="modal-content">
              <form id="feedback-form">
                <label className='name1' htmlFor="name">Имя :
                  <div className='show-form-desc'>Как к вам обращаться?</div>
                </label>
                <input className='name'
                  type="text"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  required
                />

                <label className='phone1' htmlFor="phone">Телефон :
                  <div className='show-form-desc'>Ваш номер телефона для обратной связи</div>
                </label>
                <input
                  className='phone'
                  type="tel"
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  required
                />

                <label className='address1' htmlFor="adress">Адрес :
                  <div className='show-form-desc'>Пожалуйста, введите ваш адрес для доставки</div>
                </label>
                <input
                  className='address'
                  type="address"
                  id="address"
                  name="address"
                  value={this.state.address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                  required
                />

                <label className='message1' htmlFor="message">Сообщение :
                  <div className='show-form-desc'>Коментарий или пожелание(можно оставить без изменений)</div>
                </label>
                <textarea
                  className='message'
                  id="message"
                  rows="10"
                  name="message"
                  value={this.state.message}
                  onChange={(e) => this.setState({ message: e.target.value })}
                  required=""
                ></textarea>
                {this.props.orders.map((order) => (
                  <Order key={order.id} item={order} onDelete={this.props.onDeleteOrder} />
                ))}
                <button type='submit' onClick={this.handleSubmit}>Отправить</button>
                <p className="sum">Сумма: {new Intl.NumberFormat().format(sum)}₽</p>
                <div className='closeButton' onClick={this.props.onClose}>✖</div>
                <div className='-color-' style={{ userSelect: "none"}}>-</div>
                <label className='message1' htmlFor="message">Важно :

                  <label htmlFor="important1">1) В почтовом письме будет указанно как осуществляется оплата товара</label>
                  <label htmlFor="important2">2) Просим вносить все данные корректно, в случае если вы уже оформили заказ и указали информацию неверно то можете переоформить заказ заново, после вам прийдет новое письмо на почту</label>
                  <label htmlFor="important3">3) Доставка осуществляется только логистическим оператором СДЭК(CDEK)</label>
                  <button type="button" onClick={() => this.setState({ checkboxesChecked: !this.state.checkboxesChecked })}>Нажмите если согласны с нижеуказанным</button>
                  <div className='show-form-desc-al'>
                    <label htmlFor="important1">1) Политика конфиденциальности и обработки персональных данных сайта</label>
                    <input type="checkbox" id="important1" name="important1" checked={this.state.checkboxesChecked} disabled />
                  </div>
                  <div className='show-form-desc-al'>
                    <label htmlFor="important2">2) Условия</label>
                    <input type="checkbox" id="important2" name="important2" checked={this.state.checkboxesChecked} disabled />
                  </div>
                </label>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default FormModals