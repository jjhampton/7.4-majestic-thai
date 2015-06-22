export default Backbone.View.extend({
  template: JST.adminOrder,
  className: 'admin-order',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    // this.renderChildren();
  }

  // renderChildren: function() {
  //   _.invoke(this.children || [], 'remove');
  //
  //   this.children = this.collection.map(function(child) {
  //     var view = new CategoryItemView({
  //       model: child,
  //     });
  //     this.$el.append(view.el);
  //     return view;
  //   }.bind(this));
  //
  //   return this;
  // }
});
