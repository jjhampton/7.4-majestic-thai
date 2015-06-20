export default Backbone.View.extend({
  template: JST.orderItem,
  tagName: 'div',
  className: 'order-item',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  }
});
