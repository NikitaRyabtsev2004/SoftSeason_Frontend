import React, { Component } from 'react';

export class Review extends Component {
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
    fetch(`https://${window.location.hostname}/api/getReviews`)
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
    const email = localStorage.getItem('email');
    const { reviewText } = this.state;
    const reviewDate = new Date().toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    fetch(`https://${window.location.hostname}/api/submitReview`, {
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
              {this.state.reviews.map((review, index) => (
                <>
                  <ul>
                    <li key={index}>
                      <h2>{`-${review.date}   from: ${review.email} - ${review.review}`}</h2>
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

export default Review;
