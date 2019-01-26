$(function(){
  function autoScrollToNewestMessage() {
  $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow')
  }
  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}"> ` : ""
    var html = `<div class='message' data-messageId="${message.id}">
                  <div class='upper-message'>
                    <div class='upper-message__user-name'>
                      ${message.user_name}
                    </div>
                    <div class='upper-message__date'>
                      ${message.date}
                    </div>
                  </div>
                  <div class='lower-meesage'>
                    <p class="lower-message__content">
                     ${message.content}
                    </p>
                  </div>
                  ${image}
                </div>`
    return html;
  }
  var loadMessages = function(){
    var messageId = $('.message:last').attr('data-messageId');
    $.ajax({
      type: 'GET',
      url: pathName,
      data: {keyword: messageId},
      dataType: 'json'
    })
    .done(function(messages) {
      messages.forEach(function(message) {
        var html = buildHTML(message);
        $('.messages').append(html)
      })
      autoScrollToNewestMessage()
    });
  }
  var pathName = location.pathname
  if (pathName.match(/messages/)){
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      $.ajax({
        url: pathName,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
         loadMessages.call()
         $('.form__message').val('')
         $('.form__submit').prop('disabled', false);
      })
      .fail(function(){
        alert('送信に失敗しました');
        $('.form__submit').prop('disabled', false);
      })
    })
  }
  setInterval(loadMessages, 5000);
});
