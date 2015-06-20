import {Items} from './items';

var Order =  Backbone.Model.extend({

  // model: OrderedItem,

  initialize: function() {
    //Create a orderedItems collection to keep track of our ordered items

    this.orderedItems = new Items();

    //Trigger all orderedItems events on myself

    this.listenTo(this.orderedItems, 'all', this.trigger.bind(this));

    this.listenTo(this, 'add remove', this.setSubtotal);
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
    // return this.orderedItems.toJSON();
    // apparently unneeded
  },

  map: function(callback){
    return this.orderedItems.map(callback);
  },

  setSubtotal: function(model, collection) {
    var subtotal;

    console.log(model.get('name') + " was added to the order");
    console.log("The order collection is", this.orderedItems);

    subtotal = this.orderedItems.reduce(function(prev, cur, index) {
      var currentPrice = cur.get('price');
      console.log("Current price is", currentPrice);
      return prev + currentPrice;
    }, 0).toFixed(2);
    console.log("setSubtotal variable method is", subtotal);
    this.set('subtotal', subtotal);
    console.log("this.subtotal is", this.get('subtotal', subtotal));

  }

});

export default {Order};
