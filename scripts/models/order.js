
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
    console.log(collection.toJSON());
    console.log(model.get('name') + " was added to the order - Order Collection");
    var collectionLength = this.toJSON().length;
    if (collectionLength === 1) {
      subtotal = this.toJSON()[0].price.toFixed(2);
      console.log("one item subtotal is", subtotal);
    }
    else {
      subtotal = collection.toJSON().reduce(function(prev, cur, index) {
        // console.log(prev);
        console.log(prev.price);
        // console.log(cur);
        console.log(cur.price);
        return prev.price + cur.price;
      });
      console.log("multi item subtotal is", subtotal);
    }
    // var subtotal = this.reduce(function(prev, cur) {
    //   console.log('price is', cur.toJSON().price);
    //   console.log('previous price is', prev.toJSON().price);
    //   var itemPrice =  cur.toJSON().price;
    // });
  }




  //Not sure if needed

  // getByPid: function(pid) {
  //       return this.detect(function(obj) { return (obj.get('product').cid == pid); });
  //   }

});

export default {Order};
