({
    handleOrderClicked: function (component, event, helper) {
        console.log("handling in detail component");

        var order = event.getParam("order");
        console.log("here order is: " + JSON.stringify(order));
        component.set("v.order", order);

        var orderdetail = component.get("v.order");
        console.log("now the order detail is: " + JSON.stringify(orderdetail));
    }
})