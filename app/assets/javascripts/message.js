$(function(){
  function autoScrollToNewestMessage() {
  $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow')
  }
  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}"> ` : ""
    var html = `<div class='message data-message-id'>
                  <div class='upper-message'>
                    <div class='upper-message__user-name'>
                      ${message.user_name}
                    </div>
                    <div class='upper-message__date'>
                      ${message.date}
                    </div>
                  </div>
                  <div class='lower-meesage'>
                    ${message.content}
                  </div>
                  ${image}
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.messages').append(html)
       $('.form__message').val('')
       $('.form__submit').prop('disabled', false);
       autoScrollToNewestMessage()
     })
     .fail(function(){
        alert('送信に失敗しました');
        $('.form__submit').prop('disabled', false);
    })
  })
});
