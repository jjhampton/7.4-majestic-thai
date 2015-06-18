(function(){
  'use strict';
  $(document).ready(function(){
    $('body').prepend(JST.menu());
    $('body').append(JST.order());
    // $('.menu').html(JST.item());
  });
})();
