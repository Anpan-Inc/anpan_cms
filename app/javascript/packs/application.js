import Vue from "vue";
import Account from "../components/account";

function isPlacedAt(controller, action) {
  const currentController = document.body.getAttribute('data-controller')
  const currentAction = document.body.getAttribute('data-action')
  return currentController === controller && action === currentAction
}
document.addEventListener('DOMContentLoaded', () => {
  if (isPlacedAt('home', 'index')) {
    new Vue({
      el: '#app',
      render: h => h(Account)
    }).$mount();
  }
});
