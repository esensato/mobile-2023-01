document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    document.getElementById("request").addEventListener("click", request); 
    document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture); 
}

const request = () => {
    cordova.plugin.http.get('https://pedidos-pizzaria.glitch.me/json', {
}, {}, function(response) {
  console.log(response.data);
}, function(response) {
  console.error(response.error);
});

}

function cameraTakePicture() { 
    navigator.camera.getPicture(onSuccess, onFail, {  
       quality: 50, 
       destinationType: Camera.DestinationType.DATA_URL 
    });  
    
    function onSuccess(imageData) { 
       var image = document.getElementById('myImage'); 
       image.src = "data:image/jpeg;base64," + imageData; 
    }  
    
    function onFail(message) { 
       alert('Failed because: ' + message); 
    } 
 }