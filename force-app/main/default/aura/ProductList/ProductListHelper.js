({
    fetchRecords: function (component, event) {
        var limit = component.get("v.limit");
        var sinceId = component.get("v.sinceId");
        var filters = {};
        var fields = [];
        // fields = ['id', 'title'];
        filters['vendor'] = component.get("v.selectedVendor");
        filters['product_type'] = component.get("v.selectedType");
        filters['published_scope'] = component.get("v.selectedScope");
        // filters = {
        //     "vendor": component.get("v.selectedVendor"),
        //     "product_type": component.get("v.selectedType"),
        //     "published_scope": component.get("v.selectedScope")
        // }
        // fields = [];
        console.log("Filter set: ");
        console.log('vendor: ' + filters.vendor);
        console.log('type: ' + filters.product_type);
        console.log('scope: ' + filters.published_scope);




        var action = component.get("c.getProducts");
        action.setParams({
            fetch_limit: limit,
            sinceId: sinceId,
            filters: filters,
            fields: fields
        });

        console.log(filters);
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                var newProductList = response.getReturnValue();
                console.log('stingified response: ' + JSON.stringify(newProductList));
                if (newProductList.length > 0) {
                    console.log("Yes, there is atleast 1 element");
                    // newProductList.forEach(myFunction);

                    function myFunction(value, index, array) {
                        console.log(value.id);
                    }

                    var currProductList = component.get("v.productList");
                    // console.log("old list:");
                    // console.log(currProductList.forEach(myFunction));


                    currProductList = currProductList.concat(newProductList);


                    // console.log("final list:");
                    // currProductList.forEach(myFunction);
                    component.set("v.productList", currProductList);
                    component.set("v.sinceId", newProductList[newProductList.length - 1].id);
                    component.set('v.showLoadMore', true);

                    console.log(`
                    Now Since ID: `+ component.get("v.sinceId"));
                }
                else {
                    console.log("End of product List, NO MORE LEFT to fetch");
                    component.set('v.showLoadMore', false);
                }
            } else {
                console.log("Error in calling server side action");
            }
        });
        $A.enqueueAction(action);
    },
    fetchFilters: function (component, event) {
        var action = component.get("c.getProductFilters");

        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                var filterMap = response.getReturnValue();
                // console.log(filterMap);
                component.set("v.vendorOptions", filterMap.vendor);
                component.set("v.typeOptions", filterMap.product_type);
                component.set("v.scopeOptions", filterMap.published_scope);
            }
            else {
                console.log("Error in calling server side action");
            }
        });
        $A.enqueueAction(action);
    },

})