"use strict";

$('document').ready(function () {
  var $chassisImgHolder = $('#imgHolder img');
  var srcValue = $chassisImgHolder.attr('src');
  $chassisImgHolder.on('click', function () {
    $(this).fadeOut(300, function () {
      $(this).attr('src', 'chassis/Thermaltake Versa H13 Black_Win (CA-1D3-00S1WN-00).jpg').fadeIn(300);
    });
  });
  $('#chassisSelector .chassisItem').on('click', function () {
    var imgPath;
    imgPath = $(this).attr('data-img-path');
    $chassisImgHolder.fadeOut(300, function () {
      $(this).attr('src', imgPath).fadeIn(300);
    });
  });
  var modelSpecs = "",
      modelPrice = 0,
      modelSpecsHolder,
      modelPriceHolder;
  modelSpecsHolder = $('#modelSpecs');
  modelPriceHolder = $('#modelPrice');

  function calculatePrice() {
    modelPrice = +$('input[name=cpu]:checked', '#autoForm').val();
    modelPrice += +$('input[name=gpu]:checked', '#autoForm').val();
    modelPrice += +$('input[name=ssd]:checked', '#autoForm').val();
    modelPriceHolder.text(addSpace(modelPrice) + ' грн');
  }

  function compileSpecs() {
    modelSpecs = $('input[name=cpu]:checked + label', '#autoForm').text() + ' / ';
    modelSpecs += $('input[name=gpu]:checked + label', '#autoForm').text() + ' / ';
    modelSpecs += $('input[name=ssd]:checked + label', '#autoForm').text();
    modelSpecsHolder.text(modelSpecs);
  }

  ;
  $('#autoForm input').on('change', function () {
    calculatePrice();
    compileSpecs();
  });
  calculatePrice();
  compileSpecs();

  function addSpace(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;

    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }

    return x1 + x2;
  }
});