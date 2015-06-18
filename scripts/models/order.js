export default Backbone.Collection.extend({

  initialize: function() {
    this.listenTo(this, 'add remove', this.itemAdded);
  },

  add: function() {
    Backbone.Collection.prototype.add.apply(this, arguments);
  },

  itemAdded: function(model) {
    console.log(model.get('name') + " was added to the order");
  }
});
