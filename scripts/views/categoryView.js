import CategoryItemView from './categoryItemView';

export default Backbone.View.extend({
  template: JST.category,
  tagName: 'section',
  className: 'category',

  events: {
    'click .category-dropdown': 'toggleDropdown'
  },

  initialize: function(options) {
    this.order = options.order;
    this.viewModel = options.viewModel;
    this.category = options.category;
    this.render();
    this.listenTo(this.viewModel, 'change:isHidden', this.render);
  },

  render: function() {
    this.$el.html(this.template({
      category: this.category,
      isHidden: this.viewModel.get('isHidden')
      }));
    this.renderChildren();
  },

  renderChildren: function() {
    _.invoke(this.children || [], 'remove');

    this.children = this.collection.map(function(child) {
      var view = new CategoryItemView({
        model: child,
        order: this.order
      });
      this.$('.container-item-container').append(view.el);
      return view;
    }.bind(this));

    return this;
  },

  toggleDropdown: function() {
    this.viewModel.set('isHidden', !this.viewModel.get('isHidden'));
  }
});
