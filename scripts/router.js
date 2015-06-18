import {Items} from './models/items';

import MenuView from './views/menuView';



var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function() {
    var items = new Items();


    items.fetch().then(function() {
      console.log(items.toJSON());
      var menuView = new MenuView({
        collection: items
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
