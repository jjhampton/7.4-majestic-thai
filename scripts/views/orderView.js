import OrderItemView from './orderItemView';

export default Backbone.View.extend({
  template: JST.order,

  events: {
    'click .order-checkout-button': 'checkoutOrder'
  },

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

  checkoutOrder: function() {
    //Add a name property to order - add later

    console.log(this.model.toJSON());
    this.collection.create(this.model, {
      dataType: 'text',
      success: function(model, response) {
        console.log("save successful");
      },
      error: function(model, response) {
        console.log("save NOT successful", response.toJSON());
      }
    });
    console.log(this.collection.toJSON());
  }
});
