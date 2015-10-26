require.register("ajax-config", function(exports, require, module){
  /*
  If the url is to Parse, add the Parse headers
*/

'use strict';

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  if (options.url.match(/api.parse.com/)) {
    options.headers = options.headers || {};
    options.headers['X-Parse-Application-Id'] = 'AUpiP6S97x8Tp9gLI9pC8QQozunO7bPUGucCok9A';
    options.headers['X-Parse-REST-API-Key'] = '8QfMgJZAZChRKUmDGMftNqGYVz4FfAPifZRslCiP';
  }
});
  
});

require.register("main", function(exports, require, module){
  'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

(function () {
  'use strict';
  $(document).ready(function () {

    Backbone.history.start();
  });
})();
  
});

require.register("router", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modelsItems = require('./models/items');

var _modelsOrder = require('./models/order');

var _viewsAdminView = require('./views/adminView');

var _viewsAdminView2 = _interopRequireDefault(_viewsAdminView);

var _viewsMenuView = require('./views/menuView');

var _viewsMenuView2 = _interopRequireDefault(_viewsMenuView);

var _viewsOrderView = require('./views/orderView');

var _viewsOrderView2 = _interopRequireDefault(_viewsOrderView);

var _viewsItemShowView = require('./views/itemShowView');

var _viewsItemShowView2 = _interopRequireDefault(_viewsItemShowView);

var _ajaxConfig = require('./ajax-config');

var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'items/:id': 'item',
    ':admin': 'admin'
  },

  initialize: function initialize() {
    this.items = new _modelsItems.Items();
    this.order = new _modelsOrder.Order();
    this.orderCollection = new _modelsOrder.OrderCollection();

    this.fetchItemsPromise = this.items.fetch();
  },

  /*
  / Route Callbacks
  */

  index: function index() {
    this.fetchItemsPromise.then((function (data) {
      var popularItemsArray = this.items.where({ popularity: 1 });
      var itemsByCategory = this.items.groupBy('category');

      itemsByCategory['Popular Items'] = popularItemsArray;

      var menuView = new _viewsMenuView2['default']({
        collection: itemsByCategory,
        order: this.order
      });
      var orderView = new _viewsOrderView2['default']({
        model: this.order,
        collection: this.orderCollection
      });

      this.showItemView(menuView);
      this.showOrderView(orderView);
    }).bind(this));
  },

  item: function item(id) {
    this.fetchItemsPromise.then((function () {
      var clickedItem = _.findWhere(this.items.toJSON(), { objectId: id });

      var itemShowView = new _viewsItemShowView2['default']({
        model: clickedItem,
        order: this.order
      });
      var orderView = new _viewsOrderView2['default']({
        model: this.order,
        collection: this.orderCollection
      });

      this.showItemView(itemShowView);
      this.showOrderView(orderView);
    }).bind(this));
  },

  admin: function admin() {
    var adminOrders = new _modelsOrder.OrderCollection();

    adminOrders.fetch({
      data: { include: 'orderedItems' }
    }).then(function () {
      var adminView = new _viewsAdminView2['default']({
        collection: adminOrders
      });
      $('.main-container').html(adminView.el);
    });
  },

  /*
  / Helper Functions
  */

  // Combine both show functions to be DRY
  showItemView: function showItemView(view) {
    if (this.currentItemView) this.currentItemView.remove();
    this.currentItemView = view;
    $('.menu').html(view.el);
  },

  showOrderView: function showOrderView(view) {
    if (this.currentOrderView) this.currentOrderView.remove();
    this.currentOrderView = view;
    $('.order').html(view.el);
  }
});

var router = new Router();

exports['default'] = router;
module.exports = exports['default'];
  
});

require.register("models/items", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Item = Backbone.Model.extend({
  idAttribute: 'objectId'
});

var Items = Backbone.Collection.extend({
  model: Item,
  url: 'https://api.parse.com/1/classes/Item',

  //Parse API returns models under results property
  parse: function parse(response) {
    return response.results;
  }
});

exports['default'] = { Item: Item, Items: Items };
module.exports = exports['default'];
  
});

