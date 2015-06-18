export default Backbone.View.extend({
  template: JST.menu,
  tagName: 'section',
  className: 'menu',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.collection.toJSON()));
  }
});
