
var userId;
var dataID;
var loadMessages;
var page = {
  userArr: [],
  currUser: '',
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages",

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
    page.deleteMessage();
  },
  stylesInIt: function(){
    page.getUsernames();
    page.editUser();
    page.editUserf();
  },
  postUser: function(){
    $('.userForm').on('submit', function(event){
          var userData = {user: $('input[name="inputUser"]').val(), color: ''};
          event.preventDefault();
          $.ajax({
            method:'POST',
            url: page.usersUrl,
            data: userData,
            success: function(data){
              page.currUser = data._id;
              $('input[name="inputUser"]').val('');
            }
          });
        });
  },

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
        event.preventDefault();

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


  },


  deleteMessage: function(){
    $('body').on('click','.delete',function(event){
      event.preventDefault();
    $(this).closest('li').remove();
      var dataID = $(this).closest('li').data();
      console.log('DATAID', dataID);
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
      $('input[name="inputMessage"]').val('');
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
          console.log(el.user);
          $(".users").append("<p data-userID="+ el._id + " contenteditable='true' class='theUserName'>" + el.user+ "</p><br>");
          page.userArr = data;
          // $(".users").append(el.user+ "<br>");
        });
      },
    });
  },

};
$(document).ready(function(){
 page.init();
 $(window).on('beforeunload', function(){
   console.log("fuck");
    $.ajax({
      url: page.usersUrl + '/' + page.currUser,
      method: 'DELETE',
      async: false,
      success: function(data){
      }
    });
 });
});
