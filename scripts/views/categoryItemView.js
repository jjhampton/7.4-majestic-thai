import {Item} from '../models/items';


export default Backbone.View.extend({
  template: JST.categoryItem,
  className: 'category-item',

  events: {
    'click .category-item-button-price': 'addToOrder'
  },

  initialize: function(options) {
    this.order = options.order;
    this.render();
    this.listenTo(this.order, 'update', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  addToOrder: function(event) {
    var clickedItem = this.model.toJSON();
    console.log(clickedItem);
    var itemToAdd = new Item();
    itemToAdd.set({
      'name': clickedItem.name,
      'number': clickedItem.number,
      'price': clickedItem.price,
      'id': clickedItem.objectId
    });
    console.log(itemToAdd.toJSON(), 'model will be added');
    this.order.add(itemToAdd);
  }
});

Handlebars.registerHelper('priceFixed', function(price) {
  return price.toFixed(2);
});
