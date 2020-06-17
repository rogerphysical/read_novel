function to_page(a, b, th) {
	$('#'+a).fadeOut(400);
	setTimeout("$('#"+b+"').slideDown(400)", 400);
	document.getElementById('title').innerHTML = th.children[1].innerHTML;
}
function to_page2(a, b, title) {
	$('#'+a).slideUp(400);
	setTimeout("$('#"+b+"').fadeIn(400)", 400);
	document.getElementById('title').innerHTML = title;
}

function record(a, num) {
	var par_id = a.parentNode.id;
	if (localStorage.getItem("read_novel_"+'record') !== "false") {
		localStorage.setItem("read_novel_"+par_id, num);
		in_record(par_id);
	}
	
	document.getElementById('story').style.transform = "rotate(0deg)";
	setTimeout("document.getElementById('story').style.zIndex = 2", 400)
	setTimeout("record2("+par_id.substr(4)+", "+num+")", 400)
}
function record2(par_id_num, num) {
	var story_width = ($(window).width() > 768)?"80%":"100%";
	var story_left = ($(window).width() > 768)?"10%":"0%";
	$("#story").animate({width: story_width, left: story_left, height: '100%', top: '0%'}, 400);
	$('#story_bts').fadeIn(400);

	var story_id = "story_"+par_id_num+"_"+num;
	to_story(story_id);
}
function in_record(a) {
	if (document.getElementById('record')) {
		var parent = document.getElementById('record').parentNode;
		parent.removeChild(document.getElementById('record'));
	}
	if (localStorage.getItem("read_novel_"+a)) {
		var record = localStorage.getItem("read_novel_"+a);
		document.getElementById(a).children[record].innerHTML += "<div id=\'record\' class=\'items_name_r record\'>&oplus;</div>";
	}
}

function to_story(b) {
	var title1 = document.getElementById('title').innerHTML;
	var story_spl = b.split("_");
	var new_story_index = parseInt(story_spl[2]);
	var title2 = document.getElementById("page"+story_spl[1]).children[new_story_index].children[1].innerHTML;
	document.getElementById(b).children[0].innerHTML = title1+" >> "+title2;
	setTimeout("$('#"+b+"').slideDown(400)", 400);
	document.getElementById('story_fake').innerHTML = b;
}
function to_story2(a) {
	var story_fake =  document.getElementById('story_fake').innerHTML;
	var story_spl = story_fake.split("_");
	var new_story_index = parseInt(story_spl[2])+a;
	var new_story = story_spl[0]+"_"+story_spl[1]+"_"+new_story_index;
	if (document.getElementById(new_story)) {
		$('#'+story_fake).fadeOut(400);
		to_story(new_story);

		if (localStorage.getItem("read_novel_"+'record') !== "false") {
			var par_id = "page"+story_spl[1];
			localStorage.setItem("read_novel_"+par_id, new_story_index);
			in_record(par_id);
		}
	}
}
function story_close() {
	var story_fake =  document.getElementById('story_fake').innerHTML;
	$('#'+story_fake).slideUp(400);
	$('#story_bts').fadeOut(400);

	setTimeout("story_close2()", 400);
}
function story_close2() {
	$("#story").animate({width: '100vw', left: '0px', height: '2px', top: '50vh'}, 400);
	setTimeout("story_close3()", 400);
}
function story_close3() {
	document.getElementById('story').style.zIndex = -1;
	if ($(window).width() > 768) {
		var ran_j = (Math.random() < 0.5)?-1:1;
		var ran = ran_j*(10+Math.random()*35);
		document.getElementById('story').style.transform = "rotate("+ran+"deg)";
	}
}

function show_copyright() {
	$('html, body').animate({scrollTop: $('body').height()-$(window).height()}, 1000);
	$('html, body').animate({scrollTop: 0}, 1000);
}

