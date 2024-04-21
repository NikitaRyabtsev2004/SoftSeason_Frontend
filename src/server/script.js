const FEEDBACK_FORM = document.querySelector('#feedback-form');

function sendFeedback(feedback) {
    fetch("/api/feedback", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(feedback),
    }).then((response) => response.json()).then(data => {
        console.log(data);
        alert('Успешно');
    }).catch((error) => {
        console.error(error);
        alert('Ошибка');
    });
}

FEEDBACK_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedbackFormData = new FormData(e.target);
    console.log('feedbackFormData', feedbackFormData);
    const feedback = Object.fromEntries(feedbackFormData);
    console.log('feedback', feedback);
    sendFeedback(feedback);
})
