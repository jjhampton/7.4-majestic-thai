var AdminOrder = Backbone.Model.extend({
  idAttribute: 'objectId'
});

var AdminOrders = Backbone.Collection.extend({
  model: AdminOrder,
  url: "https://api.parse.com/1/classes/Order",

  //Parse API returns models under results property
  parse: function(response) {
    return response.results;
  }
});


export default {AdminOrder, AdminOrders};
