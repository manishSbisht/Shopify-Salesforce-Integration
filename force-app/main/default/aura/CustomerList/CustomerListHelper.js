({
    fetchRecords: function (component, event) {
        var limit = component.get("v.limit");
        var sinceId = component.get("v.sinceId");
        var filters = {};
        var fields = [];

        filters['accepts_marketing'] = component.get("v.selectedMarketing");
        filters['country'] = component.get("v.selectedCountry");
        filters['orders_count'] = component.get("v.selectedOrderCount");

        // console.log("Filter set: ");
        // console.log('vendor: ' + filters.vendor);
        // console.log('type: ' + filters.product_type);
        // console.log('scope: ' + filters.published_scope);

        var action = component.get("c.getCustomers");
        action.setParams({
            fetch_limit: limit,
            sinceId: sinceId,
            filters: filters,
            fields: fields
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                var newCustomerList = response.getReturnValue();
                console.log('stingified response: ' + JSON.stringify(newCustomerList));
                if (newCustomerList.length > 0) {
                    console.log("Yes, there is atleast 1 element");
                    // newCustomerList.forEach(myFunction);

                    function myFunction(value, index, array) {
                        console.log(value.id);
                    }

                    var currCustomerList = component.get("v.customerList");
                    console.log("old list:");
                    console.log(currCustomerList.forEach(myFunction));


                    currCustomerList = currCustomerList.concat(newCustomerList);


                    console.log("final list:");
                    currCustomerList.forEach(myFunction);
                    component.set("v.customerList", currCustomerList);
                    component.set("v.sinceId", newCustomerList[newCustomerList.length - 1].id);
                    component.set('v.showLoadMore', true);


                    console.log(`
                    Now Since ID: `+ component.get("v.sinceId"));
                }
                else {
                    console.log("End of customer List, NO MORE LEFT to fetch");
                    component.set('v.showLoadMore', false);
                }
            } else {
                console.log("Error in calling server side action");
            }
        });
        $A.enqueueAction(action);

    },
    fetchFilters: function (component, event) {
        var action = component.get("c.getCustomerFilters");

        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                var filterMap = response.getReturnValue();
                // console.log(filterMap);
                component.set("v.orderCountOptions", filterMap.orders_count);
                component.set("v.countryOptions", filterMap.country);
            }
            else {
                console.log("Error in calling server side action");
            }
        });
        $A.enqueueAction(action);
    }
})