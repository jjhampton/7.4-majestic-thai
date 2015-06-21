import {Items} from './models/items';

import {Order} from './models/order';
import {OrderCollection} from './models/order';


import MenuView from './views/menuView';

import OrderView from './views/orderView';

import ItemShowView from './views/itemShowView';

import ajaxConfig from './ajax-config';


var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'items/:id': 'show'
  },

  initialize: function() {
    this.items = new Items();
    var order = new Order();
    var orderCollection = new OrderCollection();
    var orderView = new OrderView({
      model: order,
      collection: orderCollection
    });

    this.items.fetch().then(function(data) {
      var popularItemsArray = this.items.where({popularity: 1});
      var itemsByCategory = this.items.groupBy('category');

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

  },

  show: function(id) {
    console.log(id);
    var clickedItem = _.findWhere(this.items.toJSON(), {objectId: id});
    console.log(clickedItem);


    var itemShowView = new ItemShowView({
      model: clickedItem
    });

    $('.menu').replaceWith(itemShowView.el);

  }
});

var router = new Router();

export default router;
