/* global alertify */
alertify.set('notifier', 'position', 'bottom-left');

document.addEventListener('DOMContentLoaded', () => {
  const errors = [...document.querySelectorAll('.error-msg')];
  errors.forEach((error) => {
    alertify.notify(error.textContent, 'error', 5, () => {});
  });
  const successes = [...document.querySelectorAll('.success-msg')];
  successes.forEach((success) => {
    alertify.notify(success.textContent, 'success', 5, () => {});
  });
});
