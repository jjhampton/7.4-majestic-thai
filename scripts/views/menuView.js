import CategoryView from './categoryView';

import CategoryVM from '../view-models/categoryVM';

export default Backbone.View.extend({
  tagName: 'section',
  className: 'menu',

  initialize: function(options) {
    this.order = options.order;
    this.render();
  },

  render: function() {


    _.invoke(this.children || [], 'remove');

    //Iterate over filtered collection object and create child CategoryViews.  Index argument is category title.

    this.children =  _.each(this.collection, function(child, index) {
      var categoryVM = new CategoryVM();
      var view = new CategoryView({
        order: this.order,
        collection: this.collection[index],
        category: index,
        viewModel: categoryVM
      });
      this.$el.append(view.el);
      return view;
    }.bind(this));

    return this;
  },

  remove: function(){
    _.invoke(this.children || [], 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});
