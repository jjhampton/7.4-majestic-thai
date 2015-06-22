export default Backbone.View.extend({
  template: JST.admin,
  className: 'admin-orders',

  initialize: function() {
    this.render();
  },

  render: function() {
    console.log(this.collection.toJSON());
    this.$el.html(this.template(this.collection.toJSON()));
  }
});
