

function Information(){
  this.items = [];
  this.users = [];
  this.currentUser = "Lucy";
  
};

// we use the locally cached model to lookup elements...
Information.prototype.getElement = function(id){
    var item;
    var i;
    for(i=0; i<this.items.length; i++){
        item = this.items[i];
        if(item.id == id){
            return(item);
        }
    }
};

Information.prototype.searchById = function (id){
    var myList = this;
    var len = myList.items.length;
    for(i=0; i< len; i++){
        item = myList.items[i];
        if(item._id == id){
            return item;
            console.log("found Item");
        }
    }
};


Information.prototype.loadModel = function() {
    this.loadItems();
    this.loadUsers();
};

Information.prototype.loadItems = function() {
	var myInfo = this;

    // add items
    $.ajax({
        type: "GET",
        url: "/model/items",
    }).done(function(items) {
        myInfo.items = items;
        items.map(function(x){x.id=x["_id"];});
        fridgeView.refreshView(myInfo);
        //mobileFridgeView.refreshView(myInfo);
    })
}

Information.prototype.loadUsers = function() {
	var myInfo = this;
	
	// add users
    $.ajax({
        type: "GET",
        url: "/model/users",
    }).done(function(users) {
        myInfo.users = users;
        users.map(function(x){x.id=x["_id"];});
	//Loads model information into the view
        fridgeView.refreshView(myInfo); 
    });
}

//this is not being used, but reserved for possible future usage.
Information.prototype.addElement = function(newItem){
    console.log("sending "+JSON.stringify(newItem));
    var myList = this;
    $.ajax({
        type: "POST",
        url: "/model/items",
        data: JSON.stringify(newItem),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function(items) {
        myList.loadItems();
    });
}

Information.prototype.updateElement = function(id,newItem){
    var myList = this;
    $.ajax({
        type: "PUT",
        url: "/model/items/"+id,
        data: JSON.stringify(newItem),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function(items) {
        myList.loadItems();
    });
}

Information.prototype.deleteElement = function(id){
    var myList = this;
    $.ajax({
        type: "DELETE",
        url: "/model/items/"+id,
    }).done(function(items) {
        myList.loadItems();
    });
}

    