"use strict";

$('document').ready(function () {
  //declared global variables
  var modelSpecs = "",
      modelPrice = 0,
      modelSpecsHolder,
      modelPriceHolder,
      modelPriceUsdHolder,
      modelPriceUSD = 0;
  var $chassisImgHolder = $('#imgHolder img');
  var srcValue = $chassisImgHolder.attr('src'); // getting currency exchange rate

  var currencyUrl = 'https://old.bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'; //'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'

  var uahUsdRate = 24; //declare global functions
  //function that calculates the price in UAH

  function calculatePrice() {
    modelPrice = 26000;
    modelPrice += +$('input[name="cpu"]:checked', '#autoForm').val();
    modelPrice += +$('input[name="gpu"]:checked', '#autoForm').val();
    modelPrice += +$('input[name="ssd"]:checked', '#autoForm').val();
    var chassisSRC = $('#imgHolder img').attr('src');
    var chassisPrice = +$('#chassisSelector img[data-flag="1"]').attr('data-price');
    modelPrice += chassisPrice;
    modelPriceHolder.text(addSpace(modelPrice) + ' грн');
  } //function that creates the computer specification


  function compileSpecs() {
    modelSpecs = $('#chassisSelector img[data-flag="1"]').attr('data-model') + ' / ';
    modelSpecs += $('input[name="cpu"]:checked + label', '#autoForm').text() + ' / ';
    modelSpecs += $('input[name="gpu"]:checked + label', '#autoForm').text() + ' / ';
    modelSpecs += $('input[name="ssd"]:checked + label', '#autoForm').text();
    modelSpecsHolder.text(modelSpecs);
  }

  ; //function that formats the price view

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
  } //function that calculates the price in USD


  function calculateUSD() {
    modelPriceUSD = modelPrice / uahUsdRate;
    modelPriceUSD = modelPriceUSD.toFixed(2);
    modelPriceUsdHolder.text("$ " + addSpace(modelPriceUSD));
  } //function alternately performs the functions of pricing in UAH, in USD and creating a specification


  function calculateAll() {
    calculatePrice();
    compileSpecs();
    calculateUSD();
  }

  modelSpecsHolder = $('#modelSpecs');
  modelPriceHolder = $('#modelPrice');
  modelPriceUsdHolder = $('#modelPriceUSD');
  $chassisImgHolder.on('click', function () {
    $(this).fadeOut(300, function () {
      $(this).attr('src', 'img/chassis/Thermaltake Versa H13 Black_Win (CA-1D3-00S1WN-00).jpg').fadeIn(300);
      $('#chassisSelector img[data-flag="1"]').attr('data-flag', '0');
      $('#chassisSelector img[src="img/chassis/Thermaltake Versa H13 Black_Win (CA-1D3-00S1WN-00).jpg"]').attr('data-flag', '1');
      calculateAll();
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
    calculateAll();
  });
  $('#autoForm input').on('change', function () {
    calculateAll();
  });
  calculateAll(); // getting currency exchange rate and calculate price

  $.ajax({
    url: currencyUrl,
    cache: true,
    success: function success(html) {
      uahUsdRate = html[27].rate;
      uahUsdRate = uahUsdRate.toFixed(2);
      calculateUSD();
    }
  });
});