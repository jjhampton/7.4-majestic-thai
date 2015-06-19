import CategoryItemView from './categoryItemView';


export default Backbone.View.extend({
  template: JST.category,
  tagName: 'section',
  className: 'category',

  initialize: function(options) {
    this.order = options.order;
    this.category = options.category;
    this.render();
  },

  render: function() {
    this.$el.html(this.template({category: this.category}));
    this.renderChildren();
  },

  renderChildren: function() {
    _.invoke(this.children || [], 'remove');

    this.children = this.collection.map(function(child) {
      var view = new CategoryItemView({
        model: child,
        order: this.order
      });
      this.$el.append(view.el);
      return view;
    }.bind(this));

    return this;
  },
});
