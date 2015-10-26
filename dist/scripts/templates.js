this["JST"] = this["JST"] || {};
this["JST"]["admin"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "  <header class=\"order-header\">\n    <img src=\"55.png\" class=\"order-header-logo\">\n    <h2 class=\"order-restaurant\">Total Fusion Cafe Admin Panel</h2>\n    <h2 class=\"admin-order-area\">Orders:</h2>\n  </header>\n";
},"useData":true});
this["JST"]["adminOrder"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<h4 class=\"order-name\">Customer Name: "
    + alias3(((helper = (helper = helpers.customer || (depth0 != null ? depth0.customer : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"customer","hash":{},"data":data}) : helper)))
    + "</h4>\n<div class=\"order-list\">\n  <div class=\"order-list-headings\">\n    <span class=\"order-item-heading\">Items</span>\n    <span class=\"order-price-heading\">Price</span>\n  </div>\n</div>\n\n</div>\n<div class=\"order-subtotal\">\n<span class=\"order-item-text\">Subtotal</span>\n<span class=\"order-item-price\">$"
    + alias3(((helper = (helper = helpers.subtotal || (depth0 != null ? depth0.subtotal : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"subtotal","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<div class=\"order-tax\">\n<span class=\"order-item-text\">Tax</span>\n<span class=\"order-item-price\">$"
    + alias3(((helper = (helper = helpers.tax || (depth0 != null ? depth0.tax : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tax","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<div class=\"order-total\">\n<span class=\"order-item-text\">Total</span>\n<span class=\"order-item-price\">$"
    + alias3(((helper = (helper = helpers.total || (depth0 != null ? depth0.total : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"total","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n";
},"useData":true});
this["JST"]["adminOrderItem"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "  <span class=\"order-item-text\">"
    + alias3(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"number","hash":{},"data":data}) : helper)))
    + ". "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n  <span class=\"order-item-price\">$"
    + alias3((helpers.priceFixed || (depth0 && depth0.priceFixed) || alias1).call(depth0,(depth0 != null ? depth0.price : depth0),{"name":"priceFixed","hash":{},"data":data}))
    + "</span>\n";
},"useData":true});
this["JST"]["category"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "  <div class=\"container-item-container\">\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<h2 class=\"category-title\">\n  "
    + this.escapeExpression(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"category","hash":{},"data":data}) : helper)))
    + "<i class=\"category-dropdown fa fa-sort-desc fa-lg\"></i>\n</h2>\n"
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.isHidden : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["JST"]["categoryItem"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<a href=\"#items/"
    + alias3(((helper = (helper = helpers.objectId || (depth0 != null ? depth0.objectId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"objectId","hash":{},"data":data}) : helper)))
    + "\" class=\"category-item-link\">\n  <div class=\"category-item-text\">\n    <h3 class=\"category-item-title\">"
    + alias3(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"number","hash":{},"data":data}) : helper)))
    + ". "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n    <p class=\"category-item-description\">\n      "
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n    </p>\n  </div>\n  <button class=\"category-item-button-price button-primary\">$"
    + alias3((helpers.priceFixed || (depth0 && depth0.priceFixed) || alias1).call(depth0,(depth0 != null ? depth0.price : depth0),{"name":"priceFixed","hash":{},"data":data}))
    + "\n  </button>\n</a>\n";
},"useData":true});
this["JST"]["itemShow"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<h2 class=\"item-show-title\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n<h3 class=\"item-description\">"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</h3>\n<h4 class=\"item-description\">$ "
    + alias3((helpers.priceFixed || (depth0 && depth0.priceFixed) || alias1).call(depth0,(depth0 != null ? depth0.price : depth0),{"name":"priceFixed","hash":{},"data":data}))
    + " each</h4>\n<div class=\"item-add-container\">\n  <a href=\"#\">\n    <button class=\"item-button-cancel button-primary\">Back to Menu</button>\n  </a>\n  <button class=\"item-button-add button-primary\">Add to Cart</button>\n</div>\n";
},"useData":true});
this["JST"]["menu"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "\n";
},"useData":true});
this["JST"]["order"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<header class=\"order-header\">\n  <img class=\"logo\" src=\"55.png\" class=\"order-header-logo\">\n  <h2 class=\"order-restaurant\">Total Fusion Cafe</h2>\n  <h4 class=\"order-heading\">Your Order</h4>\n</header>\n<div class=\"order-list\">\n  <div class=\"order-list-headings\">\n    <span class=\"order-item-heading\">Item</span>\n    <span class=\"order-price-heading\">Price</span>\n  </div>\n</div>\n<div class=\"order-subtotal\">\n  <span class=\"order-item-text\">Subtotal</span>\n  <span class=\"order-item-price\">$"
    + alias3(((helper = (helper = helpers.subtotal || (depth0 != null ? depth0.subtotal : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"subtotal","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<div class=\"order-tax\">\n  <span class=\"order-item-text\">Tax</span>\n  <span class=\"order-item-price\">$"
    + alias3(((helper = (helper = helpers.tax || (depth0 != null ? depth0.tax : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tax","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<div class=\"order-total\">\n  <span class=\"order-item-text\">Total</span>\n  <span class=\"order-item-price\">$"
    + alias3(((helper = (helper = helpers.total || (depth0 != null ? depth0.total : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"total","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<div class=\"order-name-container\">\n  <input class=\"order-name-input\" type=\"text\" name=\"ordername\" placeholder=\"Enter your name.\">\n</div>\n</div>\n<div class=\"order-checkout\">\n  <button class=\"order-checkout-button button-primary\">Place order!</button>\n</div>\n";
},"useData":true});
this["JST"]["orderExit"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h2 class=\"item-title\">Your order was placed!  Please come pick it up in 30 minutes.</h2>\n<a href=\"\"><button class=\"order-exit-button-return button-primary\">Return home</button></a>\n";
},"useData":true});
this["JST"]["orderItem"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<span class=\"order-item-text\">"
    + alias3(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"number","hash":{},"data":data}) : helper)))
    + ". "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n<span class=\"order-item-price\">$"
    + alias3((helpers.priceFixed || (depth0 && depth0.priceFixed) || alias1).call(depth0,(depth0 != null ? depth0.price : depth0),{"name":"priceFixed","hash":{},"data":data}))
    + "</span>\n<span class=\"order-item-button-remove\"><i class=\"fa fa-times\"></i></span>\n";
},"useData":true});