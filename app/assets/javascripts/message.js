$(function(){
  function autoScrollToNewestMessage() {
  $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow')
  }
  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}"> ` : ""
    var html = `<div class='message'>
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
  var reloadMessages = function(){
    var pathName = location.pathname;
    if (pathName.match(/messages/)) {
      var groupNum = pathName.replace(/[^0-9]/g, '');
      $.ajax({
      type: 'GET',
      url: pathName,
      data: {keyword: groupNum},
      dataType: 'json'
      })
      .done(function(messages) {
        var messageCount = 0;
        messages.forEach(function(message) {
          messageCount += 1;
        })
        if (messageCount !== $('.message').length) {
          $('.messages').empty();
          messages.forEach(function(message) {
            var html = buildHTML(message);
            $('.messages').append(html)
          })
          autoScrollToNewestMessage()
        }
      });
    };
  }
  setInterval(reloadMessages, 5000);
});
