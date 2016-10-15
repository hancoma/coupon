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
        //alert_msg("메시지",id);

        console.log('Received Event: ' + id);
      
        app.onmain();
    },
    onmain: function() {


     

    

    }
};

   
function member_save () {
   var deviceid=device.uuid;
   var telephone=$("#telephone").val();
   var birth=$("#birth").val();
  
   if (!birth) {
    alert_msg("경고","생일을 선택해주세요.");
    exit;
   }
   if (!telephone) {
    alert_msg("경고","전화번호를 입력해주세요.");
    exit;
   }


     $.post("http://pataling.cafe24.com/app_test/member_save_app.php",
   {
   
    deviceid:deviceid,
    telephone:telephone,
    birth:birth
   },
   function(data){
    var data=data;
        if (data=="yes") {
          alert_msg("환영합니다.","회원가입을 축하합니다. ");
          location.replace('start.html') ;
 
        }
        if (data=="no") {
          alert_msg("경고","이미 가입되어있는 전화번호 입니다.");
          exit;
        }
   })

 
}




// msg 
function alertDismissed() {
    // do something
}

function alert_msg(title,msg) {
    var title=title;
    var msg=msg;
   navigator.notification.alert(
    msg,  // message
    alertDismissed,         // callback
    title,            // title
    '확인'                  // buttonName
);
}



 


   
 

