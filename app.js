var page = {
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages",
  init: function(){
    page.stylesInit();
    page.eventsInit();
  },
  eventsInit: function(){
    $('.userForm').on('submit', function(event){
          var userData = {message: $('input[name="inputUser"]').val(), color: ''};
          event.preventDefault();
          $.ajax({
            method:'POST',
            url: page.usersUrl,
            data: userData,
            success: function(data){
              console.log(data);
            }
          });
        });
  },
  stylesInit: function(){

  },
};

$(document).ready(function(){
  page.init();
});
