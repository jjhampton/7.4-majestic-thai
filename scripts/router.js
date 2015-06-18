import {Items} from './models/items';

import Order from './models/order';

import MenuView from './views/menuView';



var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function() {
    var items = new Items();
    var order = new Order();


    items.fetch().then(function() {
      var menuView = new MenuView({
        collection: items,
        order: order
      });
      $('.main-container').prepend(menuView.el);
      $('.main-container').append(JST.order());
    }.bind(this));
  },

  index: function() {

  }
});

var router = new Router();

export default router;
