
//credit: http://www.elfsternberg.com/2010/12/08/backbonejs-introducing-backbone-store/

// var OrderedItem = Backbone.Model.extend({
//     update: function(amount) {
//         this.set({'quantity': this.get('quantity') + amount});
//     }
// });

var Order =  Backbone.Collection.extend({

  // model: OrderedItem,

  initialize: function() {
    this.listenTo(this, 'add remove', this.subtotal);
  },

  add: function(model) {
    Backbone.Collection.prototype.add.apply(this, arguments);
  },

  subtotal: function(model, collection) {
    var subtotal;

    console.log(model.get('name') + " was added to the order");
    console.log("The order collection is", this);

    subtotal = this.reduce(function(prev, cur, index) {
      var currentPrice = cur.get('price');
      console.log("Current price is", currentPrice);
      return prev + currentPrice;
    }, 0);
    console.log("Subtotal is", subtotal);
  }

});

export default {Order};
