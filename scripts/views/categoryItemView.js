export default Backbone.View.extend({
  template: JST.categoryItem,
  className: 'category-item',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  }

});

Handlebars.registerHelper('priceFixed', function(price) {
  return price.toFixed(2);
});


// <section class="category">
// <h2 class="category-title">Popular Items<i class="category-dropdown fa fa-sort-desc"></i></h2>
// </section>

//will need that later for when implement categories ^
