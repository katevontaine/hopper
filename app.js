var loadMessages;
var userId;
var dataID;
var page = {
  usersUrl: "https://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "https://tiny-tiny.herokuapp.com/collections/hopper-messages",
  init: function(){
    page.stylesInIt();
    page.eventsInIt();
    setInterval(function(){
      page.getMessage();
    }, 2000);
  },
  eventsInIt: function(){
    page.postMessage();
    page.postUser();
    page.postAuthor();
    page.deleteUser();
  },
  stylesInIt: function(){
    page.getUsernames();
  },
  postUser: function(){
    $('.userForm').on('submit', function(event){
          var userData = {message: $('input[name="inputUser"]').val(), color: ''};
          event.preventDefault();
          $.ajax({
            method:'POST',
            url: page.usersUrl,
            data: userData,
            success: function(data){
              $('input[name="inputUser"]').val('')
            }
          });
        });
  },
  postAuthor: function(){
    $('.userForm').on('submit', function(event){
          userId = $('input[name="inputUser"]').val();
    });
  },
  deleteUser: function(){
    $('body').on('click','.delete',function(event){
      event.preventDefault();
    $(this).closest('li').remove();
      var dataID = $(this).closest('li').data();
      console.log('DATAID', dataID)
          $.ajax({
            url: page.messagesUrl + '/' + dataID.dataid,
            method:'DELETE',
            success: function(blue){
              console.log("SUCCESS BLUE", blue);
            },
            failure: function(data){
            }
          });
});
  $('body').on('click','.delete', function(event){
    event.preventDefault();
      });
  },

  postMessage: function(){
    $('.messageForm').on('submit', function(event){
      var messageData = {
        message: $('input[name="inputMessage"]').val(),
        author: $('input[name="author"]').val(),
        color: ''
      };
      $('input[name="inputMessage"]').val('')
      event.preventDefault();
      $.ajax({
        method:'POST',
        url: page.messagesUrl,
        data: messageData,
        success: function(data){
        }
      });
    });
  },
  getMessage: function(){
    $.ajax({
      method:'GET',
      url: page.messagesUrl,
      success: function(messagesArr){
        messagesArr.reverse();
        loadMessages = '';
        _.each(messagesArr, function(el){
          loadMessages += "<li data-dataID="+ el._id +">" + el.message + ": " + userId + '<button class="delete">Delete</button>' + '</br>' + "</li>";
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
            $(".users").append(el.message+ "<br>");
          });
        },
      });
},
};
$(document).ready(function(){
 page.init();
});
