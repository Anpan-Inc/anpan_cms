import Vue from "vue";
import Account from "../components/account";
import axios from "axios";

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

function isPlacedAt(controller, action) {
  const currentController = document.body.getAttribute('data-controller')
  const currentAction = document.body.getAttribute('data-action')
  return currentController === controller && action === currentAction
}

document.addEventListener('DOMContentLoaded', () => {
  if (isPlacedAt('accounts', 'show')) {
    new Vue({
      el: '#app',
      render: h => h(Account)
    }).$mount();
  }
});
