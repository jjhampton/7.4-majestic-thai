import {Items} from './models/items';


var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function() {
    this.items = new Items();
    this.items.fetch().then(function() {
      console.log(this.items.toJSON());
      $('.menu').html(JST.menu(this.items.toJSON()));
      $('.order').html(JST.order());  
    }.bind(this));
  },

  index: function() {

  }
});

var router = new Router();

export default router;
