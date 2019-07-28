"use strict";

$('document').ready(function () {
  var modelSpecs = "",
      modelPrice = 0,
      modelSpecsHolder,
      modelPriceHolder,
      modelPriceUsdHolder,
      modelPriceUSD = 0;
  modelSpecsHolder = $('#modelSpecs');
  modelPriceHolder = $('#modelPrice');
  modelPriceUsdHolder = $('#modelPriceUSD');
  var $chassisImgHolder = $('#imgHolder img');
  var srcValue = $chassisImgHolder.attr('src');
  $chassisImgHolder.on('click', function () {
    $(this).fadeOut(300, function () {
      $(this).attr('src', 'img/chassis/Thermaltake Versa H13 Black_Win (CA-1D3-00S1WN-00).jpg').fadeIn(300);
      $('#chassisSelector img[data-flag="1"]').attr('data-flag', '0');
      $('#chassisSelector img[src="img/chassis/Thermaltake Versa H13 Black_Win (CA-1D3-00S1WN-00).jpg"]').attr('data-flag', '1');
      calculatePrice();
      compileSpecs();
      calculateUSD();
    });
  });
  $('#chassisSelector .chassisItem img').on('click', function () {
    var imgPath;
    $('#chassisSelector img[data-flag="1"]').attr('data-flag', '0');
    $(this).attr('data-flag', '1');
    imgPath = $(this).attr('src');
    $chassisImgHolder.fadeOut(300, function () {
      $(this).attr('src', imgPath).fadeIn(300);
    });
    calculatePrice();
    compileSpecs();
    calculateUSD();
  });

  function calculatePrice() {
    modelPrice = 26000;
    modelPrice += +$('input[name="cpu"]:checked', '#autoForm').val();
    modelPrice += +$('input[name="gpu"]:checked', '#autoForm').val();
    modelPrice += +$('input[name="ssd"]:checked', '#autoForm').val();
    var chassisSRC = $('#imgHolder img').attr('src');
    var chassisPrice = +$('#chassisSelector img[data-flag="1"]').attr('data-price');
    modelPrice += chassisPrice;
    modelPriceHolder.text(addSpace(modelPrice) + ' грн');
  }

  function compileSpecs() {
    console.log($('#chassisSelector img[data-flag="1"]').attr('data-model'));
    modelSpecs = $('#chassisSelector img[data-flag="1"]').attr('data-model') + ' / ';
    modelSpecs += $('input[name="cpu"]:checked + label', '#autoForm').text() + ' / ';
    modelSpecs += $('input[name="gpu"]:checked + label', '#autoForm').text() + ' / ';
    modelSpecs += $('input[name="ssd"]:checked + label', '#autoForm').text();
    modelSpecsHolder.text(modelSpecs);
  }

  ;
  $('#autoForm input').on('change', function () {
    calculatePrice();
    compileSpecs();
    calculateUSD();
  });
  calculatePrice();
  compileSpecs();
  calculateUSD();

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
  } // get exchange rate


  var currencyUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';
  var uahUsdRate = 0;
  $.ajax({
    url: currencyUrl,
    cache: true,
    success: function success(html) {
      uahUsdRate = html[27].rate;
      uahUsdRate = uahUsdRate.toFixed(2);
      calculateUSD();
    }
  });

  function calculateUSD() {
    modelPriceUSD = modelPrice / uahUsdRate;
    modelPriceUSD = modelPriceUSD.toFixed(2);
    modelPriceUsdHolder.text("$ " + addSpace(modelPriceUSD));
  }
});