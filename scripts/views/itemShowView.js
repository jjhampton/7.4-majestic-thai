export default Backbone.View.extend({
  template: JST.itemShow,
  className: 'item',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model));
  }
});
