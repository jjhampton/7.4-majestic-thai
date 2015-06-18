import CategoryItemView from './categoryItemView';

export default Backbone.View.extend({
  tagName: 'section',
  className: 'menu',

  initialize: function(options) {
    this.order = options.order;
    this.render();
  },

  render: function() {
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

  remove: function(){
    _.invoke(this.children || [], 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});