window.onload = function() {
	$('html, body').animate({scrollTop: 0}, 400);
	if ($(window).width() > 768) {
		var ran_j = (Math.random() < 0.5)?-1:1;
		var ran = ran_j*(10+Math.random()*35);
		document.getElementById('story').style.transform = "rotate("+ran+"deg)";
	}

	// 設定內容
	if (localStorage.getItem("read_novel_"+'font_size')) {
		var size_index = parseInt(localStorage.getItem("read_novel_"+'font_size'));
		var size_selected = document.getElementById('font_size');
		size_selected.options[size_index].selected = true;
		font_size(size_selected);
	}
	if (localStorage.getItem("read_novel_"+'font_color')) {
		var color_index = parseInt(localStorage.getItem("read_novel_"+'font_color'));
		var color_selected = document.getElementById('font_color');
		color_selected.options[color_index].selected = true;
		font_color(color_selected);
	}
	if (localStorage.getItem("read_novel_"+'record') === "false") {
		var par = document.getElementById("record_judge").parentNode;
		par.removeChild(document.getElementById("record_judge"));
	}
	if (localStorage.getItem("read_novel_"+'text_select')) {
		document.getElementById('text_select').style.backgroundColor = "unset";
		$(".story_title").css("user-select", "none");
		$(".story_para").css("user-select", "none");
	}
}

// 以下設定
function font_size(a) {
	localStorage.setItem("read_novel_"+"font_size", a.value);
	var new_size = a.options[a.value].text+"px";
	$(".story_para").css("font-size", new_size);
	a.style.fontSize = new_size;
}
function font_color(a) {
	localStorage.setItem("read_novel_"+"font_color", a.value);
	var bc = a.options[parseInt(a.value)].style.backgroundColor;
	var c = a.options[parseInt(a.value)].style.color;
	a.style.backgroundColor = bc;
	a.style.color = c;
	$('.story_items').css("background-color", bc);
	$('.story_items').css("color", c);
}

function use_record(a) {
	if (localStorage.getItem("read_novel_"+'record') !== "false") {
		var judge = confirm("此動作將清除觀看紀錄\r確定清除記錄嗎?");
		if (judge === true) {
			a.removeChild(a.children[2]);
			var len = document.getElementById('tot').children.length;
			for (var i = 3; i < len; i++) {
				var ch_id = document.getElementById('tot').children[i].id;
				localStorage.removeItem("read_novel_"+ch_id);
			}
			localStorage.setItem("read_novel_"+"record", "false");
		}
	}
	else {
		localStorage.removeItem("read_novel_"+"record");
		a.innerHTML += "<div id=\'record_judge\' class=\'items_name_r record\'>&oplus;</div>"
	}
}
function text_select(a) {
	if (localStorage.getItem("read_novel_"+"text_select")) {
		localStorage.removeItem("read_novel_"+"text_select");
		a.children[2].style.backgroundColor = "#00F";
		$(".story_title").css("user-select", "text");
		$(".story_para").css("user-select", "text");
	}
	else {
		localStorage.setItem("read_novel_"+"text_select", "false");
		a.children[2].style.backgroundColor = "unset";
		$(".story_title").css("user-select", "none");
		$(".story_para").css("user-select", "none");
	}
}
function all_clear() {
	var judge = confirm("此動作將還原所有設定和紀錄\r確定還原設定嗎?");
	if (judge === true) {
		for (var i = localStorage.length-1; i >= 0; i--) {
			var item = localStorage.key(i);
			if (item.substr(0, 11) === "read_novel_") {
				localStorage.removeItem(item);
			}
		}
		window.location.reload();
	}
}

// para
function story_para_select_item(a, choise_id) {
	$('#'+choise_id).fadeIn(400);
	a.parentNode.style.display = "none";
	a.parentNode.parentNode.children[0].style.display = "block";
	a.parentNode.children[0].innerHTML = choise_id;
}
function story_para_select_reset(a) {
	a.style.display = "none";
	var p_c = a.parentNode.children[1];
	p_c.style.display = "block";
	$('#'+p_c.children[0].innerHTML).fadeOut(400);
}