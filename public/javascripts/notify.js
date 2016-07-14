$(document).ready(function () {
  Notify.init();
});

var Notify = {
  init: function () {
    $('#reset').click($.proxy(function(e) {
      e.preventDefault();

      this.reset();
    }, this));

    $('form').submit($.proxy(function(e) {
      if (this.isEmptyMessage()) {
        e.preventDefault();

        this.displayError();
      }
    }, this));
  },

  displayError: function() {
    $('#validation_message').html("An empty message, send you can't");
  },

  isEmptyMessage: function() {
    return $('textarea[name=message]').val() === '';
  },

  reset: function () {
    $('textarea[name=message]').val('');
    $('select[name=movie]').prop('selectedIndex', 0);
    $('#validation_message').text('');
    $('.alert').hide();
  }
};

