function main_display() {
    
        $.post("/main.html",
        {
            
          

        }, function(data) {
            $("#company_list").html(data);
        });
}
