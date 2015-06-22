import AdminOrderItemView from './adminOrderItemView';
import {AdminOrderItem} from '../models/adminOrderItem';
import {AdminOrderItems} from '../models/adminOrderItem';


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

    var objectId = this.model.get('objectId');
    var adminOrderItems = new AdminOrderItems();

    adminOrderItems.url = "https://api.parse.com/1/classes/Order/" + objectId;

    adminOrderItems.fetch({
      data: {include: 'orderedItems'}
    }).then(function(response) {
      console.log("This customer's ordered items are", response.orderedItems);
      var orderedItems = response.orderedItems;

      this.children = orderedItems.map(function(child) {
      var view = new AdminOrderItemView({
        model: child
      });
      $('.order-subtotal').before(view.el);
      return view;
    }.bind(this));

    return this;
    });

  }
});
