import React, { Component } from 'react';
import Order from './Order';
import Conditions from "../files/Условия.js"
import Politics from "../files/Политика.js"
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
      isOpenConditions: false,
      isOpenPolitics: false,
      isClicked:false,
    };
    this.targetRef = React.createRef();
    this.copyToClipboardRef = React.createRef();
  }

  handleFormOpenConditions = () => {
    this.setState({ isOpenConditions: true });
  };

  handleFormCloseConditions = () => {
    this.setState({ isOpenConditions: false });
  };

  handleFormOpenPolitics = () => {
    this.setState({ isOpenPolitics: true });
  };

  handleFormClosePolitics = () => {
    this.setState({ isOpenPolitics: false });
  }

  handleScrollToTarget = () => {
    this.targetRef.current.scrollIntoView({ behavior: "smooth" });
  }

  checkBoxButton = () => {
    this.setState({isClicked: !this.state.isClicked})
    this.setState({checkboxesChecked: !this.state.checkboxesChecked })
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
      this.handleScrollToTarget();
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
    const { isOpenConditions } = this.state;
    const { isOpenPolitics } = this.state;
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
                  style={{maxHeight:"250px", minHeight:"150px", overflowX:"hidden"}}
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
          
                <p className="sum">Сумма: {new Intl.NumberFormat().format(sum)}₽</p>
                <div className='closeButton' onClick={this.props.onClose}>✖</div>
                <label  style={{marginTop:"40px"}} className='message1' htmlFor="message">Важно :
                  <div> 
                  <label className='important' htmlFor="important1">1) В почтовом письме будет указанно как осуществляется оплата товара</label>
                  <label className='important' htmlFor="important2">2) Просим вносить все данные корректно, в случае если вы уже оформили заказ и указали информацию неверно то можете переоформить заказ заново, после вам прийдет новое письмо на почту</label>
                  <label className='important' htmlFor="important3">3) Доставка товаров осуществляется следующими логистическими службами: СДЭК, Boxbery, PickPoint.
                  </label>
                  <label style={{marginTop:"40px", marginBottom:"20px"}} className='message1' htmlFor="message">Осуществляя заказ вы подтверждаете своё согласие с:</label>
                    <div style={{display:"flex", flexDirection:"column"}}>
                      <div style={{display:"flex",}}>
                        <div className='show-form-desc-al'>
                          <label className={`${this.state.isClicked ? 'clicked' :'important-text'}`} style={{cursor:"pointer"}} onClick={this.handleFormOpenPolitics} htmlFor="important1">1) Политика конфиденциальности и обработки персональных данных сайта</label>
                          <input type="checkbox"  style={{color:"green"}}id="important1" name="important1" checked={this.state.checkboxesChecked} disabled />
                        </div>
                        <div className='show-form-desc-al'>
                          <label className={`${this.state.isClicked ? 'clicked' :'important-text'}`} style={{cursor:"pointer"}} onClick={this.handleFormOpenConditions} htmlFor="important2">2) Условия купли-продажи, заказа и возврата товаров на сайте</label>
                          <input type="checkbox" id="important2" name="important2" checked={this.state.checkboxesChecked} disabled />
                        </div>
                      </div>
                    <button style={{marginBottom:"20px", marginTop:"20px"}} ref={this.targetRef} type="button" onClick={this.checkBoxButton}>Я согласен(а)</button>
                    <button type='submit' onClick={this.handleSubmit}>Заказать</button>
                    </div>
                  </div>
                </label>
                {isOpenConditions && (
                <div className="full-item">
                  <div className='review'>
                    <div className="modal-content">
                      <Conditions/>
                      <div className='closeButton' onClick={this.handleFormCloseConditions}>✖</div>
                    </div>
                  </div>
                </div>
                )}
                {isOpenPolitics && (
                  <div className="full-item">
                    <div className='review'>
                      <div className="modal-content">
                        <Politics/>
                        <div className='closeButton' onClick={this.handleFormClosePolitics}>✖</div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default FormModals