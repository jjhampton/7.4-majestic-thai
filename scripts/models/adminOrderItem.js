var AdminOrderItem = Backbone.Model.extend({
  idAttribute: 'objectId'
});

var AdminOrderItems = Backbone.Collection.extend({
  model: AdminOrderItem,

  // Parse API returns models under results property
  parse: function(response) {
    return response.results;
  }
});

export default {AdminOrderItems, AdminOrderItem};
