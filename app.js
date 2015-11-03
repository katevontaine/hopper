$(document).ready(function(){
  page.init();
});

var page = {
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-users",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages-2",
  init: function(){
    page.stylesInIt();
    page.eventsInIt();
    setInterval(function(){
      page.getMessage();
    }, 200000);
  },
  eventsInIt: function(){
    page.deleteUser();
    page.postMessage();
    page.postUser();

  },
  stylesInIt: function(){
    page.getUserNames();
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
              console.log(data);
              $('input[name="inputUser"]').val('')
            }
          });
        });
  },
  deleteUser: function(){
    $.ajax({
      method: 'GET',
      url: page.usersUrl,
      success: function(data){
        _.each(data,function(el){

        })
      }
    })
  },
  getUserNames: function(){
    $.ajax({
     method: "GET",
     url: page.usersUrl,
     success: function(data){
       _.each(data, function(el){
         $('.users').append(el.message+'<br>');
       })
      },
    });
  },
  postMessage: function(){
    $('.messageForm').on('submit', function(event){
      var messageData = {
        message: $('input[name="inputMessage"]').val(),
        author: '',
        color: ''
      };
      event.preventDefault();
      $.ajax({
        method:'POST',
        url: page.messagesUrl,
        data: messageData,
        success: function(data){
          console.log(data);
          $('input[name="inputMessage"]').val('')
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
        _.each(messagesArr, function(el){
          console.log(el.message);
            $('.messages').html(el.message + '<br>')
        });
      }
    });
  }


}
