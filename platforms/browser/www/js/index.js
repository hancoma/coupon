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
 

var push;
   
   
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

          push = PushNotification.init({
    android: {
        senderID: "394799583877"
    },
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    },
    windows: {}
});
          PushNotification.hasPermission(function(data) {
    if (data.isEnabled) {
        console.log('isEnabled');
    }
});


push.on('registration', function(data) {
    console.log(data.registrationId);
    json_call(data.registrationId);
});

push.on('notification', function(data) {
  // alert(data.message);
  display_call_info(data.message);
  alert_msg("알람",data.message);
 
 
    
   
});

push.on('error', function(e) {
    // e.message
    alert_msg("경고",e.message);
});


    }
};

joincheck();
function joincheck() {
        var uuid=device.uuid;
        // uuid가 회원 가입되어있는 지 확인 
console.log("회원채크");
        check_uuid(uuid);
    }

function member_check() {
    var uuid=device.uuid;
    var telephone=$("#telephone").val();
    var birth=$("#birth").val();
    if (!telephone) {
      alert_msg("경고","전화번호입력하세요.");
      exit;
    }
    if (!birth) {
      alert_msg("경고","생일을 입력하세요.");
      exit;
    }
    member_save(uuid,telephone,birth);
}
// 회원 저장 부분
function member_save (uuid,telephone,birth) {
   var deviceid=uuid;
   var telephone=telephone;
   var birth=birth;
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
    $("#join_modal").removeClass('active');
        }
        if (data=="no") {
          alert_msg("경고","이미 가입되어있는 전화번호 입니다.");
          exit;
        }
   })

 
}
// uuid 회원 등록 확인
function check_uuid(uuid) {
    var deviceid=device.uuid;
     $.post("http://pataling.cafe24.com/app_test/check_uuid_app.php",
   {
   
    deviceid:deviceid
   },
   function(data){
 
       
    var data=data;
    console.log(data);
        if (data=="yes") {
          $("#join_modal").removeClass('active');
        } else {
           member_join();
          
        }
   })
        
}
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

function member_join() {
    $("#join_modal").addClass('active');

}

 


   
 

