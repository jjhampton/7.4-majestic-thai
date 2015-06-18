var Item = Backbone.Model.extend({
  // idAttribute: 'objectId'
});


var Items = Backbone.Collection.extend({
  model: Item,
  url: 'items.json',

  // Parse API returns models under results property
  // parse: function(response) {
  //   return response.results;
  // }
});

export default {Items};
