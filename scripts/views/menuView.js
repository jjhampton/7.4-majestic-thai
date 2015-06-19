import CategoryView from './categoryView';

export default Backbone.View.extend({
  tagName: 'section',
  className: 'menu',

  initialize: function(options) {
    this.order = options.order;
    this.render();
  },

  render: function() {
    _.invoke(this.children || [], 'remove');


    _.each(this.collection, function(child, index, list) {
      var view = new CategoryView({
        model: child,
        order: this.order,
        collection: this.collection[index],
        category: index
      });
      this.$el.append(view.el);
      return view;
    }.bind(this));

    return this;

    // this.children = this.collection.map(function(child) {
    //   var view = new CategoryView({
    //     model: child,
    //     order: this.order,
    //     collection: this.collection
    //   });
    //   this.$el.append(view.el);
    //   return view;
    // }.bind(this));
    //
    // return this;
  },

  remove: function(){
    _.invoke(this.children || [], 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});
