//unsplash api:   https://unsplash.com/documentation#location
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// let ready= false;
// let imageLoaded = 0;
// let totalImages = 0;
let photosArray = [];


const count=30;
const apiKey='h-n0tYKq0rBlyVaRSCIQwwdvYoOiYdrPFFYcbk3Wqr4';
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


//cheak if all the image is loaded
// function imageLoaded(){
//     console.log('image loaded');
//     imageLoaded++;
//     if(imageLoaded===totalImages){
//         ready=true;
//         // loader.hidden=true;
//          console.log('ready=',ready);
//     }
// }



//helper function to set attributeon dom element
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


//create element for links and photos, add to dom
function displayPhotos(){
    // imageLoaded=0;
    // totalImages=photosArray.length;
    // console.log('totalimages',totalImages);
    //run function for each element in the array
    photosArray.forEach((photo) =>{
   //create <a> to link to unplash
   const item = document.createElement('a');
//    item.setAttribute('href', photo.links.html);
//    item.setAttribute('target','_blank');
setAttributes(item, {
    href: photo.links.html,
    target: '_blank',    
})

   //create image for photos
   const img = document.createElement('img');
//    img.setAttribute('src', photo.urls.regular);
//    img.setAttribute('alt', photo.alt_description);
//    img.setAttribute('title', photo.alt_description);
setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,
});

//event listener cheak when is each is finished loading
// img.addEventListener('load', imageLoaded);



   //put img inside <a> then put inside imageContainer element
   item.appendChild(img);
   imageContainer.appendChild(item); 

    });
}


//get photos from unplash api
async function getPhotos(){
    try{
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    }catch(error){
        //error here
    }
}

//cheak to see if the scrolling near bottom of the page, load more photos
window.addEventListener('scroll', () => {
    // console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 ){
        // ready=false;
        getPhotos();
    }
})

// on load
getPhotos();