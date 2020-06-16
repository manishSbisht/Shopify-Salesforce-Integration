({
    onInit: function (component, event, helper) {
        component.set("v.sinceId", 0);
        helper.fetchRecords(component, event);

        helper.fetchFilters(component, event);
    },
    handleOrderClicked: function (component, event, helper) {
        console.log("handling in list component");
        var order = event.getParam("order");
        console.log("order id here is: " + JSON.stringify(order.id));
        component.set("v.selectedOrderId", order.id);
        console.log("selected order ID is now: " + component.get("v.selectedOrderId"));
    },
    loadMoreRecords: function (component, event, helper) {
        helper.fetchRecords(component, event);
    },
    onFilterChange: function (component, event, helper) {
        console.log("change in filter");
        component.set("v.sinceId", "0");
        component.set("v.orderList", []);

        var newStatus = component.find("statusPicklist").get("v.value");
        var newFinStatus = component.find("finStatusPicklist").get("v.value");
        var newFulfStatus = component.find("fulfStatusPicklist").get("v.value");

        component.set("v.selectedStatus", newStatus);
        component.set("v.selectedFinStatus", newFinStatus);
        component.set("v.selectedFulfStatus", newFulfStatus);

        helper.fetchRecords(component, event);
    }
});