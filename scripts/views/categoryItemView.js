export default Backbone.View.extend({
  template: JST.categoryItem,
  className: 'category-item',

  events: {
    'click .category-item-button-price': 'showItem'
  },

  initialize: function(options) {
    this.order = options.order;
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  showItem: function() {
    var clickedItem = this.model.toJSON();
    console.log(clickedItem, "clicked");
  }
});

Handlebars.registerHelper('priceFixed', function(price) {
  return price.toFixed(2);
});
