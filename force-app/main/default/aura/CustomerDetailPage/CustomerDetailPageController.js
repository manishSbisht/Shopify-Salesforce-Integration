({
    handleCustomerClicked: function (component, event, helper) {
        console.log("handling in detail component");

        var customer = event.getParam("customer");
        console.log("here customer is: " + JSON.stringify(customer));
        component.set("v.customer", customer);

        var customerdetail = component.get("v.customer");
        console.log("now the customer detail is: " + JSON.stringify(customerdetail));
    },
})