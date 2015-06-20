import {Items} from './items';

var Order =  Backbone.Model.extend({

  idAttribute: 'objectId',

  //are defaults needed???
  defaults: {
    name: ""
  },

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
    return _.extend({}, this.attributes, {
      orderedItems: this.orderedItems.map(function(item){
          return {
            "__type": "Pointer",
            "className": "Items",
            "objectId": item.id
          };
      })
    });
  },

  map: function(callback){
    return this.orderedItems.map(callback);
  },

  setSubtotal: function(model, collection) {
    var subtotal;
    subtotal = this.orderedItems.reduce(function(prev, cur, index) {
      var currentPrice = cur.get('price');
      return prev + currentPrice;
    }, 0).toFixed(2);
    this.set('subtotal', subtotal);
  }

});

var OrderCollection = Backbone.Collection.extend({
  model: Order,
  url: "https://api.parse.com/1/classes/Order"
});

export default {Order, OrderCollection};
