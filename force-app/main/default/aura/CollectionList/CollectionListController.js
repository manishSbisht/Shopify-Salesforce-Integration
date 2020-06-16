({
    onInit: function (component, event, helper) {
        component.set("v.sinceId_custom", "0");
        component.set("v.sinceId_smart", "0");

        helper.fetchRecords(component, event);
    },

    handleCollectionClicked: function (component, event, helper) {
        console.log("handling in list component");
        var collection = event.getParam("collection");
        console.log("collc. id here is: " + JSON.stringify(collection.id));
        component.set("v.selectedCollectionId", collection.id);
        console.log("selected collc. ID is now: " + component.get("v.selectedCollectionId"));
    },
    loadMoreRecords: function (component, event, helper) {
        helper.fetchRecords(component, event);
    },
    onFilterChange: function (component, event, helper) {
        console.log("change in filter");
        component.set("v.sinceId_smart", "0");
        component.set("v.sinceId_custom", "0");
        component.set("v.collectionList", []);

        var newType = component.find("typePicklist").get("v.value");
        var newpubStatus = component.find("pubStatusPicklist").get("v.value");

        if (newpubStatus == 'POS') {
            newpubStatus = 'pos:visible';
        } else if (newpubStatus == 'Google Shopping') {
            newpubStatus = 'google-shopping-2:visible';
        }
        else if (newpubStatus == 'Online Store') {
            newpubStatus = 'online_store:visible';
        }

        component.set("v.selectedType", newType);
        component.set("v.selectedPubStatus", newpubStatus);

        helper.fetchRecords(component, event);
    }
});