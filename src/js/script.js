"use sctrict"

$('document').ready(function(){
	var $chassisImgHolder = $('#imgHolder img');

	// 1. Получение значения атрибута src у картинки

	var srcValue = $chassisImgHolder.attr('src');

	// 2. Поменяем значение атрибута src у картинки
	$chassisImgHolder.on('click', function() {
		$(this).fadeOut(300, function(){
			$(this).attr('src', 'chassis/Thermaltake Versa H13 Black_Win (CA-1D3-00S1WN-00).jpg').fadeIn(300);
		});
	});

	/*// 3. ОТДЕЛЬНОЕ действие для каждого корпуса
	$('#chassisSelector .chassisItem.chassis1').on('click', function(){
		$('#imgHolder img').attr('src', 'chassis/Thermaltake Versa H13 Black_Win (CA-1D3-00S1WN-00).jpg');
	});
	$('#chassisSelector .chassisItem.chassis2').on('click', function(){
		$('#imgHolder img').attr('src', 'chassis/Thermaltake Versa C22 RGB (CA-1G9-00M1WN-00).jpg');
	});*/

	
	// 4. Единое действие для всех элементов с анимацией
	$('#chassisSelector .chassisItem').on('click', function(){
		var imgPath;

		imgPath = $(this).attr('data-img-path');

		$chassisImgHolder.fadeOut(300, function(){
			$(this).attr('src', imgPath).fadeIn(300);
		});
	});

});