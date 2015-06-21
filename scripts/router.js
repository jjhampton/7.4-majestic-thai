import {Items} from './models/items';

import {Order} from './models/order';
import {OrderCollection} from './models/order';


import MenuView from './views/menuView';

import OrderView from './views/orderView';

import ajaxConfig from './ajax-config';


var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function() {
    var items = new Items();
    var order = new Order();
    //new collection to be saved on backend??
    var orderCollection = new OrderCollection();
    var orderView = new OrderView({
      model: order,
      collection: orderCollection
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
