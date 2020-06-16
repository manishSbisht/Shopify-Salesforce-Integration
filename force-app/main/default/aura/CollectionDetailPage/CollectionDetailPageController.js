({
    handleCollectionClicked: function (component, event, helper) {

        console.log("handling in detail component");
        component.set("v.collection", '');
        var collectionItemFromEvent = event.getParam("collection");
        // console.log("collection from event is: " + JSON.stringify(collectionItemFromEvent));


        var action = component.get("c.getThisCollection");
        action.setParams({
            id: collectionItemFromEvent.id
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                var collectionDetail = response.getReturnValue();
                component.set("v.collection", collectionDetail);
            } else {
                console.log("Error in calling server side action");
            }
        });
        $A.enqueueAction(action);

        // var collectionData = component.get("v.collection");
        // console.log("now the cc detail is: " + JSON.stringify(collectionData));
    }
})