var page = {
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages",
  init: function(){
    setInterval(function(){
      page.stylesInit();
    }, 2000);

    page.eventsInit();
    page.deleteUser();
  },
  eventsInit: function(){
    page.postMessage();
  },



  stylesInit: function(){
    $.ajax({
      method:'GET',
      url: page.messagesUrl,
      success: function(messagesArr){
        messagesArr.reverse();
        _.each(messagesArr, function(el){
          console.log(el.message);
        });
      }
    });
  },

  postMessage: function(){

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

  deleteUser: function(userId){
   $.ajax({
     url: page.usersUrl + '/' + userId,
     method: 'DELETE',
     success: function(response){
       console.log(response)
     }
   })
 }



};



$(document).ready(function(){
  page.init();
});
