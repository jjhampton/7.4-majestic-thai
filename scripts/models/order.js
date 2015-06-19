
//credit: http://www.elfsternberg.com/2010/12/08/backbonejs-introducing-backbone-store/

// var OrderedItem = Backbone.Model.extend({
//     update: function(amount) {
//         this.set({'quantity': this.get('quantity') + amount});
//     }
// });

var Order =  Backbone.Collection.extend({

  // model: OrderedItem,

  initialize: function() {
    this.listenTo(this, 'add remove', this.itemAdded);
  },

  add: function(model) {
    Backbone.Collection.prototype.add.apply(this, arguments);
  },

  itemAdded: function(model) {
    console.log(model.get('name') + " was added to the order");
    console.log(this.length + " items in cart");
  },

  //Not sure if needed

  // getByPid: function(pid) {
  //       return this.detect(function(obj) { return (obj.get('product').cid == pid); });
  //   }

});

export default {Order};
