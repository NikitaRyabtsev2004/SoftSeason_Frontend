import React, { Component } from 'react';

export class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewText: '',
            reviews: [],
            reviewDate: '',
        };
    }

    handleReviewChange = (event) => {
        this.setState({ reviewText: event.target.value });
    }

    fetchReviews = () => {
        fetch('http://localhost:2000/getReviews')
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    this.setState({ reviews: data.reviews });
                    this.setState({ date: data.reviewDate });
                }
            })
            .catch(error => console.error('Ошибка:', error));
    }

    componentDidMount() {
        this.fetchReviews();
    }

    submitReview = () => {
        if (!this.props.isLoggedIn) {
            alert('Вы должны быть зарегистрированы');
            return;
        } else {
        const email = localStorage.getItem('email');
        const { reviewText } = this.state;
        const reviewDate = new Date().toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        fetch('http://localhost:2000/submitReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, review: reviewText }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    alert('Отзыв отправлен!');
                    this.setState({ reviewText: '' });
                    this.setState({ reviewDate });
                    this.fetchReviews();
                } else {
                    alert('Ошибка при отправке отзыва');
                }
            })
            .catch(error => console.error('Ошибка:', error));
        }
    }


    render() {
        return (
            <>
                <div className="review-presentation">
                    <div className="review-display-container">

                        <div className="review-display">
                            <>
                                <textarea className="textarea"
                                    style={{ borderRadius: "15px" }}
                                    value={this.state.reviewText}
                                    onChange={this.handleReviewChange}
                                    placeholder="Ваш отзыв..."
                                />
                                <button className="review-button" onClick={this.submitReview}>Отправить</button>
                            </>
                        </div>

                        <div className="review-display" >
                            {this.state.reviews.reverse().map((review, index) => (
                                <>
                                    <ul>
                                        <li key={index}>
                                            {review.email}: {review.review} - {review.date}
                                        </li>
                                    </ul>
                                </>
                            ))}
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default Footer;
