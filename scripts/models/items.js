var Item = Backbone.Model.extend({
});


var Items = Backbone.Collection.extend({
  model: Item,
  url: 'https://api.parse.com/1/classes/Items',
  idAttribute: 'objectId',

  //Parse API returns models under results property
  parse: function(response) {
    return response.results;
  }
});

export default {Items};
