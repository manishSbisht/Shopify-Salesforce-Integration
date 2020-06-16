({
    onInit: function (component, event, helper) {
        component.set("v.sinceId", 0);
        helper.fetchRecords(component, event);

        helper.fetchFilters(component, event);
    },
    handleCustomerClicked: function (component, event, helper) {
        console.log("handling in list component");
        var customer = event.getParam("customer");
        console.log("customer id here is: " + JSON.stringify(customer.id));
        component.set("v.selectedCustomerId", customer.id);
        console.log("selected customer ID is now: " + component.get("v.selectedCustomerId"));
    },
    loadMoreRecords: function (component, event, helper) {
        helper.fetchRecords(component, event);
    },
    onFilterChange: function (component, event, helper) {
        console.log("change in filter");
        component.set("v.sinceId", "0");
        component.set("v.customerList", []);

        var newOrderCount = component.find("orderCountPicklist").get("v.value");
        var newCountry = component.find("countryPicklist").get("v.value");
        var newMarketing = component.find("marketingPicklist").get("v.value");

        component.set("v.selectedOrderCount", newOrderCount);
        component.set("v.selectedCountry", newCountry);
        component.set("v.selectedMarketing", newMarketing);

        helper.fetchRecords(component, event);
    }
});