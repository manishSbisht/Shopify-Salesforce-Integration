({
    onInit: function (component, event, helper) {
        var order = component.get("v.order");
        console.log("in the orderListItem: " + JSON.stringify(order));
    },
    onOrderSelect: function (component, event, helper) {
        console.log("click");

        component.set("v.selected", true);

        var orderClicked = $A.get("e.c:orderClicked");
        var order = component.get("v.order");

        var orderId = order.id;
        console.log("with Id: " + orderId);

        // component.set("v.selectedOrderId", orderId);
        // var orderList = component.get("v.orderList");
        var orderItem = component.get("v.order");
        orderClicked.setParams({
            "order": orderItem
        });
        //console.log("event parameter is:" + orderClicked.getParam("orderId"));
        orderClicked.fire();
    }
})