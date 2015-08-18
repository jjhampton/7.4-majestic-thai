export default Backbone.View.extend({
  template: JST.adminOrderItem,
  className: 'order-item',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model));
  }

});
