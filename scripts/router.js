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
    this.order = new Order();
    this.orderCollection = new OrderCollection();

  },

  index: function() {
    this.items.fetch().then(function(data) {
      var popularItemsArray = this.items.where({popularity: 1});
      var itemsByCategory = this.items.groupBy('category');

      itemsByCategory["Popular Items"] = popularItemsArray;

      var menuView = new MenuView({
        collection: itemsByCategory,
        order: this.order,
      });

      this.showView(menuView);

      var orderView = new OrderView({
        model: this.order,
        collection: this.orderCollection,
      });

      $('.order').html(orderView.el);

    }.bind(this));
  },

  show: function(id) {
    console.log(id);
    var clickedItem = _.findWhere(this.items.toJSON(), {objectId: id});
    console.log(clickedItem);


    var itemShowView = new ItemShowView({
      model: clickedItem,
    });

    this.showView(itemShowView);
  },

  showView: function(view) {
    if (this.currentView) this.currentView.remove();
    this.currentView = view;
    $('.menu').html(view.el);
  }
});

var router = new Router();

export default router;
