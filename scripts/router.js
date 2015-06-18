var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function() {
  },

  index: function() {
    $('.container').append(JST.menu());
    $('.container').append(JST.order());
  }
});

var router = new Router();

export default router;
