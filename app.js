
var userId;
var dataID;
var loadMessages;
var loadUsers;
var page = {
  userArr: [],
  messArr: [],
  currUser: '',
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-user",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages",

  init: function(){
    page.editUser();
    page.editUserf();
    page.eventsInit();
    page.getUsernames();

    setInterval(function(){
      page.getUsernames();
    }, 10000);
    setInterval(function(){
      page.stylesInit();
      page.getMessage();
    }, 2000);
    setInterval(function(){
      page.deleteMessage();
    }, 10);
  },
  eventsInit: function(){
    page.postUser();
    page.postMessage();
    page.editUser();
    page.editUserf();
  },
  stylesInit: function(){

    _.each(page.userArr, function(el){
        if(page.currUser === el._id){
          userId = el.user;
        }
      });
  },
  postUser: function(){
    $('.userForm').on('submit', function(event){
          var userData = {user: $('input[name="inputUser"]').val(), color: ''};
          _.each(page.userArr, function(el){
            if(userData.user === el.user){
              userData.user += 1;
            }
          });
          event.preventDefault();
          $.ajax({
            method:'POST',
            url: page.usersUrl,
            data: userData,
            success: function(data){
              console.log(data._id);
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
    $('body').on("keydown",'p',function(event){
      if (event.keyCode === 13) {
        var newUsername = $(this).text();
        var userData = {user:newUsername};
        var userID = $(this).closest('p').data(userID);
        event.preventDefault();

        $.ajax({
          method:'PUT',
          url: page.usersUrl + "/" + userID.userid,
          data: userData,
          success: function(data){
            console.log("SUCCESS",data);
          },
          failure: function(data){
            console.log("FAILURE");
          }
        });
      }
    });
  },

  deleteMessage: function(){
    _.each(page.messArr, function(el, idx, arr){
      cls = '.delete-' + idx;
    $(cls).on('click', function(event){
      event.preventDefault();
          $.ajax({
            url: page.messagesUrl + '/' + arr[idx]._id,
            method:'DELETE',
            success: function(blue){
            },
            failure: function(data){
            }
          });
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
        author: userId,
        author_id: page.currUser,
        color: '',
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


        page.messArr = messagesArr;
        _.each(messagesArr, function(el, idx){
          loadMessages += "<li data-dataID="+ el._id +">" + el.message + ": " + el.author + "</li>";
          if(userId === el.author){
            loadMessages += '<button class="del delete-'+ idx + ' hidden">X</button>';
          }
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
        loadUsers = '';
        page.userArr = data;
        _.each(data, function(el){
          loadUsers += "<p data-userID=" + el._id + " contenteditable='true' class='theUserName'>" + el.user + "</p>";
          page.userArr = data;
          // $(".users").append(el.user+ "<br>");
        });
        $('.users').html('');
        $('.users').append(loadUsers);
      },
    });
  },



};
$(document).ready(function(){
 page.init();
 $(window).on('beforeunload', function(){
    $.ajax({
      url: page.usersUrl + '/' + page.currUser,
      method: 'DELETE',
      async: false,
      success: function(data){
      }
    });
 });
});
