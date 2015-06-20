import {Items} from './items';

var Order =  Backbone.Model.extend({

  // model: OrderedItem,

  initialize: function() {
    //Create a orderedItems collection to keep track of our ordered items

    this.orderedItems = new Items();

    //Trigger all orderedItems events on myself

    this.listenTo(this.orderedItems, 'all', this.trigger.bind(this));

    this.listenTo(this, 'add remove', this.subtotal);
  },

  //Proxy add method to the orderedItems collection

  add: function(models, options) {
    return this.orderedItems.add(models, options);
  },

  //Proxy remove method to the orderedItems collection

  remove: function(models, options) {
    return this.orderedItems.remove(models, options);
  },

  toJSON: function() {
    return this.orderedItems.toJSON();
  },

  map: function(callback){
    return this.orderedItems.map(callback);
  },

  subtotal: function(model, collection) {
    var subtotal;

    console.log(model.get('name') + " was added to the order");
    console.log("The order collection is", this.orderedItems);

    subtotal = this.orderedItems.reduce(function(prev, cur, index) {
      var currentPrice = cur.get('price');
      console.log("Current price is", currentPrice);
      return prev + currentPrice;
    }, 0);
    console.log("Subtotal is", subtotal);
  }

});

export default {Order};
