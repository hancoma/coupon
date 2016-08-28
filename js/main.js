function main_display() {
    
        $.post("http://pataling.cafe24.com/app_test/main.html",
        {
            
          

        }, function(data) {
            $("#company_list").html(data);
        });
}
