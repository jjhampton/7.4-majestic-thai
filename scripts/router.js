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
      collection: order
    });

    items.fetch().then(function() {
      var popularItems = items.where({popularity: 1});
      var itemsByCategory = items.groupBy('category');

      var menuView = new MenuView({
        collection: itemsByCategory,
        order: order,
        popularItems: popularItems
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
