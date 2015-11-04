    var loadMessages;
    var userArr;
var page = {
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages",
  init: function(){
    setInterval(function(){
      page.stylesInit();
    }, 2000);
    page.eventsInit();
    page.getUsernames();
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
      $('input[name="inputMessage"]').val('');
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
          userArr = data;
          $(".users").append(el.user+ "<br>");
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
window.onbeforeunload = closingCode;
function closingCode(){
   $.ajax({
     url: page.usersUrl + '/' + userArr[0]._id,
     method: 'DELETE',
     data: userArr,
     success: function(data){
     }
   });
   return null;
}
