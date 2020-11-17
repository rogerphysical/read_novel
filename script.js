window.onload = function() {
	to_top();
	story_close2();

	// 設定內容
	if (localStorage.getItem("read_novel_"+'font_size')) {
		var size_index = parseInt(JSON.parse(localStorage.getItem("read_novel_"+'font_size'))['index']);
		var size_selected = document.getElementById('font_size');
		size_selected.options[size_index].selected = true;
	}
	if (localStorage.getItem("read_novel_"+'font_color')) {
		var color_index = parseInt(JSON.parse(localStorage.getItem("read_novel_"+'font_color'))['index']);
		var color_selected = document.getElementById('font_color');
		color_selected.options[color_index].selected = true;
	}
	if (localStorage.getItem("read_novel_"+'record')) {
		var par = document.getElementById("record_judge").parentNode;
		par.removeChild(document.getElementById("record_judge"));
	}
	if (localStorage.getItem("read_novel_"+'text_select')) {
		document.getElementById('text_select').style.backgroundColor = "unset";
	}

	// 網址
	if (location.search) {
		var paras = location.search.substr(1).split('&');

		// 預設參數
		var par_id = 0;
		var par_src = 0;
		var par_index = 0;

		// 每個參數獨自判斷
		for (var i=0; i < paras.length; i++) {
			var para_spl = paras[i].split('=');
			switch(para_spl[0]) {
				case 'id':
					par_id = para_spl[1];
					break;
				case 'src':
					par_src = para_spl[1];
					break;
				case 'index':
					par_index = parseInt(para_spl[1]);
					break;
			}
		}
		// 判斷三者皆存在
		if (par_id !== 0 && par_src !== 0 && par_index !== 0) {
			save_page(par_id, par_src);
			record(par_index);
		}
	}
}

// 改變網址
function shange_url() {
	var str = '?id='+story_page_id;
	str += '&src='+story_page_src;
	str += '&index='+story_index;
	history.pushState(null,null, str);
}

function to_top() {
	$('html, body').animate({scrollTop: 0}, 400);
}
function show_copyright() {
	$('html, body').animate({scrollTop: $('body').height()-$(window).height()}, 1000);
	setTimeout("$('html, body').animate({scrollTop: 0}, 1000)", 2000)
	history.pushState(null,null, "?123=456");
}

function to_page(a, b) {
	$('#'+a).fadeOut(400);
	setTimeout("$('#"+b+"').slideDown(400)", 400);
}

function to_page2(a, b) {
	$('#'+a).slideUp(400);
	setTimeout("$('#"+b+"').fadeIn(400)", 400);
}

// 以下設定
function font_size(a) {
	var save = {
		'index': a.value,
		'size': a.options[a.value].text
	}
	localStorage.setItem("read_novel_"+"font_size", JSON.stringify(save));
}

function font_color(a) {
	var save = {
		'index': a.value,
		'backgroundColor': a.options[a.value].style.backgroundColor,
		'color': a.options[a.value].style.color
	}
	localStorage.setItem("read_novel_"+"font_color", JSON.stringify(save));
}

function use_record(a) {
	if (localStorage.getItem("read_novel_"+'record')) {
		localStorage.removeItem("read_novel_"+"record");
		a.innerHTML += "<div id='record_judge' class=\'items_name_r record\'>&oplus;</div>"
	}
	else {
		var judge = confirm("此動作將清除觀看紀錄\r確定清除記錄嗎?");
		if (judge === true) {
			localStorage.setItem("read_novel_"+"record", "false");

			for (var i = localStorage.length-1; i >= 0; i--) {
				var item = localStorage.key(i);
				if (item.substr(0, 18) === "read_novel_record_") {
					localStorage.removeItem(item);
				}
			}
			window.location.reload();
		}
	}
}
function text_select(a) {
	if (localStorage.getItem("read_novel_"+"text_select")) {
		localStorage.removeItem("read_novel_"+"text_select");
		a.children[2].style.backgroundColor = "#00F";
	}
	else {
		localStorage.setItem("read_novel_"+"text_select", "false");
		a.children[2].style.backgroundColor = "unset";
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

// 文章記錄 與 按鈕判斷
var story_page_id = '';
var story_page_src = '';
var story_index = 0;
var story_index_least = 0;

function in_record() {
	if (document.getElementById('record')) {
		var parent = document.getElementById('record').parentNode;
		parent.removeChild(document.getElementById('record'));
	}
	if (localStorage.getItem("read_novel_record_"+story_page_id)) {
		var record = localStorage.getItem("read_novel_record_"+story_page_id);
		document.getElementById(story_page_id).children[record].innerHTML += "<div id=\'record\' class=\'items_name_r record\'>&oplus;</div>";
	}
}

function record(num) {
	story_index = num;
	if (localStorage.getItem("read_novel_"+'record') !== "false") {
		localStorage.setItem("read_novel_record_"+story_page_id, story_index);
		in_record();
	}

	document.getElementById('cont').src = story_page_src+'/index_'+story_index+'.html';

	// 改變網址
	shange_url();

	// 轉
	document.getElementById('story').style.transform = "rotate(0deg)";
	setTimeout("document.getElementById('story').style.zIndex = 2", 400);
	setTimeout("record2()", 400);
}
// 開
function record2() {
	var story_width = $(window).width() > 768?"80%":"100%";
	var story_left = $(window).width() > 768?"10%":"0%";
	$("#story").animate({width: story_width, left: story_left, height: '100vh', top: '0%'}, 400);

	judge_bts();
}

// 文本選定
function save_page(id, src) {
	story_page_id = id;
	story_page_src = src;
	story_index_least = document.getElementById(id).children.length-1;
	in_record();
}

// story的按鈕
function story_change(para) {
	story_index = story_index+para;
	$('#cont').fadeOut(400);
	setTimeout("document.getElementById('cont').src = story_page_src+'/index_'+story_index+'.html'", 400);

	// 改變網址
	shange_url();

	if (localStorage.getItem("read_novel_"+'record') !== "false") {
		localStorage.setItem("read_novel_record_"+story_page_id, story_index);
		in_record();
	}

	// 判斷與避免重複點選
	judge_bts();
	document.getElementById('story_bts').style.display = 'none';
	setTimeout("$('#story_bts').fadeIn(400)", 400);
}
// 判斷是否有上/下一篇
function judge_bts() {
	document.getElementById('story_back').style.visibility = story_index === 1?'hidden':'visible';
	document.getElementById('story_next').style.visibility = story_index === story_index_least?'hidden':'visible';
}

// 闔上
function story_close() {
	$('#story').animate({width: '100vw', left: '0px', height: '2px', top: '50vh'}, 400);
	setTimeout("story_close2()", 400);
	$('#cont').fadeOut(400);

	// 還原網址
	history.pushState(null,null, location.pathname);
}
// 轉
function story_close2() {
	document.getElementById('story').style.zIndex = -1;
	if ($(window).width() > 768) {
		var ran_j = (Math.random() < 0.5)?-1:1;
		var ran = ran_j*(10+Math.random()*35);
		document.getElementById('story').style.transform = "rotate("+ran+"deg)";
	}
}

// story讀取完後執行
function restart() {
	$('#cont').slideDown(400);
}