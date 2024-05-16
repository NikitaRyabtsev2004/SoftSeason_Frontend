import React from "react";
import Header from "./copmonents/Header.js";
import Footer from "./copmonents/Footer.js";
import Items from "./copmonents/items.js";
import Categories from "./copmonents/Categories.js";
import ShowFullItem from "./copmonents/ShowFullItem.js";
import FormModal from "./copmonents/ShowForm.js";
import LoginModal from "./copmonents/LoginForm.js";
import items from "./source/ProductData.js";
import Conditions from "./files/Условия.js"
import Requsites from "./files/Рекввиизиты.js";
import Politics from "./files/Политика.js"
class App extends React.Component {
  constructor(props) {
    super(props)
    this.headerRef = React.createRef();
    const isLoggedIn = localStorage.getItem('isLogin') === 'true';
    const email = localStorage.getItem('email');
    const isDark = localStorage.getItem('isDark') === 'true';
    this.state = {
      orders: [],
      currentItems: [],
      items: items,
      showFullItem: false,
      fullItem: {},
      cartVisible: false,
      isFormModalOpen: false,
      isOpen: false,
      isLoginModalOpen: false,
      email: email || '',
      password: '',
      isLoggedIn: isLoggedIn,
      isDark: isDark,
      isOpenFooter: false,
      isOpenConditions: false,
      isOpenPolitics: false,
      isOpenRequsites: false,
    }
    this.state.currentItems = this.state.items
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrderr = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDarkTheme = this.handleDarkTheme.bind(this);
  }

  handleOpenPdf1 = () => {
    window.open('https://disk.yandex.ru/i/YStEn-of5eDmRQ', '_blank');
  };

  handleOpenPdf2 = () => {
    window.open('https://disk.yandex.ru/i/rExZsJ3jMwL9IA', '_blank');
  };

  handleOpenPdf3 = () => {
    window.open('https://disk.yandex.ru/i/4CZW3KM5clUAFg', '_blank');
  };

  createConfetti(maxConfettis = 70, flyTime = 5000) {
    const container = document.querySelector(".confetti-container");
    const pastelColors = ["#FFB6C1", "#FFD700", "#98FB98", "#87CEFA", "#FFA07A"];
    const maxConfettiTypes = 13;

    const createOneConfetti = () => {
      const confetti = document.createElement("div");
      const confettiNumber = Math.floor(Math.random() * maxConfettiTypes) + 1;
      const confettiClass = `confetti${confettiNumber}`;
      confetti.classList.add(confettiClass);
      confetti.style.color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.height = "80px";
      confetti.style.width = "80px";
      confetti.style.position = "absolute";
      confetti.style.backgroundSize = "contain";
      container.appendChild(confetti);

      confetti.style.animation = `appearAndDisappear 2s forwards`;
      setTimeout(() => {
        confetti.style.animation = `disappear 2s forwards`;
        setTimeout(() => {
          container.removeChild(confetti);
        }, 10000);
      }, 4000);
    };

    const addConfetti = () => {
      if (container.children.length < maxConfettis) {
        createOneConfetti();
        setTimeout(addConfetti, 400);
      }
    };

    addConfetti();
  }

  handleDarkTheme() {
    const newIsDark = !this.state.isDark;
    this.setState({ isDark: newIsDark }, () => {
      localStorage.setItem('isDark', newIsDark);
    });
  }

