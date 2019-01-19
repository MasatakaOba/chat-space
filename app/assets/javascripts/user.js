$(function() {

  function appendUserHTML(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    return html;
  }

  function appendMemberHTML(name, id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html;
  }

  $('#user-search-field').on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          var html = appendUser(user);
          $('#user-search-result').append(html)
        });
      }
      else {
          $('#user-search-result').append("一致する名前はありません")
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });

  $('#user-search-result').on('click', '.user-search-add', function() {
    var name = $(this).attr('data-user-name');
    var id = $(this).attr('data-user-id');
    var html = appendMember(name, id);
    $('.chat-group-user__name--member').append(html)
    $('#user-search-result').empty();
  });

  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });

});
