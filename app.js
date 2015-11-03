var page = {
  testURl: "https://tiny-tiny.herokuapp.com/collections/hopperBlah",
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages",
  init: function(){
      getUsernames();
  },
  eventsInit: function(){

  },
  stylesInit: function(){

  }
  getUsernames: function() {
      $.ajax({
        type: 'GET',
        url: testUrl,
        success: function(data) {
          console.log("SUCCESS");
        },
        failure: function(data) {
          console.log("FAILURE");
        }
      });
    },
};

$(document).ready(function(){

});
