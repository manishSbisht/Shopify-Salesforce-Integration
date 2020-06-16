({
    onInit: function (component, event, helper) {
        var product = component.get("v.product");
        console.log("in the productListItem: " + JSON.stringify(product));
    },
    onProductSelect: function (component, event, helper) {
        console.log("click");

        component.set("v.selected", true);

        var productClicked = $A.get("e.c:productClicked");
        var product = component.get("v.product");

        var productId = product.id;
        console.log("with Id: " + productId);

        var productItem = component.get("v.product");
        productClicked.setParams({
            "product": productItem
        });
        productClicked.fire();
    }
})