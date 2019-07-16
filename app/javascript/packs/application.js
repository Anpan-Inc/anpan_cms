import Vue from "vue";
import Account from "../components/account";

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: h => h(Account)
  }).$mount();
  document.body.appendChild(app.$el)
});
