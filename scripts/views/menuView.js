import CategoryView from './categoryView';

export default Backbone.View.extend({
  tagName: 'section',
  className: 'menu',

  initialize: function(options) {
    this.order = options.order;
    this.popularItems = options.popularItems;
    this.render();
  },

  render: function() {


    _.invoke(this.children || [], 'remove');

    //iterate over filtered collection object and create child CategoryViews.  index argument is category title

    this.children =  _.each(this.collection, function(child, index, list) {
      var view = new CategoryView({
        order: this.order,
        collection: this.collection[index],
        category: index
      });
      this.$el.append(view.el);
      return view;
    }.bind(this));

    var popularItemsView = new CategoryView({
      order: this.order,
      collection: this.popularItems,
      category: "Popular Items"
    });
    this.$el.prepend(popularItemsView.el);


    return this;
  },

  remove: function(){
    _.invoke(this.children || [], 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});
