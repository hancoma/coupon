/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        app.onmain();
    },
    onmain: function() {
       
       var reg_id=device.uuid;
       // 기기 번호 검출 
          console.log('Received Event: ' + reg_id);

    }
};

// reg_id 등록 
function json_call(reg_id) {
      var reg_id=reg_id;
      var deviceid=device.uuid;
       
         $.post("http://pataling.cafe24.com/app_test/gcm_reg_app_call.php",
   {
    reg_id:reg_id,
    deviceid:deviceid
   },
   function(data){
    var data;
    
   //  alert("ok");
   })
       } 


       PushNotification.hasPermission(function(data) {
    if (data.isEnabled) {
        console.log('isEnabled');
    }
});

 var pushNotification;
   
pushNotification = window.plugins.pushNotification;




    pushNotification.register(
        successHandler,
        errorHandler, {
            "senderID":"492152097523",
            "badge":"true", // 뱃지 기능을 사용한다.
                "sound":"true", // 사운드를 사용한다.
                "alert":"true", // alert를 사용한다.
            "ecb":"onNotificationGCM"
        });

function onNotificationGCM(e) {
    
    switch( e.event ){
    case 'registered':
        if ( e.regid.length > 0 ){
          json_call(e.regid); //gcm 코드 저장
        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground ){
      //alert_msg(e.payload.title,e.payload.message,"확인");
            var my_media = new Media("/android_asset/www/"+e.soundname);
            my_media.play();
      
      
        }else{  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart ){
        //alert_msg(e.payload.title,e.payload.message,"확인");
                alert('<li>--COLDSTART NOTIFICATION--' + '</li>');
            }else{
              //alert_msg(e.payload.title,e.payload.message,"확인");
                alert('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
        }

        alert('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
        alert('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
    
    
    break;

    case 'error':
        alert('<li>ERROR -> MSG:' + e.msg + '</li>');
    break;

    default:
        alert('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
    break;
  }
  

}