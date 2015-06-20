import OrderItemView from './orderItemView';

export default Backbone.View.extend({
  template: JST.order,
  tagName: 'sidebar',
  className: 'order',

  initialize: function(){
    this.render();
    this.listenTo(this.model, 'add remove', this.render);
  },

  render: function(model, collection) {
    this.$el.html(this.template({
      subtotal: this.model.get('subtotal')
    }));
    this.renderChildren();
  },

  renderChildren: function() {
    _.invoke(this.children || [], 'remove');

    this.children = this.model.map(function(child) {
      var view = new OrderItemView({
        model: child,
      });
      this.$('.order-subtotal').before(view.el);
      return view;
    }.bind(this));

    return this;
  },
});
