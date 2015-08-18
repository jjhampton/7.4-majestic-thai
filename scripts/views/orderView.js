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
      subtotal: this.model.get('subtotal'),
      tax: this.model.get('tax'),
      total: this.model.get('total')
    }));
    this.renderChildren();
  },

  renderChildren: function() {
    _.invoke(this.children || [], 'remove');

    this.children = this.model.map(function(child) {
      var view = new OrderItemView({
        model: child,
        order: this.model
      });
      this.$('.order-subtotal').before(view.el);
      return view;
    }.bind(this));

    return this;
  },

  checkoutOrder: function() {
    //customer name input  on page before checking out
    var customer = $('.order-name-input').val();
    //current subtotal value - to determine if any items have actually been added
    var currentSubtotal = this.model.get('subtotal');

    if (customer && currentSubtotal) {
      this.model.set('customer', customer);
      this.collection.create(this.model, {
        dataType: 'text',
        success: function(model, response) {
          console.log("save successful");
          $('.menu').html(JST.orderExit);
        },
        error: function(model, response) {
          console.log("save NOT successful", response.toJSON());
        }
      });

    }
    else {
      alert("Please enter a name and choose some items before checking out.");
    }
  }
});
