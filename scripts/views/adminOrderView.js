import AdminOrderItemView from './adminOrderItemView';

export default Backbone.View.extend({
  template: JST.adminOrder,
  className: 'admin-order',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.renderChildren();
  },

  renderChildren: function() {
    _.invoke(this.children || [], 'remove');

    var orderedItems = this.model.get('orderedItems');
    console.log(orderedItems);

    this.children = orderedItems.map(function(child) {
      var view = new AdminOrderItemView({
        model: child,
      });
      this.$('.order-subtotal').before(view.el);
      return view;
    }.bind(this));

    return this;
  }
});
