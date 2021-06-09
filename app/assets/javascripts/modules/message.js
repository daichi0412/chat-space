$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
          <div class="message__body">
            <div class="message__message-man">
              ${message.user_name}
            </div>
            <div class="message__message-date">
              ${message.created_at}
            </div>
            <div class="message__comments">
              ${message.content}
              <img class="Message__image" src="${message.image}">
            </div>
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="message__body">
          <div class="message__message-man">
            ${message.user_name}
          </div>
          <div class="message__message-date">
            ${message.created_at}
          </div>
          <div class="message__comments">
            ${message.content}
          </div>
        </div>
      </div>`
      return html;
    };
  }

  $('.form__comments').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message').append(html);
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      $('.form__submit').prop('disabled', false)
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.form__submit').prop('disabled', false)
    });
  });
});