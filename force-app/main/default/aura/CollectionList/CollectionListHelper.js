({
    fetchRecords: function (component, event) {
        if (component.get("v.selectedType") == 'custom') {
            component.set("v.limit", 4);
            this.fetchCustomCollections(component, event);

        }
        if (component.get("v.selectedType") == 'smart') {
            component.set("v.limit", 4);
            this.fetchSmartCollections(component, event);

        } else if (component.get("v.selectedType") == '') {
            component.set("v.limit", 2);
            this.fetchCustomCollections(component, event);
            this.fetchSmartCollections(component, event);
        }
    },
    fetchSmartCollections: function (component, event) {
        var limit = component.get("v.limit");
        var sinceId_smart = component.get("v.sinceId_smart");
        var filters = {};
        filters['published_status'] = component.get("v.selectedPubStatus");
        filters['type'] = component.get("v.selectedType");
        var fields = [];

        if (sinceId_smart === "-1") {
            return;
        }
        var action = component.get("c.getSmartCollections");
        action.setParams({
            fetch_limit: limit,
            sinceId_smart: sinceId_smart,
            filters: filters,
            fields: fields
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                var newSmartCollectionList = response.getReturnValue();
                console.log('stingified response: ' + JSON.stringify(newSmartCollectionList));

                if (newSmartCollectionList.length > 0) {
                    console.log("Yes, there is atleast 1 element");
                    newSmartCollectionList.forEach(myFunction);

                    function myFunction(value, index, array) {
                        console.log(value.id, value.title);
                    }

                    var currCollectionList = component.get("v.collectionList");
                    console.log("old list:");
                    console.log(currCollectionList.forEach(myFunction));

                    currCollectionList = currCollectionList.concat(newSmartCollectionList);

                    console.log("final list:");
                    currCollectionList.forEach(myFunction);

                    component.set("v.collectionList", currCollectionList);
                    component.set("v.sinceId_smart", newSmartCollectionList[newSmartCollectionList.length - 1].id);

                    component.set('v.showLoadMore', true);

                    // console.log(`
                    // Now smart Since ID: `+ component.get("v.sinceId_smart"));
                }
                else {
                    console.log("End of smart collection List, NO MORE LEFT to fetch");
                    component.set('v.showLoadMore', false);
                    component.set('v.sinceId_smart', '-1');
                }
            } else {
                console.log("Error in calling server side action");
            }
        });
        $A.enqueueAction(action);

    },
    fetchCustomCollections: function (component, event) {
        var sinceId_custom = component.get("v.sinceId_custom");
        var limit = component.get("v.limit");
        var filters = {};
        filters['published_status'] = component.get("v.selectedPubStatus");
        filters['type'] = component.get("v.selectedType");

        var fields = [];
        if (sinceId_custom === "-1") {
            return;
        }
        var action = component.get("c.getCustomCollections");
        action.setParams({
            fetch_limit: limit,
            sinceId_custom: sinceId_custom,
            filters: filters,
            fields: fields
        });
        console.log("calling c.getCustomCollections with: ");
        console.log("limit:" + limit + ",sinceID: " + sinceId_custom);

        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                var newCustomCollectionList = response.getReturnValue();
                console.log('stingified response customList: ' + JSON.stringify(newCustomCollectionList));

                if (newCustomCollectionList.length > 0) {
                    console.log("Yes, there is atleast 1 element");
                    newCustomCollectionList.forEach(myFunction);

                    function myFunction(value, index, array) {
                        console.log(value.id, value.title);
                    }

                    var currCollectionList = component.get("v.collectionList");
                    console.log("old list:");
                    console.log(currCollectionList.forEach(myFunction));

                    currCollectionList = currCollectionList.concat(newCustomCollectionList);

                    console.log("final list:");
                    currCollectionList.forEach(myFunction);
                    component.set("v.collectionList", currCollectionList);
                    component.set("v.sinceId_custom", newCustomCollectionList[newCustomCollectionList.length - 1].id);
                    component.set('v.showLoadMore', true);
                    // console.log(`
                    // Now custom Since ID: `+ component.get("v.sinceId_custom"));
                }
                else {
                    // empty list from API

                    console.log("End of Custom collection List only, NO MORE LEFT to fetch");
                    component.set('v.sinceId_custom', '-1');
                    component.set('v.showLoadMore', false);

                }
            } else {
                console.log("Error in calling server side action");
            }
        });
        $A.enqueueAction(action);
    },

})