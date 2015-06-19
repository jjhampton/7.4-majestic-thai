export default Backbone.View.extend({
  template: JST.order,
  tagName: 'sidebar',
  className: 'order',

  initialize: function(){
    this.render();
    // this.listenTo(this.collection, 'add remove', this.itemAddedLog);
    this.listenTo(this.collection, 'add remove', this.render);
  },

  render: function(model, collection) {
    this.$el.html(this.template(this.collection.toJSON()));
  },

  itemAddedLog: function(model, collection) {
    //add if-else statement w/ collection length conditional - add or remove CSS class
    console.log(model.get('name') + " was added to the order - signed, OrderView");
    console.log(collection.toJSON(), " is the order collection" );
    collection.each(function(element, index) {
      console.log(element.get('name') + " is item #" + index + " in the order list");
    });

  }
});
