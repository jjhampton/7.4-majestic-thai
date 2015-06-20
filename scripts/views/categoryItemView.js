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
    var itemToAdd = new Item();
    console.log('clicked', clickedItem.name, 'in category item view');
    itemToAdd.set({
      'name': clickedItem.name,
      'number': clickedItem.number,
      'price': clickedItem.price,
    });
    console.log(itemToAdd, 'model will be added');
    this.order.add(itemToAdd);
  }
});

Handlebars.registerHelper('priceFixed', function(price) {
  return price.toFixed(2);
});
