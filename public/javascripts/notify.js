$(document).ready(function () {
  Notify.init();
});

var Notify = {
  init: function () {
    var self = this;
    $('#reset').click(function(e) {
      e.preventDefault();

      self.reset();
    });
  },

  reset: function () {
    $('textarea[name=message]').val('');
    $('select[name=movie]').prop('selectedIndex', 0);
    $('.alert').hide();
  }
};

