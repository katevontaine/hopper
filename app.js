var page = {
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages",
  init: function(){

  },
  eventsInit: function(){

  },
  stylesInit: function(){

  },
  createNewUser: function(user) {
    console.log("New User: ", user);
    $.ajax({
      url: page.usersUrl,
      method: 'POST',
      data: hopper,
      success: function(resp) {
        $('.profile').append(user);
        $('form > input[type="text"]').val('');
      },
      failure: function(resp) {
        console.log("FAILURE", resp);
      }
    });
  },

};
$(document).ready(function(){

});
