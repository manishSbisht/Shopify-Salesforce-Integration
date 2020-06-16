public class ShopifySalesforce {
    
    class ShopifyOrder{
        @auraEnabled
        public Class_Order[] orders{get;set;}    
    }
    class ShopifyProduct{
        @auraEnabled
        public Class_Product[] products{get;set;}    
    }
    class ShopifyCustomer{
        @auraEnabled
        public Class_Customer[] customers{get;set;}
    }
    class ShopifyCustomCollection{
        @auraEnabled
        public Class_CustomCollection[] custom_collections{get;set;}
    }
    class ShopifySmartCollection{
        @auraEnabled
        public Class_SmartCollection[] smart_collections{get;set;}
    }
    class ShopifyCollection{
        @auraEnabled
        public Class_Collection collection{get;set;}
    }

    class Class_Order {
        
        @auraEnabled
        public  String id {get;set;}
        
        @auraEnabled
        public  Integer order_number {get;set;}
        
        @auraEnabled
        public String email {get;set;}
        
        @auraEnabled
        public Decimal total_price{get;set;}
        
        @auraEnabled
        public String gateway {get;set;}
        
        @auraEnabled
        public Class_Customer customer {get;set;}

        @auraEnabled
        public String financial_status{get;set;}
        
        @auraEnabled
        public String fulfillment_status{get;set;}
        
        @auraEnabled
        public String status{get;set;}
        
    }
    class Class_Product{
        @auraEnabled
        public String id{get;set;}

        @auraEnabled
        public String title{get;set;}

        @auraEnabled
        public Class_Image image{get;set;}

        @auraEnabled
        public Class_variant[] variants{get;set;}

        @auraEnabled
        public String product_type{get;set;}

        @auraEnabled
        public String published_scope{get;set;}

        @auraEnabled
        public String vendor{get;set;}

    }
    class Class_Image{
        
        @auraEnabled
        public String id{get;set;}
        
        @auraEnabled
        public String width{get;set;}

        @auraEnabled
        public String height{get;set;}

        @auraEnabled
        public String src{get;set;}
    }
    class Class_variant{
        @auraEnabled
        public String id{get;set;}

        @auraEnabled
        public Decimal price{get;set;}

        @auraEnabled
        public String title{get;set;}

        @auraEnabled
        public Integer position{get;set;}

        @auraEnabled
        public Decimal weight{get;set;}
        
        @auraEnabled
        public String weight_unit{get;set;}
    }
    class Class_Customer{
        @auraEnabled
        public  String id {get;set;}

        @auraEnabled
        public String first_name {get;set;}

        @auraEnabled
        public String last_name {get;set;}
        
        @auraEnabled
        public Integer orders_count {get;set;}
        
        // @auraEnabled
        // public Class_currency currency {get;set;}
        // 'currency' is reserved keyword: replace in responseData using regex and mapings with something else e.g. 'currency_x'
        
        @auraEnabled
        public String email {get;set;}
        
        @auraEnabled
        public Decimal  total_spent{get;set;}
        
        
        @auraEnabled
        public Class_Address default_address{get;set;}
    }
    class Class_Address{
        
        @auraEnabled
        public String id {get;set;}

        @auraEnabled
        public String address2 {get;set;}

        @auraEnabled
        public String address1 {get;set;}

        @auraEnabled
        public String city{get;set;}

        @auraEnabled
        public String province{get;set;}

        @auraEnabled
        public String zip{get;set;}

        @auraEnabled
        public String country{get;set;}

    }
    class Class_CustomCollection{
        @auraEnabled
        public String id {get;set;}
        
        @auraEnabled
        public String title{get;set;}

        @auraEnabled
        public Class_Image image{get;set;}
    }
    class Class_SmartCollection{
        @auraEnabled
        public String id {get;set;}
        
        @auraEnabled
        public String title{get;set;}

        @auraEnabled
        public Class_Image image{get;set;}

        @AuraEnabled
        public Class_Rule[] rules;
    }
    class Class_Rule{
        @auraEnabled
        public String column{get;set;}
        @auraEnabled
        public String relation{get;set;}
        @auraEnabled
        public String condition{get;set;}
    }

    class Class_Collection{
        @auraEnabled
        public String id{get;set;}

        @auraEnabled
        public String title{get;set;}
        
        @auraEnabled
        public String collection_type{get;set;}
        
        @auraEnabled
        public Integer products_count{get;set;}

        @auraEnabled
        public Class_Image image{get;set;}
    }
    // @auraEnabled
    // public static List<Account> getAccountList(){
        
    //     // List<ShopifySalesforce.ShopOrder> orderList = new List<ShopifySalesforce.ShopOrder>();
    //     List<Account> listAcc =new List<Account>();

    //     listAcc = [Select Name, id from Account limit 100];
  
    //     for(Account acc:listAcc)
    //         System.debug(acc);
        
    //     return listAcc;
    // }
    public static HttpRequest createRequest(String objectURLSuffix,  Integer fetch_limit, String sinceId, Map<String,String> filters, String[] fields){
        HttpRequest  req = new HttpRequest();
        
        string endPointValue = 'https://manishbisht-devstore.myshopify.com/admin/api/2020-04/';

        if(objectURLSuffix != ''){
            endPointValue += objectURLSuffix;
        }
        else{
            System.debug('EMPTY objectURLSuffix, endPoint is Invalid!');
        }

       
        endPointValue += '?';
        if(fetch_limit!=-1){
            // -1 is when all records are needed to be fetched at once
            endPointValue += 'limit='+fetch_limit+'&';
        }
        
        if(sinceId != ''){
            endPointValue += 'since_id='+sinceId+'&';
        }else {
            System.debug('EMPTY SINCE ID!');
        }

        if(!(filters.isEmpty()&&filters == null)){
            for(String key: filters.keySet()){
                String para='';
                // encode values as they may contain spaces
                para += key + '=' + EncodingUtil.urlEncode(filters.get(key), 'UTF-8') + '&';
                endPointValue += para;
                // don't encode the whole URL!, only the part that may contain spaces
            }
        }else {
            System.debug('empty filters');
        }

        if(!fields.isEmpty()){
            endPointValue += 'fields=';
            for(String f: fields){
                endPointValue += f+',';
            }
        }

        System.debug('Final endPointValue is(after encode)>> '+endPointValue);


        req.setEndpoint(endPointValue);
        String username = 'b2bf97af1521aa96782b2d5a159a26c9';
        String password = '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';
        Blob headerValue = Blob.valueOf(username + ':' + password);
        String authorizationHeader = 'Basic ' + EncodingUtil.base64Encode(headerValue);
        req.setHeader('Authorization', authorizationHeader);
        
        req.setHeader('content-type', 'application/json');
        req.setMethod('GET');

        return req;
    }
    public static HttpResponse getResponse(String objectURLSuffix, Integer fetch_limit, String sinceId, Map<String,String> filters, String[] fields){
        
        HttpRequest req = createRequest(objectURLSuffix, fetch_limit, sinceId, filters, fields);
        
        Http h = new Http();

        HttpResponse res = h.send(req);
        
        return res;
    }
    @AuraEnabled
    public  static List<Class_Product> getProducts(Integer fetch_limit, String sinceId, Map<String,String> filters, String[] fields){
        String objectURLSuffix = 'products.json';
        
        HttpResponse res = getResponse(objectURLSuffix, fetch_limit, sinceId,filters, fields);
        
        // System.debug('Original reponse: '+res.getBody());
        String responseBody = String.valueOf(res.getBody());
        
        // System.debug('Stringified responsebody>> '+responseBody);
        
        
        ShopifyProduct result = (ShopifyProduct)JSON.deserialize(responseBody, ShopifyProduct.class);
        
        // System.debug('after deserialize>>');
        // System.debug(result);

        List<Class_Product> ProductList = new List<Class_Product>();
        for(Class_Product i: result.products){
            
            // System.debug('O: >>'+i);  
            // System.debug('id>>'+i.id);
            // System.debug('title>>'+i.title);
            // System.debug('imgID>>'+i.image.id);
            // System.debug('src>>'+i.image.src);
            // System.debug('height>>'+i.image.height);

            ProductList.add(i);
        }
        // System.debug(ProductList);
        return ProductList;
    }


    @AuraEnabled
    public  static List<Object> getOrders(Integer fetch_limit, String sinceId, Map<String,String> filters, String[] fields){
        String objectURLSuffix = 'orders.json';
        
        HttpResponse res = getResponse(objectURLSuffix, fetch_limit, sinceId,filters, fields);
        

        String responseBody = String.valueOf(res.getBody());
        
        System.debug('responsebody>> '+responseBody);
        
        // Map<String, Object> objmap = new Map<String, Object>();
        // objmap = JSON.deserializeUntyped(responseBody);
        
        ShopifyOrder result = (ShopifyOrder)JSON.deserialize(responseBody, ShopifyOrder.class);
        
        System.debug('after deserialize>>');
        System.debug(result);

        List<Class_Order> OrderList = new List<Class_Order>();
        for(Class_Order i: result.orders){
            
            // System.debug('O: >>'+i);  
            // System.debug('total_price>>'+i.total_price);
            // System.debug('gateway>>'+i.gateway);
            // System.debug('Order#>>'+i.order_number);
            // System.debug('Cust>>'+i.customer.id);

            OrderList.add(i);
        }

        // System.debug('before returning to component'+OrderList) ;
        return OrderList;
    }

   
    @AuraEnabled
    public  static List<Object> getCustomers(Integer fetch_limit, String sinceId, Map<String,String> filters, String[] fields){
        String objectURLSuffix = 'customers.json';
        
        HttpResponse res = getResponse(objectURLSuffix, fetch_limit, sinceId, filters, fields);
        

        String responseBody = String.valueOf(res.getBody());
        
        // System.debug('responsebody>> '+responseBody);
        
        ShopifyCustomer result = (ShopifyCustomer)JSON.deserialize(responseBody, ShopifyCustomer.class);
        
        System.debug('after deserialize>>');
        System.debug(result);

        List<Class_Customer> customerList = new List<Class_Customer>();
       for(Class_Customer i: result.customers){
            
            System.debug('O: >>'+i);  
            System.debug('id>>'+i.id);
            System.debug('first>>'+i.first_name);
            System.debug('email>>'+i.email);
            System.debug('tot_spent>>'+i.total_spent);
       

            customerList.add(i);
        }
        System.debug(customerList);
        return customerList;
    }
  
    @AuraEnabled
    public  static List<Object> getSmartCollections(Integer fetch_limit, String sinceId_smart, Map<String,String> filters, String[] fields){
        String objectURLSuffix = 'smart_collections.json';
        
        HttpResponse res = getResponse(objectURLSuffix, fetch_limit, sinceId_smart, filters, fields);

        String responseBody = String.valueOf(res.getBody());
        // System.debug('responsebody>> '+responseBody);
        
        
        ShopifySmartCollection result = (ShopifySmartCollection)JSON.deserialize(responseBody, ShopifySmartCollection.class);
        
        System.debug('after deserialize>>');
        System.debug(result);
        
        List<Object> smartCollectionList = new List<Object>();
        
        for(Class_SmartCollection i: result.smart_collections){
            
            System.debug('O: >>'+i);  
            System.debug('id>>'+i.id);
            System.debug('title>>'+i.title);
            System.debug('height>>'+i.image.height);
            System.debug('image>>'+i.image.src);
            System.debug('width>>'+i.image.width);

            smartCollectionList.add(i);
        }
        System.debug(smartCollectionList);
        
        return smartCollectionList;
    }
    
    @AuraEnabled
    public  static List<Object> getCustomCollections(Integer fetch_limit, String sinceId_custom, Map<String,String> filters, String[] fields){
        String objectURLSuffix = 'custom_collections.json';
        
        HttpResponse res = getResponse(objectURLSuffix, fetch_limit, sinceId_custom, filters, fields);

        String responseBody = String.valueOf(res.getBody());
        System.debug('responsebody>> '+responseBody);
        
        
        ShopifyCustomCollection result = (ShopifyCustomCollection)JSON.deserialize(responseBody, ShopifyCustomCollection.class);
        
        System.debug('after deserialize>>');
        System.debug(result);
        List<Object> customCollectionList = new List<Object>();
        
        
        for(Class_CustomCollection i: result.custom_collections){
            
            System.debug('O: >>'+i);  
            System.debug('id>>'+i.id);
            System.debug('title>>'+i.title);
            System.debug('height>>'+i.image.height);
            System.debug('image>>'+i.image.src);
            System.debug('width>>'+i.image.width);

            customCollectionList.add(i);
        }
        System.debug(customCollectionList);
        
        return customCollectionList;
    }
/* 
    @AuraEnabled
    public  static List<Object> getAllCollections(Integer fetch_limit, String sinceId_smart, String sinceId_custom, Map<String,String> filters, String[] fields){
        List<Object> allCollectionList = new List<Object>();
        
        List<Object> smartCollectionList = getSmartCollections(fetch_limit, sinceId_smart);
        List<Object> customCollectionList  = getCustomCollections(fetch_limit, sinceId_custom);
        
        allCollectionList.addAll(smartCollectionList);
        allCollectionList.addAll(customCollectionList);
        
        return allCollectionList;
    }
 */
    @AuraEnabled
    public static Object getThisCollection(String id){
        String objectURLSuffix;

        if(id != ''){
            System.debug('collection id to fetch: '+id);

            objectURLSuffix = 'collections/'+id+'.json';
        }else {
            System.debug('ID is empty!');
        }
        Map<String,String> emptyMap = new Map<String,String>();
        List<String> emptyList = new List<String>();
        HttpResponse res = getResponse(objectURLSuffix,3,'',emptyMap,emptyList);

        String responseBody = String.valueOf(res.getBody());
        System.debug('responsebody>> '+responseBody);
        
        
        ShopifyCollection result = (ShopifyCollection)JSON.deserialize(responseBody, ShopifyCollection.class);
        
        System.debug('after deserialize>>');
        System.debug(result);
        Class_Collection collection =  result.collection;
            System.debug('O: >>'+collection);  
            System.debug('id>>'+collection.id);
            System.debug('Type>>'+collection.collection_type);
            System.debug('title>>'+collection.title);
            System.debug('height>>'+collection.image.height);
            System.debug('image>>'+collection.image.src);
            System.debug('width>>'+collection.image.width);

        
        System.debug(collection);
        
        return collection;

    }

    @AuraEnabled
    public static Map <String,List<String>> getProductFilters (){
        Map <String,List<String>> filterListMap = new Map <String,List<String>>();
        List<String> fieldsToFetch = new List<String>{'vendor', 'product_type', 'published_scope'};
        Map <String,String> filters = new Map <String,String>();
        
        List<Class_Product> prods = new List<Class_Product>();
        prods = (List<Class_Product>)getProducts(-1, '', filters, fieldsToFetch);
        // System.debug('only filters>>');
        // System.debug(prods);
        // System.debug('number of prods:');
        // System.debug(prods.size());
        Set<String> allVendorSet = new Set<String>();
        Set<String> allTypeSet = new Set<String>();
        Set<String> allScopeSet = new Set<String>();
        
        for(Class_Product p: prods){
            allVendorSet.add(p.vendor);
            allTypeSet.add(p.product_type);
            allScopeSet.add(p.published_scope);
        }
        
        List<String> allVendorList = new List<String>(allVendorSet);
        List<String> allTypeList = new List<String>(allTypeSet);
        List<String> allScopeList = new List<String>(allScopeSet);
        // System.debug('Unique Lists>>>');
        // System.debug(allVendorList);
        // System.debug(allTypeList);
        // System.debug(allScopeList);
        
        String v1 = 'vendor';
        filterListMap.put(v1, allVendorList);
        String v2 = 'product_type';
        filterListMap.put(v2, allTypeList);
        String v3 = 'published_scope';
        filterListMap.put(v3, allScopeList);

        // System.debug(filterListMap);

        return filterListMap;
    }
    @AuraEnabled
    public static Map <String,List<String>> getOrderFilters(){
        Map <String,List<String>> filterListMap = new Map <String,List<String>>();
        List<String> fieldsToFetch = new List<String>{'fulfillment_status', 'financial_status'};
        
        Map <String,String> filters = new Map <String,String>();
        
        List<Class_Order> orders = new List<Class_Order>();
        orders = (List<Class_Order>)getOrders(-1, '', filters, fieldsToFetch);
        // System.debug('only filters>>');
        // System.debug(prods);
        // System.debug('number of prods:');
        // System.debug(prods.size());
        Set<String> filter1ValSet = new Set<String>();
        Set<String> filter2ValSet = new Set<String>();
        
        for(Class_Order p: orders){
            filter1ValSet.add(p.fulfillment_status);
            filter2ValSet.add(p.financial_status);
        }
        
        List<String> filter1ValList = new List<String>(filter1ValSet);
        List<String> filter2ValList = new List<String>(filter2ValSet);
        // System.debug('Unique Lists>>>');
        // System.debug(allVendorList);
        // System.debug(allTypeList);
        
        String v1 = 'fulfillment_status';
        filterListMap.put(v1, filter1ValList);
        String v2 = 'financial_status';
        filterListMap.put(v2, filter2ValList);

        // System.debug(filterListMap);

        return filterListMap;       
    }

    @AuraEnabled
    public static Map <String,List<String>> getCustomerFilters(){
        Map <String,List<String>> filterListMap = new Map <String,List<String>>();
        List<String> fieldsToFetch = new List<String>{'default_address', 'orders_count'};
        
        Map <String,String> filters = new Map <String,String>();
        
        List<Class_Customer> customers = new List<Class_Customer>();
        customers = (List<Class_Customer>)getCustomers(-1, '', filters, fieldsToFetch);
        // System.debug('only filters>>');
        // System.debug(prods);
        // System.debug('number of prods:');
        // System.debug(prods.size());
        Set<String> filter1ValSet = new Set<String>();
        Set<String> filter2ValSet = new Set<String>();
        
        for(Class_Customer c: customers){
            if(c.default_address.country!=''){
                filter1ValSet.add(c.default_address.country);
            }
            filter2ValSet.add(String.valueOf(c.orders_count) );
        }
        
        List<String> filter1ValList = new List<String>(filter1ValSet);
        List<String> filter2ValList = new List<String>(filter2ValSet);

        filter1ValList.sort();
        filter2ValList.sort();
        // System.debug('Unique Lists>>>');
        // System.debug(allVendorList);
        // System.debug(allTypeList);
        
        String v1 = 'country';
        filterListMap.put(v1, filter1ValList);
        String v2 = 'orders_count';
        filterListMap.put(v2, filter2ValList);

        System.debug(filterListMap);

        return filterListMap;       
    }
    
}