({
    fetchRecords: function (component, event) {
        var limit = component.get("v.limit");
        var sinceId = component.get("v.sinceId");
        var filters = {};
        var fields = [];

        filters['financial_status'] = component.get("v.selectedFinStatus");
        filters['fulfillment_status'] = component.get("v.selectedFulfStatus");
        filters['status'] = component.get("v.selectedStatus");


        console.log("Filter set: ");
        console.log('S: ' + filters.status);
        console.log('fulfS: ' + filters.fulfillment_status);
        console.log('finS: ' + filters.financial_status);


        var action = component.get("c.getOrders");

        action.setParams({
            fetch_limit: limit,
            sinceId: sinceId,
            filters: filters,
            fields: fields
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                var newOrderList = response.getReturnValue();
                console.log('stingified response: ' + JSON.stringify(newOrderList));
                // console.log('original response: ' + orderArr);
                if (newOrderList.length > 0) {
                    console.log("Yes, there is atleast 1 element");
                    // newOrderList.forEach(myFunction);

                    function myFunction(value, index, array) {
                        console.log(value.id);
                    }

                    var currOrderList = component.get("v.orderList");
                    console.log("old list:");
                    console.log(currOrderList.forEach(myFunction));


                    currOrderList = currOrderList.concat(newOrderList);


                    console.log("final list:");
                    currOrderList.forEach(myFunction);
                    component.set("v.orderList", currOrderList);
                    component.set("v.sinceId", newOrderList[newOrderList.length - 1].id);

                    component.set('v.showLoadMore', true);
                    console.log(`
                    Now Since ID: `+ component.get("v.sinceId"));
                }
                else {
                    console.log("End of order List, NO MORE LEFT to fetch");
                    component.set('v.showLoadMore', false);
                }
            } else {
                console.log("Error in calling server side action");
            }
        });
        $A.enqueueAction(action);

    },
    fetchFilters: function (component, event) {
        var action = component.get("c.getOrderFilters");

        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                var filterMap = response.getReturnValue();
                // console.log(filterMap);
                component.set("v.finStatusOptions", filterMap.financial_status);
                component.set("v.fullfStatusOptions", filterMap.fulfillment_status);
            }
            else {
                console.log("Error in calling server side action");
            }
        });
        $A.enqueueAction(action);
    },
})