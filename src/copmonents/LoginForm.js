// LoginModal.js
import React, { Component } from 'react';
import { jwtDecode } from 'jwt-decode';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        const isLoggedIn = localStorage.getItem('isLogin') === 'true';
        const email = localStorage.getItem('email');
        this.state = {
            email: email || '',
            password: '',
            isLoggedIn: isLoggedIn,
            verifyCode: '',
            showVerificationForm: false,
            SubmitButton: false,
            emailValid: false,
            passwordValid: false,
            showChangePasswordForm: false,
            changePassword: false,
            userId: '',
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.verifyCodeSend();
    }

    handleVerifySubmit = (event) => {
        event.preventDefault();
        const inputCode = event.target.elements.verifyInput.value;
        if (inputCode === this.state.verifyCode) {
            fetch('http://62.217.182.98:2000/newLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    userId: this.state.userId,
                }),
            })
                .then(response => response.json())
                .then(data => {
                })
                .catch((error) => {
                    console.error('Ошибка:', error);
                });
            alert('Код подтвержден');
            this.setState({ isLoggedIn: true });
            localStorage.setItem('isLogin', true);
            localStorage.setItem('email', this.state.email);
            this.props.onEmailChange(this.state.email);
            this.props.onPasswordChange(this.state.password);
            this.props.onLogin(this.state.email);
            this.props.onClose();
        } else {
            alert('Неверный код');
        }
    }

    generateRandomId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 6; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        this.setState({ userId: id.toString() });
    }

    verifyCodeSend = () => {
        fetch('http://62.217.182.98:2000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                userId: this.state.userId,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    // Check if the token exists and is a string before decoding
                    if (data.token && typeof data.token === 'string') {
                        try {
                            const decodedToken = jwtDecode(data.token);
                            const verifyCode = decodedToken.code;
                            this.setState({ verifyCode: verifyCode, SubmitButton: true });
                            alert('Код подтверждения отправлен');
                        } catch (error) {
                            console.error('Ошибка при декодировании токена:', error);
                            // Handle the error appropriately, e.g., show an error message to the user
                        }
                    } else {
                        this.setState({ isLoggedIn: true });
                        localStorage.setItem('isLogin', true);
                        localStorage.setItem('email', this.state.email);
                        this.props.onEmailChange(this.state.email);
                        this.props.onPasswordChange(this.state.password);
                        this.props.onLogin(this.state.email);
                        this.props.onClose();
                    }
                } else if (data.status === 400) {
                    alert('Неправильный пароль');
                    this.setState({ changePassword: true });
                } else {
                    alert('Ошибка при регистрации');
                }
            })
            .catch((error) => {
                console.error('Ошибка при отправке запроса:', error);
            });
    }


    handleChangePassword = (event) => {
        event.preventDefault();
        const newPassword = event.target.elements.newPassword.value;
        this.setState({ changePassword: false });
        fetch('http://62.217.182.98:2000/changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                newPassword: newPassword,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    alert('Пароль успешно изменен');
                    this.setState({ showChangePasswordForm: false });
                } else {
                    alert('Ошибка при изменении пароля');
                }
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    }

    render() {
        const { isOpen, onClose } = this.props;
        if (!isOpen) {
            return null;
        }
        return (
            <div className="full-item">
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className='login-form'>
                            <form id="login-form" method="POST" onSubmit={this.handleSubmit.bind(this)}>
                                <label className='email1' htmlFor="email">Email:</label>
                                <input
                                    className='email'
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={(e) => {
                                        this.setState({ email: e.target.value });
                                        const emailValid = e.target.value.includes('@');
                                        this.setState({ emailValid });
                                    }}
                                    required
                                />
                                <label className='password1' htmlFor="password">Пароль:</label>
                                <input
                                    className='password'
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={(e) => {
                                        this.setState({ password: e.target.value });
                                        const passwordValid = e.target.value.length >= 6;
                                        this.setState({ passwordValid });
                                    }}
                                    required
                                />
                                {this.state.changePassword && (
                                    <div className="changePasswordButton" onClick={() => this.setState({ showChangePasswordForm: true })}>Забыли пароль?</div>
                                )}
                                <button type="submit" disabled={!this.state.emailValid || !this.state.passwordValid}>Войти</button>
                                <button type="button" onClick={onClose}>Закрыть</button>
                            </form>

                            {this.state.showChangePasswordForm && (
                                <form className="changePasswordForm" onSubmit={this.handleChangePassword}>
                                    <label className='password1' htmlFor="newPassword">Новый пароль:</label>
                                    <input
                                        className='password'
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        required
                                    />
                                    <button type="submit">Подтвердить</button>
                                    <button type="button" onClick={() => this.setState({ showChangePasswordForm: false })}>Отмена</button>
                                </form>
                            )}
                            {this.state.SubmitButton && (
                                <form onSubmit={this.handleVerifySubmit}>
                                    <label className='verify1' htmlFor="verifyInput">Введите код:</label>
                                    <input
                                        className='verify'
                                        type="text"
                                        id="verifyInput"
                                        name="verifyInput"
                                        required
                                    />
                                    <button type="submit">Подтвердить</button>
                                    <button type="button" onClick={() => this.setState({ SubmitButton: false })}>Отмена</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default LoginModal;
