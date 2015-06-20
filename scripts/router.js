import {Items} from './models/items';

import {Order} from './models/order';

import MenuView from './views/menuView';

import OrderView from './views/orderView';




var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function() {
    var items = new Items();
    var order = new Order();
    var orderView = new OrderView({
      model: order,
    });

    items.fetch().then(function() {
      var popularItemsArray = items.where({popularity: 1});
      var itemsByCategory = items.groupBy('category');

      itemsByCategory["Popular Items"] = popularItemsArray;

      var menuView = new MenuView({
        collection: itemsByCategory,
        order: order,
      });

      $('.main-container').prepend(menuView.el);
      $('.main-container').append(orderView.el);
    }.bind(this));
  },

  index: function() {

  }
});

var router = new Router();

export default router;
