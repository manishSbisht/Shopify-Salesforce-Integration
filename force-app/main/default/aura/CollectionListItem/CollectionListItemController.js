({
    onInit: function (component, event, helper) {
        var collection = component.get("v.collection");
        console.log("in the collectionListItem: " + JSON.stringify(collection));
    },
    onCollectionSelect: function (component, event, helper) {
        console.log("click");

        component.set("v.selected", true);

        var collectionclickevent = $A.get("e.c:CollectionClicked");

        var collectionItem = component.get("v.collection");
        console.log("with Id: " + collectionItem.id);

        collectionclickevent.setParams({
            "collection": collectionItem
        });
        collectionclickevent.fire();
    }
})