require.register("models/order", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _items = require('./items');

var Order = Backbone.Model.extend({

  idAttribute: 'objectId',

  //are defaults needed???
  defaults: {
    customer: ''
  },

  initialize: function initialize() {
    //Create a orderedItems collection to keep track of our ordered items

    this.orderedItems = new _items.Items();

    //Trigger all orderedItems events on myself

    this.listenTo(this.orderedItems, 'all', this.trigger.bind(this));

    this.listenTo(this, 'add remove', this.setBill);
  },

  //Proxy add method to the orderedItems collection

  add: function add(models, options) {
    return this.orderedItems.add(models, options);
  },

  //Proxy remove method to the orderedItems collection

  remove: function remove(models, options) {
    return this.orderedItems.remove(models, options);
  },

  toJSON: function toJSON() {
    // return this.orderedItems.toJSON();
    // apparently unneeded
    return _.extend({}, this.attributes, {
      orderedItems: this.orderedItems.map(function (item) {
        return {
          '__type': 'Pointer',
          'className': 'Item',
          'objectId': item.id
        };
      })
    });
  },

  map: function map(callback) {
    return this.orderedItems.map(callback);
  },

  setBill: function setBill(model, collection) {
    var subtotal;
    var tax;
    var total;

    subtotal = this.orderedItems.reduce(function (prev, cur, index) {
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
  url: 'https://api.parse.com/1/classes/Order/',
  //Parse API returns models under results property
  parse: function parse(response) {
    return response.results;
  }
});

exports['default'] = { Order: Order, OrderCollection: OrderCollection };
module.exports = exports['default'];
  
});

require.register("view-models/categoryVM", function(exports, require, module){
  "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Backbone.Model.extend({
  defaults: {
    isHidden: true
  }
});
module.exports = exports["default"];
  
});

require.register("views/adminOrderItemView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Backbone.View.extend({
  template: JST.adminOrderItem,
  className: 'order-item',

  initialize: function initialize() {
    this.render();
  },

  render: function render() {
    this.$el.html(this.template(this.model));
  }

});
module.exports = exports['default'];
  
});

require.register("views/adminOrderView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _adminOrderItemView = require('./adminOrderItemView');

var _adminOrderItemView2 = _interopRequireDefault(_adminOrderItemView);

exports['default'] = Backbone.View.extend({
  template: JST.adminOrder,
  className: 'admin-order',

  initialize: function initialize() {
    this.render();
  },

  render: function render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.renderChildren();
  },

  renderChildren: function renderChildren() {
    _.invoke(this.children || [], 'remove');

    var orderedItems = this.model.attributes.orderedItems;
    console.log('This customer\'s ordered items are', orderedItems);

    this.children = orderedItems.map((function (child) {
      var view = new _adminOrderItemView2['default']({
        model: child
      });
      this.$('.order-subtotal').before(view.el);
      return view;
    }).bind(this));

    return this;
  }
});
module.exports = exports['default'];
  
});

require.register("views/adminView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _adminOrderView = require('./adminOrderView');

var _adminOrderView2 = _interopRequireDefault(_adminOrderView);

exports['default'] = Backbone.View.extend({
  template: JST.admin,
  className: 'admin-container',

  initialize: function initialize() {
    this.render();
  },

  render: function render() {
    this.$el.html(this.template());
    this.renderChildren();
  },

  renderChildren: function renderChildren() {
    _.invoke(this.children || [], 'remove');

    this.children = this.collection.map((function (child) {
      var view = new _adminOrderView2['default']({
        model: child,
        collection: this.collection
      });
      this.$el.append(view.el);
      return view;
    }).bind(this));

    return this;
  }
});
module.exports = exports['default'];
  
});

require.register("views/categoryItemView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Backbone.View.extend({
  template: JST.categoryItem,
  className: 'category-item',

  events: {
    'click .category-item-button-price': 'showItem'
  },

  initialize: function initialize(options) {
    this.order = options.order;
    this.render();
  },

  render: function render() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  showItem: function showItem() {
    var clickedItem = this.model.toJSON();
  }
});

Handlebars.registerHelper('priceFixed', function (price) {
  return price.toFixed(2);
});
module.exports = exports['default'];
  
});

require.register("views/categoryView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _categoryItemView = require('./categoryItemView');

var _categoryItemView2 = _interopRequireDefault(_categoryItemView);

exports['default'] = Backbone.View.extend({
  template: JST.category,
  tagName: 'section',
  className: 'category',

  events: {
    'click .category-dropdown': 'toggleDropdown'
  },

  initialize: function initialize(options) {
    this.order = options.order;
    this.viewModel = options.viewModel;
    this.category = options.category;
    this.render();
    this.listenTo(this.viewModel, 'change:isHidden', this.render);
  },

  render: function render() {
    this.$el.html(this.template({
      category: this.category,
      isHidden: this.viewModel.get('isHidden')
    }));
    this.renderChildren();
  },

  renderChildren: function renderChildren() {
    _.invoke(this.children || [], 'remove');

    this.children = this.collection.map((function (child) {
      var view = new _categoryItemView2['default']({
        model: child,
        order: this.order
      });
      this.$('.container-item-container').append(view.el);
      return view;
    }).bind(this));

    return this;
  },

  toggleDropdown: function toggleDropdown() {
    this.viewModel.set('isHidden', !this.viewModel.get('isHidden'));
  }
});
module.exports = exports['default'];
  
});

