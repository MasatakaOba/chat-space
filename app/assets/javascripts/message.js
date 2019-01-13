$(function(){
$('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
});

$(function(){
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
  $('.form__message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
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
       $('.message').append(html)
       $('.form__message').val('')
     })
     .fail(function(){
      alert('送信に失敗しました');
    })
  })
});
