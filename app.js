var page = {
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messages",
  init: function(){
    page.eventsInIt();
    page.stylesInIt();
  },
  eventsInit: function(){

  },
  stylesInit: function(){

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
