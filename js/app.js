





function successHandler (result) {
       
 //var div = document.getElementById('myDiv');
// div.innerHTML=result;

}

function errorHandler (error) {
   // var div = document.getElementById('myDiv');
 // div.innerHTML=error;
 alert("GCM error");
}

function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    
}






  function logout() {
 
    navigator.notification.confirm(
    'Are you sure you want to log out?', // message
     onConfirm,            // callback to invoke with index of button pressed
    'Membership',           // title
    ['Logout','Cancel']     // buttonLabels
);
 }

function onConfirm(buttonIndex) {
    var uuid=device.uuid;
    var btn=buttonIndex;
    if (btn==1) {

      $.post("http://pluspay.kr/logout_app.php",
       {
                deviceid:uuid
       },
       function(data){
        var data=data;
           
              navigator.notification.alert(
                  'You have been signed out.',  // message
                  alertDismissed,         // callback
                  'Membership',            // title
                  'Done'                  // buttonName
              );
                
            }

        );
    }
}

 function alertDismissed() {
    // do something
    navigator.app.exitApp();
     // gopage("index.html?ok=ok");
}

function alert_msg(title,msg,btn) {
    // alert 대신 사용할 함수 
    var title=title;
    var msg=msg;
    var btn=btn;

      navigator.notification.alert(
                  msg,  // message
                  alertend,         // callback
                  title,            // title
                  btn                  // buttonName
              );


}
function alertend() {

}


function getImage_photo() {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto_photo, function(message) {
alert('get picture failed');
},{
quality: 5,
destinationType: navigator.camera.DestinationType.FILE_URI,
sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
});}
    function uploadPhoto_photo(imageURI) {
      var deviceid=device.uuid;
        navigator.notification.activityStart("gallerybear", "uploading photo");
        var options = new FileUploadOptions();
        options.fileKey="profile_image";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";
        params.link=link;
        params.uuid=deviceid;

        options.params = params;
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, "http://pluspay.com/upload_org.php", win_photo, fail, options);
    }

    function win_photo(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        navigator.notification.activityStop();
        alert(r.response);
    }


  


