
 var mode;
var code;
var memberuid;
var category;
var deviceid;
function getImage(data1,data2,data3,data4,data5) {
            mode=data1;
            code=data2;
            memberuid=data3;
            category=data4;
            deviceid=data5;
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto, function(message) {
alert('get picture failed');
},{
quality: 2,
destinationType: navigator.camera.DestinationType.FILE_URI,
sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
});}
    function uploadPhoto(imageURI) {

         navigator.notification.activityStart("PHOTO UPLOAD", "uploading photo");
        var options = new FileUploadOptions();
        options.fileKey="profile_image";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";
        params.mode=mode;
        params.code=code;
        params.memberuid=memberuid;
        params.category=category;
        params.deviceid=deviceid;

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "http://m.gallerybear.com/upload.php", win, fail, options);
    }

    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
navigator.notification.activityStop();
        if (mode=='talent') {
        document.location.reload();
            }
             
        

    }

    function fail(error) {
        navigator.notification.activityStop();

    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
