document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    document.getElementById("tirarfoto").addEventListener("click", tirarFoto);

}

const tirarFoto = () => {
    navigator.camera.getPicture(onSuccess, 
                                onFail, 
                                { quality: 50, 
                                  destinationType: Camera.DestinationType.DATA_URL }
                               );  
    
    function onSuccess(imageData) {
        preview.style.backgroundImage = "url('data:image/jpeg;base64," + imageData + "')"; 
    }  
    
    function onFail(message) { 
        alert('Failed because: ' + message); 
    }
}