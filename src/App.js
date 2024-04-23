import React from "react";
import Header from "./copmonents/Header.js";
import Footer from "./copmonents/Footer.js";
import Items from "./copmonents/items.js";
import Categories from "./copmonents/Categories.js";
import ShowFullItem from "./copmonents/ShowFullItem.js";
import FormModal from "./copmonents/ShowForm.js";
import LoginModal from "./copmonents/LoginForm.js";
import items from "./copmonents/ProductData.js";
//<div className='presentation'></div>
class App extends React.Component {
  constructor(props) {
    super(props)
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

  createConfetti() {
    const container = document.querySelector(".confetti-container");
    const numConfettis = 300;
    const pastelColors = ["#FFB6C1", "#FFD700", "#98FB98", "#87CEFA", "#FFA07A"];
    const maxConfettiTypes = 13; // Максимальное количество типов клубочков

    const createOneConfetti = () => {
      const confetti = document.createElement("div");
      const confettiNumber = Math.floor(Math.random() * maxConfettiTypes) + 1;
      const confettiClass = `confetti${confettiNumber}`;
      confetti.classList.add(confettiClass);
      confetti.style.color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.height = "80px";
      confetti.style.width = "80px";
      confetti.style.position = "absolute";
      confetti.style.backgroundSize = "contain"
      container.appendChild(confetti);

      setTimeout(() => {
        confetti.style.animationName = "fadeOut";
        setTimeout(() => {
          container.removeChild(confetti);
        }, 5000);
      }, 200000);
    };


    const addConfetti = () => {
      if (container.children.length < numConfettis) {
        createOneConfetti();
        setTimeout(addConfetti, 4000);
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

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('storage', this.handleStorageChange);
    this.createConfetti();
  }

  componentWillUnmount() {
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

  render() {
    return (
      <div className={this.state.isDark ? "darkTheme" : ""}>
        <div className='wrapper'>
          <div className="confetti-container"></div>

          <Header
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



          <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder} />
          {this.state.showFullItem && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem} />}

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

  chooseCategory(category) {
    window.scrollTo(0, 400);
    if (category === 'all') {
      this.setState({ currentItems: this.state.items })
      return
    }
    this.setState({
      currentItems: this.state.items.filter(el => el.category === category)
    })
  }

  deleteOrder = (id) => {
    this.setState(prevState => {
      const itemIndex = prevState.orders.findIndex(el => el.id === id);
      if (itemIndex !== -1) {
        const newOrders = [...prevState.orders];
        newOrders.splice(itemIndex, 1);
        return { orders: newOrders };
      }
      return prevState;
    });
  };

  addToOrder = (item) => {
    const itemIndex = this.state.orders.findIndex(el => el.id === item.id);
    if (itemIndex === -1) {
      this.setState(prevState => ({
        orders: [...prevState.orders, item]
      }));
    }
  };

}

export default App;