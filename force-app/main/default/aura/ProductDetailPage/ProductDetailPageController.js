({
    handleProductClicked: function (component, event, helper) {
        console.log("handling in detail component");

        var product = event.getParam("product");
        console.log("here product is: " + JSON.stringify(product));
        component.set("v.product", product);

        var productdetail = component.get("v.product");
        console.log("now the product detail is: " + JSON.stringify(productdetail));
    }
})