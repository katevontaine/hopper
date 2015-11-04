$(document).ready(function(){
 page.init()
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
              console.log(data);
              $('input[name="inputUser"]').val('')

            }
          });
        });
  },
  deleteUser: function(){
    $('body').on('click','.delete',function(event){
      event.preventDefault();
    $(this).closest('li').remove();
      console.log(this)
    $.ajax({
      userId: '',
      method: 'GET',
      url: page.usersUrl,
      success: function(data){


      }
    }),
  $('body').on('click','.delete', function(event){
    _.each(data,function(el){
      console.log(el)
      dataID=el._id
    }),
    event.preventDefault();
        $.ajax({
          method:'DELETE',
          URL: page.usersUrl + '/' + dataID,
          success: function(data){
            console.log('blue')
          },
          failure: function(data){
            console.log('red')
          }
        });
    });
  });
},
  getUserNames: function(){
    $.ajax({
     method: "GET",
     url: page.usersUrl,
     success: function(data){
       _.each(data, function(el){
         $('.users').append('<li>'+el.message+'<button class="delete">Delete</button>'+'<br>'+'</li>');
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
            $('.messages').append(el.message +'<br>');
            $('.messages').val('')
          console.log(el.thought);
        });
      }
    });


},

getUsernames: function(){
  $.ajax({
      method: "GET",
      url: page.usersUrl,
      success: function(data){
        _.each(data, function(el){
          console.log(el.message);
          $(".users").append(el.message+ "<br>");
                        })
                              },

          });
                        }

                      };
