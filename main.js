/* global navigator */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(registration => {
      console.log('sw registred scope:', registration.scope);
    })
    .catch(err => {
      console.log('sw registration failed:', err);
    });
}
