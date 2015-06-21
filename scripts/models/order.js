import {Items} from './items';

var Order =  Backbone.Model.extend({

  idAttribute: 'objectId',

  //are defaults needed???
  defaults: {
    name: ""
  },

  initialize: function() {
    //Create a orderedItems collection to keep track of our ordered items

    this.orderedItems = new Items();

    //Trigger all orderedItems events on myself

    this.listenTo(this.orderedItems, 'all', this.trigger.bind(this));

    this.listenTo(this, 'add remove', this.setBill);
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
    return _.extend({}, this.attributes, {
      orderedItems: this.orderedItems.map(function(item){
          return {
            "__type": "Pointer",
            "className": "Items",
            "objectId": item.get('id')
          };
      })
    });
  },

  map: function(callback){
    return this.orderedItems.map(callback);
  },

  setBill: function(model, collection) {
    var subtotal;
    var tax;
    var total;

    subtotal = this.orderedItems.reduce(function(prev, cur, index) {
      var currentPrice = cur.get('price');
      return prev + currentPrice;
    }, 0);
    tax = subtotal * 0.08;
    total = subtotal + tax;
    this.set('subtotal', subtotal.toFixed(2));
    this.set('tax', tax.toFixed(2));
    this.set('total', total.toFixed(2));
  }

});

var OrderCollection = Backbone.Collection.extend({
  model: Order,
  url: "https://api.parse.com/1/classes/Order"
});

export default {Order, OrderCollection};
