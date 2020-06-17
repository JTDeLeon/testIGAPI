// https://jtdeleon.github.io/testIGAPI/

// https://api.instagram.com/oauth/authorize
//   ?client_id=1350207848523629
//   &redirect_uri=https://jtdeleon.github.io/testIGAPI/
//   &scope=user_profile,user_media
//   &response_type=code

//   https://jtdeleon.github.io/testIGAPI/?code=AQD3UtdHpIqx5B5sQTxPfupzluTG3E4mFi39M2kDFnQXhSi9ivy58XDBhe7Q4yAMI6Wxg707q8ynpNVRJQ3U8ALeeAjXoR3BRsyQs8P9yFSd3cXp836Qe_dXAu2WYbtyN7VwpwBjfkbOi00hO8sSBZzXMnB3rLlXt2xK64eaJ2ebYFo23aOq7HyIXNjkBuzatEVndyVlRxGwTgxY0GJ-C80fiWmC_0WCbvhXjLN9lINBxA

//   curl -X POST \
//   https://api.instagram.com/oauth/access_token \
//   -F client_id=1350207848523629 \
//   -F client_secret=9bab5441d83d4a10c93c7ce68787fb8a \
//   -F grant_type=authorization_code \
//   -F redirect_uri=https://jtdeleon.github.io/testIGAPI/ \
//   -F code=AQD3UtdHpIqx5B5sQTxPfupzluTG3E4mFi39M2kDFnQXhSi9ivy58XDBhe7Q4yAMI6Wxg707q8ynpNVRJQ3U8ALeeAjXoR3BRsyQs8P9yFSd3cXp836Qe_dXAu2WYbtyN7VwpwBjfkbOi00hO8sSBZzXMnB3rLlXt2xK64eaJ2ebYFo23aOq7HyIXNjkBuzatEVndyVlRxGwTgxY0GJ-C80fiWmC_0WCbvhXjLN9lINBxA

// success -- 
//   {"access_token": "IGQVJXaFhKZAmZAsWGlDTTRlSlVWOUZAkUldiZA1ZAQZAFJISjhQVElFb0ZAaRi1KWlBWeDhzclNOM1FJQXJZAWVNFVXo2UjVLMVdBcUlXaXVoRGl1b3R6empFY3ZAEc25MS3VIMUoxczVISjZAfRU1Qem8tX0w5aUVxNjRQbUw5RGJr", "user_id": 17841437095722686}

// https://www.instagram.com/wondroustraveling/?__a=1

console.log('index js loaded');
let username;

var string = '';
document.querySelector('.input-field').addEventListener('input', (item)=>{
    if (item.inputType === 'deleteContentBackward'){
        string = string.substring(0, string.length - 1);
    } else if(item.inputType === 'insertText') {
        string += item.data;
    } else {
        console.log('input type not recognized')
    }
    username = string
})

console.log("String is : ", string)



// const username = 'travelawesome'


document.querySelector('#submit').addEventListener('click', () => {
    doSomething();
    string = ''
});



async function doSomething() {
    let returnData = await getData(username);
    console.log(returnData[1].node.thumbnail_src)
}


function getData(username) {
    return fetch(`https://www.instagram.com/${username}/?__a=1`)
    .then(response => response.json())
    .then(data => {
        var mediaArray = data.graphql.user.edge_owner_to_timeline_media.edges.map((i)=>{return i})
        console.log(mediaArray)
        // var dataObj = data.graphql.user.edge_owner_to_timeline_media.edges
        // console.log(dataObj)

        for (let item of mediaArray) {
            var text = item.node.edge_media_to_caption.edges[0].node.text;
            var imgSrc = item.node.display_url
            console.log(imgSrc)
            addElement(text, imgSrc);
        }

        return mediaArray 
        // console.log(returnData.graphql.user.edge_owner_to_timeline_media)
    });
}

function addElement (text = 'default text', imgSrc) { 
    // create a new div element 
    var newDiv = document.createElement("div"); 
    var newText = document.createElement("p"); 
    var newImg = document.createElement("img"); 

    var a = document.createElement('a');
        a.href = imgSrc;
        a.target = "_blank"
        a.textContent = 'download'
   
    newText.textContent = text; 
    newImg.src = imgSrc
    
    newDiv.appendChild(newText);  
    newDiv.appendChild(newImg);  
    newDiv.appendChild(a);  
  
    document.querySelector(".container").insertAdjacentElement('afterbegin', newDiv)
}