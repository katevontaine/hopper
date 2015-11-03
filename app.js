var page = {
  usersUrl: "http://tiny-tiny.herokuapp.com/collections/hopper",
  messagesUrl: "http://tiny-tiny.herokuapp.com/collections/hopper-messagesbleh",
  init: function(){
    page.eventsInIt();
    page.stylesInIt();
  },
  eventsInit: function(){
    $('form').on('submit', page.createNewThought);

  },
  stylesInit: function(){

  },
  createNewUser:function(event){
    event.preventDefault();
    var newUserData = {
      user: $('input=[name="inputUser"]')
    }
    $('form>input[type="text"]').val('');
    $.ajax({
      url: page.usersUrl,
      method: 'POST',
      success: function(newUser){
        $('.users').append(newUser);

      }
    })
  }

};
$(document).ready(function(){
    page.init();
});