  // В App.js
  handleScrollInHeader = () => {
    this.headerRef.current.handleScroll();
  };


  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollInHeader);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('storage', this.handleStorageChange);
    this.createConfetti();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollInHeader);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('storage', this.handleStorageChange);
  }

  handleStorageChange = (event) => {
    if (event.key === 'isLogin' || event.key === 'email') {
      const isLoggedIn = localStorage.getItem('isLogin') === 'true';
      const email = localStorage.getItem('email');
      this.setState({ isLoggedIn, email });
    }
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  }
  handleFormClose = () => {
    this.setState({ isOpen: false });
  }

  openLoginModal = () => {
    this.setState({ isLoginModalOpen: true });
  }
  closeLoginModal = () => {
    this.setState({ isLoginModalOpen: false });
  }

  handleEmailChange = (email) => {
    this.setState({ email });
    localStorage.setItem('email', email)
  }
  handlePasswordChange = (password) => {
    this.setState({ password });
  }

  handleLogout = () => {
    this.setState({ email: '', password: '', isLoggedIn: false }, () => {
      localStorage.setItem('email', '');
      localStorage.setItem('isLogin', false);
    });
    console.log(this.props.isLoggedIn)
  }

  handleLogin = (email) => {
    this.setState({ email, isLoggedIn: true }, () => {
      localStorage.setItem('email', email);
      localStorage.setItem('isLogin', true);
    });
  }

  handleFormOpenFooter = () => {
    this.setState({ isOpenFooter: true });
  };

  handleFormCloseFooter = () => {
    this.setState({ isOpenFooter: false });
  };

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
  };

  handleFormOpenRequsites = () => {
    this.setState({ isOpenRequsites: true });
  };

  handleFormCloseRequsites = () => {
    this.setState({ isOpenRequsites: false });
  };

  render() {
    const { isOpenFooter } = this.state;
    const { isOpenConditions } = this.state;
    const { isOpenPolitics } = this.state;
    const { isOpenRequsites } = this.state;
    return (
      <div className={this.state.isDark ? "darkTheme" : ""}>
        <div className='wrapper'>
          <div className="confetti-container"></div>

          <Header ref={this.headerRef}
            handleDarkTheme={this.handleDarkTheme}
            email={this.state.email}
            orders={this.state.orders}
            onDelete={(id) => this.deleteOrder(id)}
            toggleCartVisibility={this.toggleCartVisibility}
            cartVisible={this.state.cartVisible}
            handleFormOpen={this.handleFormOpen}
            openLoginModal={this.openLoginModal}
            handleLogout={this.handleLogout}
            isLoggedIn={this.state.email !== ''}
          />
          {this.state.isOpen && <FormModal
            orders={this.state.orders}
            onDeleteOrder={this.onDeleteOrder}
            onAddOrder={this.onAddOrder}
            isOpen={this.handleFormOpen}
            onClose={this.handleFormClose}
            email={this.state.email}
            password={this.state.password}
            isLoggedIn={this.state.isLoggedIn}
          />}

          {this.state.isLoginModalOpen && <LoginModal
            isOpen={this.state.isLoginModalOpen}
            onClose={this.closeLoginModal}
            onEmailChange={this.handleEmailChange}
            onPasswordChange={this.handlePasswordChange}
            onLogin={this.handleLogin}
          />}

          <Categories chooseCategory={this.chooseCategory} />

          <div className="top-presentation">
            <div className="text-all">
              <div className="text-1">Добро пожаловать в «SoftSeason©»!</div>
              <div className="text-1-1" style={{ userSelect: "none" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;«SoftSeason©»! – это ваш уютный оазис стиля и комфорта в мире женской трикотажной одежды. В «SoftSeason©» мы понимаем, что красота скрывается в простоте и удобстве. Наша цель - помочь вам выглядеть стильно, не жертвуя комфортом. Мы предлагаем широкий выбор трикотажных изделий, которые подчеркнут вашу индивидуальность в повседневной жизни.</div>
              <div className="text-2" style={{ userSelect: "none" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;От уютных свитеров до теплых кардиганов в «SoftSeason©» вы найдете все необходимое для создания многофункциональных образов на любой случай. Наша одежда изготовлена из мягких и качественных материалов, чтобы обеспечить вам максимальный комфорт в течение всего дня.</div>
              <div className="text-2-1">В мире «SoftSeason©» каждый сезон – это повод обновить свой стиль и насладиться мягкими ощущениями!</div>
            </div>
          </div>

          <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder} />
          {this.state.showFullItem && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem}/>}
          {isOpenFooter && (
            <div className="full-item">
              <div className='review'>
                <div className="modal-content">
                  <div className='footer-information' style={{ fontSize: '20px', fontStyle: 'normal', marginBottom: '20px' }}>Нажмите чтобы ознакомиться:</div>
                  <button style={{ fontSize: '18px', fontWeight: '400', marginRight: '20px', marginBottom: '20px', width: '100%' }} onClick={this.handleFormOpenRequsites}>Раздел реквизиты</button>
                  <button style={{ fontSize: '18px', fontWeight: '400', marginRight: '20px', marginBottom: '20px', width: '100%' }} onClick={this.handleFormOpenConditions}>Условия</button>
                  <button style={{ fontSize: '18px', fontWeight: '400', marginBottom: '20px', width: '100%' }} onClick={this.handleFormOpenPolitics}>Политика конфиденциальности и обработки персональных данных сайта</button>
                  <div className='closeButton' onClick={this.handleFormCloseFooter}>✖</div>
                </div>
              </div>
            </div>
          )}
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
          {isOpenRequsites && (
            <div className="full-item">
              <div className='review'>
                <div className="modal-content">
                  <Requsites/>
                  <div className='closeButton' onClick={this.handleFormCloseRequsites}>✖</div>
                </div>
              </div>
            </div>
          )}
          <div className='bottom-presentation'>
            <div className="bottom-button" onClick={this.handleFormOpenFooter}>Ознакомиться с условиями и правовой информацией</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  toggleCartVisibility = () => {
    this.setState(prevState => {
      if (!prevState.cartVisible) {
      }
      return { cartVisible: !prevState.cartVisible }
    });
  }

  onShowItem(item) {
    this.setState({ fullItem: item })
    this.setState({ showFullItem: !this.state.showFullItem })
  }

  chooseCategory(categoryOr) {
    window.scrollTo(0, 1000);
    if (categoryOr === 'all') {
      this.setState({ currentItems: this.state.items })
      return
    }

    this.setState({
      currentItems: this.state.items.filter(el => el.category === categoryOr || el.material === categoryOr || el.color === categoryOr)
    })
  }


  deleteOrder = (id) => {
    this.setState(prevState => {
      const itemIndex = prevState.orders.findIndex(el => el.id === id);
      if (itemIndex !== -1) {
        const newOrders = [...prevState.orders];
        newOrders.splice(itemIndex, 1);
        return { 
          orders: newOrders,
      };
    }
      return prevState;
    });
  };

  addToOrder = (item) => {
    const itemIndex = this.state.orders.findIndex(el => el.id === item.id);
    if (itemIndex === -1) {
      this.setState(prevState => ({
        orders: [...prevState.orders, item],
      }));
    }
  };

}

export default App;