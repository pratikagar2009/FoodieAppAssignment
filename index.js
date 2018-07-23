
//for search bar
function search(){
    let searchHeaders = {
    "user-key": "291c16dfc1f62b9c11fee14ca67ad025"
    }
      const form = document.getElementById('searchForm');
        const searchItem = document.getElementById("search_item");
        $("#search_item").empty();
  const url1 = "https://developers.zomato.com/api/v2.1/search?q="+form.value;
        fetch(url1,{
        method: 'GET',
        headers: searchHeaders
        })
        .then((resp) => resp.json())
        .then(function(data){
          let restos = data.restaurants; // Get the results
        return restos.map(function(restaurants) { // Map through the results and for each run the code below
            console.log(restaurants);
        var div = document.createElement("div");
        var div1 = document.createElement('div');
         // Create the elements we need
        img = document.createElement('img');
        cardBody = document.createElement('div');
        h5 = document.createElement('h5');
        p = document.createElement('p');
        //a = document.createElement('a');
        var button = createButton( "ADD");
        div.className = "col-lg-3 col-md-6 mb-5";
        div1.className = "card  narrower restaurants";
  
        // div.className = "search card";
        img.className = "card-img-top";
        cardBody.className = "card-body";
        h5.className = "card-title";
        p.className = "card-text";
        //a.className = "btn btn-indigo";
        button.id = restaurants.restaurant.id;
        img.src = restaurants.restaurant.featured_image; // Add the source of the image to be the src of the img element
        h5.innerHTML = `${restaurants.restaurant.name}` ;
        p.innerHTML = `${restaurants.restaurant.cuisines}`;
        button.textContent = "Add" // Make the HTML of our span to be the first and last name of our author
        //cardBody.appendChild(img);
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(button);
        div1.appendChild(img);
        div1.appendChild(cardBody);
        div.appendChild(div1);
        searchItem.appendChild(div);
        const id = button.id;
                    button.onclick = function(){
                        addCollection(id);
                    }
        })
        })

  
    }


const topRated = document.getElementById("top");
    const url = "https://developers.zomato.com/api/v2.1/collections?city_id=280&count=5";
//for trending
    let myheaders = {
        "user-key": "291c16dfc1f62b9c11fee14ca67ad025"
        }
        
        fetch(url,{
        method: 'GET',
        headers: myheaders
        })
        .then((resp) => resp.json())
        .then(function(data){
          let restos = data.collections; // Get the results
        return restos.map(function(collection) { // Map through the results and for each run the code below
        var div = document.createElement("div"), // Create the elements we need
        img = document.createElement('img'),
        cardBody = document.createElement('div'),
        h5 = document.createElement('h5'),
        p = document.createElement('p');
        var button = createButton( "ADD");
        button.id = collection.collection.collection_id;
        div.className = "collection card";
        img.className = "card-img-top";
        cardBody.className = "card-body";
        h5.className = "card-title";
        p.className = "card-text";
        img.src = collection.collection.image_url; // Add the source of the image to be the src of the img element
        h5.innerHTML = `${collection.collection.title}` ;
        p.innerHTML = `${collection.collection.description}`;
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(button);
        div.appendChild(img);
        div.appendChild(cardBody);
        topRated.appendChild(div);
        const id = button.id;
                    button.onclick = function(){
                        addCollection(id);
                    }
        })
        })
        
        .then(reload());


//const topCollect = document.getElementById("topCollection");
  
function addCollection(id){
    var div = document.getElementById(id).parentElement.parentElement;
    var img = div.firstChild;
    var cardBody = img.nextSibling;
    var name = cardBody.firstChild;
    var text = name.nextSibling;
    var jsonString = {
            "id" : id,
            "img" : img.src,
            "name" : name.innerHTML,
            "text" : text.innerHTML
    }
    let fetchData = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(jsonString) // body data type must match "Content-Type" header
    }
    let addUrl = "http://localhost:3000/collections";
   
    fetch(addUrl, fetchData)
    .then(reload());        //Adding to json-server and calling reload function
  }

  var createButton = function (html) {
    var button = document.createElement('button');
    button.type = "button";
    button.className = "btn btn-danger add";
    button.innerHTML = html;
    button.style.fontSize = 15 + "px";
    return button;
    }


  function reload(){
    var getUrl = "http://localhost:3000/collections";
    topCollection.innerHTML = "";
    fetch(getUrl)
    .then((resp)=>resp.json())
    .then(function(data){
        let collections = data; // Get the results
        return collections.map(function (collection) { // Map through the results and for each run the code below
            var div = document.createElement('div'), //  Create the elements we need
                img = document.createElement('img'),
                cardBody = document.createElement('div'),
                h5 = document.createElement('h5'),
                p = document.createElement('p');
            div.className = "collection card col-md-2";
            img.className = "card-img-top";
            cardBody.className = "card-body";
            h5.className = "card-title";
            p.className = "card-text text-muted";
            img.src = collection.img;  // Add the source of the image to be the src of the img element
            h5.innerHTML = `${collection.name}`;
            p.innerHTML = `${collection.text}`; // Make the HTML of our span to be the first and last name of our author
            var button = createButton("DELETE");
            button.id = collection.id;
            cardBody.appendChild(h5);
            cardBody.appendChild(p);
            div.appendChild(img);
            div.appendChild(cardBody);
            cardBody.appendChild(button);
            topCollection.appendChild(div);
            const id = button.id;
            button.onclick = function(){
                deleteCollection(id);
            }
        })
    })
}

function deleteCollection(id){
    let fetchData = { 
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    }
    let deleteUrl = "http://localhost:3000/collections/"+id;
    
    fetch(deleteUrl, fetchData)
    .then(reload());       
}

