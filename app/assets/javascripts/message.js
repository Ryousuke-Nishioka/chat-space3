$(function(){

  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class=message>
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                      ${message.user_name}
                      </div>
                      <div class="message__upper-info__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      ${imagehtml}
                    </div>
                  </div> `
    return html;
    
  }

  $('#new_message').on('submit', function(e){
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
      $('.messages').append(html);
      $( ".form__submit").prop( "disabled", false );
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form__message').val('');
      $('.hidden').val('');
    })
    .fail(function(){
      alert('error');
    });
    
  })
});