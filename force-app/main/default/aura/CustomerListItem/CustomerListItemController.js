({
    onInit: function (component, event, helper) {
        var customer = component.get("v.customer");
        console.log("in the customerListItem: " + JSON.stringify(customer));
    },
    onCustomerSelect: function (component, event, helper) {
        console.log("click");

        component.set("v.selected", true);

        var customerClicked = $A.get("e.c:customerClicked");
        var customer = component.get("v.customer");

        var customerId = customer.id;
        console.log("with Id: " + customerId);

        var customerItem = component.get("v.customer");
        customerClicked.setParams({
            "customer": customerItem
        });
        //console.log("event parameter is:" + customerClicked.getParam("customerId"));
        customerClicked.fire();
    }
})