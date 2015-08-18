var Item = Backbone.Model.extend({
  idAttribute: 'objectId'
});


var Items = Backbone.Collection.extend({
  model: Item,
  url: 'https://api.parse.com/1/classes/Item',

  //Parse API returns models under results property
  parse: function(response) {
    return response.results;
  }
});

export default {Item, Items};
