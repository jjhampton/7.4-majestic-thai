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
    'items/:id': 'item',
    'exit': 'exit'
  },

  initialize: function() {
    this.items = new Items();
    this.order = new Order();
    this.orderCollection = new OrderCollection();

    this.fetchItemsPromise = this.items.fetch();

  },

  /*
  / Route Callbacks
  */

  index: function() {
    this.fetchItemsPromise.then(function(data) {
      var popularItemsArray = this.items.where({popularity: 1});
      var itemsByCategory = this.items.groupBy('category');

      itemsByCategory["Popular Items"] = popularItemsArray;

      var menuView = new MenuView({
        collection: itemsByCategory,
        order: this.order,
      });
      var orderView = new OrderView({
        model: this.order,
        collection: this.orderCollection,
      });

      this.showItemView(menuView);
      this.showOrderView(orderView);
    }.bind(this));
  },

  item: function(id) {
    this.fetchItemsPromise.then(function(){
      var clickedItem = _.findWhere(this.items.toJSON(), {objectId: id});


      var itemShowView = new ItemShowView({
        model: clickedItem,
        order: this.order
      });
      var orderView = new OrderView({
        model: this.order,
        collection: this.orderCollection,
      });

      this.showItemView(itemShowView);
      this.showOrderView(orderView);

    }.bind(this));
  },

  exit: function() {
    // var orderCheckoutView = new OrderCheckoutView({
    //   order: this.order
    // });

    $('.menu').html(JST.orderExit);
  },

  /*
  / Helper Functions
  */

  // Combine both show functions to be DRY
  showItemView: function(view) {
    if (this.currentItemView) this.currentItemView.remove();
    this.currentItemView = view;
    $('.menu').html(view.el);
  },

  showOrderView: function(view) {
    if (this.currentOrderView) this.currentOrderView.remove();
    this.currentOrderView = view;
    $('.order').html(view.el);
  }

});

var router = new Router();

export default router;
