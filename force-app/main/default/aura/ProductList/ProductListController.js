({
    onInit: function (component, event, helper) {
        component.set("v.sinceId", 0);
        helper.fetchRecords(component, event);

        helper.fetchFilters(component, event);
    },

    handleProductClicked: function (component, event, helper) {
        console.log("handling in list component");
        var product = event.getParam("product");
        console.log("product id here is: " + JSON.stringify(product.id));
        component.set("v.selectedProductId", product.id);
        console.log("selected product ID is now: " + component.get("v.selectedProductId"));
    },

    loadMoreRecords: function (component, event, helper) {
        helper.fetchRecords(component, event);
    },
    onFilterChange: function (component, event, helper) {
        console.log("change in filter");
        component.set("v.sinceId", "0");
        component.set("v.productList", []);

        var newVendor = component.find("vendorPicklist").get("v.value");
        var newType = component.find("typePicklist").get("v.value");
        var newScope = component.find("scopePicklist").get("v.value");

        component.set("v.selectedVendor", newVendor);
        component.set("v.selectedType", newType);
        component.set("v.selectedScope", newScope);

        helper.fetchRecords(component, event);
    }
});