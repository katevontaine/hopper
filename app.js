    var loadMessages;
var page = {
  usersUrl: "https://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages",

  editUser: function(){
      $('aside p').on("click", ".theUserName", page.editUserf);
  },
  editUserf: function() {
    console.log('something');
    $('body').on("keydown",'p',function(event){
      if (event.keyCode === 13) {
        var newUsername = $(this).text();
        console.log('enter');
        var userData = {user:newUsername};
        var userID = $(this).closest('p').data(userID);
        console.log(userID);
        $.ajax({
          method:'PUT',
          url: page.usersUrl + "/" + userID.userid,
          data: userData,
          success: function(data){
            console.log("SUCCESS",data);
          },
          failure: function(data){
            console.log("FAILURE")
          }
        });
      }
    });


///////
  },
  init: function(){
    setInterval(function(){
      page.stylesInit();
    }, 100);
    page.eventsInit();
    page.getUsernames();
    page.editUser();
    page.editUserf();
  },
  eventsInit: function(){
    $('.userForm').on('submit', function(event){
          var userData = {user: $('input[name="inputUser"]').val(), color: ''};
          event.preventDefault();
          $.ajax({
            method:'POST',
            url: page.usersUrl,
            data: userData,
            success: function(data){
            }
          });
        });
    $('.messageForm').on('submit', function(event){
      var messageData = {message: $('input[name="inputMessage"]').val(), author: '', color: ''};
      event.preventDefault();
      $.ajax({
        method:'POST',
        url: page.messagesUrl,
        data: messageData,
        success: function(data){
          console.log(data);
        }
      });
    });
  },
  stylesInit: function(){
    $.ajax({
      method:'GET',
      url: page.messagesUrl,
      success: function(messagesArr){
        messagesArr.reverse();
        loadMessages = '';
        _.each(messagesArr, function(el){
          loadMessages += el.message + "<br />";
        });
        $('.messages').html('');
        $('.messages').append(loadMessages);
      }
    });
  },
getUsernames: function(){
  $.ajax({
      method: "GET",
      url: page.usersUrl,
      success: function(data){
        _.each(data, function(el){
          console.log(el.user);
          $(".users").append("<p data-userID="+ el._id + " contenteditable='true' class='theUserName'>" + el.user+ "</p><br>");
        });
      },
    });
  },
deleteUser: function(){
   $('body').on('click','.delete',function(event){
     event.preventDefault();
   $(this).closest('li').remove();
   $.ajax({
     userId: '',
     method: 'GET',
     url: page.usersUrl,
     success: function(data){
     }
   });
 });
},
};
$(document).ready(function(){
 page.init();
});