require.register("views/itemShowView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _modelsItems = require('../models/items');

exports['default'] = Backbone.View.extend({
  template: JST.itemShow,
  className: 'item-show',

  events: {
    'click .item-button-add': 'addToOrder'
  },

  initialize: function initialize(options) {
    this.order = options.order;
    this.render();
  },

  render: function render() {
    this.$el.html(this.template(this.model));
  },

  addToOrder: function addToOrder(event) {
    var clickedItem = this.model;
    var itemToAdd = new _modelsItems.Item();
    itemToAdd.set({
      'name': clickedItem.name,
      'number': clickedItem.number,
      'price': clickedItem.price,
      'description': clickedItem.description,
      'id': clickedItem.objectId
    });
    this.order.add(itemToAdd);
  }
});
module.exports = exports['default'];
  
});

require.register("views/menuView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _categoryView = require('./categoryView');

var _categoryView2 = _interopRequireDefault(_categoryView);

var _viewModelsCategoryVM = require('../view-models/categoryVM');

var _viewModelsCategoryVM2 = _interopRequireDefault(_viewModelsCategoryVM);

exports['default'] = Backbone.View.extend({
  tagName: 'section',

  initialize: function initialize(options) {
    this.order = options.order;
    this.render();
  },

  render: function render() {

    _.invoke(this.children || [], 'remove');

    //Iterate over filtered collection object and create child CategoryViews.  Index argument is category title.

    this.children = _.each(this.collection, (function (child, index) {
      var categoryVM = new _viewModelsCategoryVM2['default']();
      var view = new _categoryView2['default']({
        order: this.order,
        collection: this.collection[index],
        category: index,
        viewModel: categoryVM
      });
      this.$el.append(view.el);
      return view;
    }).bind(this));

    return this;
  },

  remove: function remove() {
    _.invoke(this.children || [], 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});
module.exports = exports['default'];
  
});

require.register("views/orderItemView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Backbone.View.extend({
  template: JST.orderItem,
  tagName: 'div',
  className: 'order-item',

  events: {
    'click .order-item-button-remove': 'removeItem'
  },

  initialize: function initialize(options) {
    this.order = options.order;
    this.render();
  },

  render: function render() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  removeItem: function removeItem() {
    console.log('remove clicked');
    console.log(this.order);
    console.log(this.model);
    this.order.remove(this.model);
  }
});
module.exports = exports['default'];
  
});

require.register("views/orderView", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _orderItemView = require('./orderItemView');

var _orderItemView2 = _interopRequireDefault(_orderItemView);

exports['default'] = Backbone.View.extend({
  template: JST.order,

  events: {
    'click .order-checkout-button': 'checkoutOrder'
  },

  initialize: function initialize() {
    this.render();
    this.listenTo(this.model, 'add remove', this.render);
  },

  render: function render(model, collection) {
    this.$el.html(this.template({
      subtotal: this.model.get('subtotal'),
      tax: this.model.get('tax'),
      total: this.model.get('total')
    }));
    this.renderChildren();
  },

  renderChildren: function renderChildren() {
    _.invoke(this.children || [], 'remove');

    this.children = this.model.map((function (child) {
      var view = new _orderItemView2['default']({
        model: child,
        order: this.model
      });
      this.$('.order-subtotal').before(view.el);
      return view;
    }).bind(this));

    return this;
  },

  checkoutOrder: function checkoutOrder() {
    //customer name input  on page before checking out
    var customer = $('.order-name-input').val();
    //current subtotal value - to determine if any items have actually been added
    var currentSubtotal = this.model.get('subtotal');

    if (customer && currentSubtotal) {
      this.model.set('customer', customer);
      this.collection.create(this.model, {
        dataType: 'text',
        success: function success(model, response) {
          console.log('save successful');
          $('.menu').html(JST.orderExit);
        },
        error: function error(model, response) {
          console.log('save NOT successful', response.toJSON());
        }
      });
    } else {
      alert('Please enter a name and choose some items before checking out.');
    }
  }
});
module.exports = exports['default'];
  
});

//# sourceMappingURL=app.js.map