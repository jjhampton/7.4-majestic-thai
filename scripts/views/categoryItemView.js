export default Backbone.View.extend({
  template: JST.categoryItem,
  className: 'category-item',

  events: {
    'click .category-item-button-price': 'addToOrder'
  },

  initialize: function(options) {
    this.order = options.order;
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  addToOrder: function(event) {
    console.log('clicked');
    console.log(this.model.toJSON().price);
    this.order.add(this.model);
  }

});

Handlebars.registerHelper('priceFixed', function(price) {
  return price.toFixed(2);
});


// <section class="category">
// <h2 class="category-title">Popular Items<i class="category-dropdown fa fa-sort-desc"></i></h2>
// </section>

//will need that later for when implement categories ^
