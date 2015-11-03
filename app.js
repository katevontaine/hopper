var page = {
  testURl: "https://tiny-tiny.herokuapp.com/collections/hopperBlah",
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages",
  init: function(){
    setInterval(function(){
      page.stylesInit();
    }, 200000);
    page.eventsInit();
    page.getUsernames();
  },
  eventsInit: function(){
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
        _.each(messagesArr, function(el){
          console.log(el.thought);
        });
      }
    });
  },
  getUsernames: function() {
      $.ajax({
        method: 'GET',
        url: page.testUrl,
        success: function(data) {
          console.log("SUCCESS", data);
        },
        failure: function(data) {
          console.log("FAILURE");
        }
      });
    },
};

$(document).ready(function(){
 page.init()
});
