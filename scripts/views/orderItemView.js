export default Backbone.View.extend({
  template: JST.orderItem,
  tagName: 'div',
  className: 'order-item',

  events: {
    'click .order-item-button-remove': 'removeItem'
  },

  initialize: function(options) {
    this.order = options.order;
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  removeItem: function() {
    console.log('remove clicked');
    console.log(this.order);
    console.log(this.model);
    this.order.remove(this.model);
  }
});
