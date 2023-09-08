window.onload = function() {
	if (localStorage.getItem("read_novel_"+'font_size')) {
		var size = parseInt(JSON.parse(localStorage.getItem("read_novel_"+'font_size'))['size']);
		document.body.style.fontSize = size+'px';
	}
	if (localStorage.getItem("read_novel_"+'font_color')) {
		document.body.style.backgroundColor = JSON.parse(localStorage.getItem("read_novel_"+'font_color'))['backgroundColor'];
		document.body.style.color = JSON.parse(localStorage.getItem("read_novel_"+'font_color'))['color'];

	}
	if (localStorage.getItem("read_novel_"+'text_select')) {
		document.body.style.userSelect = "none";
	}
}
window.addEventListener('keydown', function(ev) {
	// console.log(ev.keyCode);
	window.parent.postMessage(
		{
			event_id: 'keyCode',
			data: ev.keyCode
		},
		"*"
	);
});
// 存放處
var id = {};
var index = {};

// this 要改變的id 紀錄當前位置id的key 是否有起始值
function para_select_item(a, key, choise_id, or_id=0) {
	if (or_id !== 0) {
		$('#'+or_id).fadeOut(400);
	}
	$('#'+choise_id).fadeIn(400);

	// 選後按鈕消失
	a.parentNode.style.display = "none";
	// 顯示重選按鈕
	a.parentNode.parentNode.children[0].style.display = "block";
	// 更新已顯示的id
	id[key] = choise_id;
}
// this 紀錄當前位置id的存放位置 pic:id顯現(否則為0) 是否把自己none
function para_select_reset(a, key, or_id=0, exist=0) {
	// 將重選隱藏
	if (exist === 0) {
		a.style.display = "none";
	}

	// 顯示選項
	var p_c = a.parentNode.children[1];
	if (p_c.style.display === 'none') {
		p_c.style.display = "block";
	}
	
	// 之後顯示的隱藏、原本隱藏的顯示
	if (id[key]) {
		document.getElementById(id[key]).style.display = "none";
		if (or_id !== 0) {
			document.getElementById(or_id).style.display = "block";
			id[key] = or_id;
		}
	}
}
function para_change(a, key, id, change_to, min=-Infinity, max=Infinity, min_id=0, mid_id=0, max_id=0, min_end=0, mid_end=0, max_end=0, or_id=0) {
	if (change_to <= min) {
		document.getElementById(id).innerHTML = min;
		para_change2(a, key, min_id, min_end, or_id);
	}
	else if (change_to >= max) {
		document.getElementById(id).innerHTML = max;
		para_change2(a, key, max_id, max_end, or_id);
	}
	else {
		document.getElementById(id).innerHTML = change_to;
		para_change2(a, key, mid_id, mid_end, or_id);
	}
}
function para_change2(a, key, xxx_id, xxx_end, or_id) {
	if (xxx_id !== 0) {
			// 隱藏現在顯示的
		if (id[key] || or_id !== 0) {
			if (id[key]) {
				document.getElementById(id[key]).style.display = 'none';
			}
			else {
				document.getElementById(or_id).style.display = 'none';
			}
		}
		// 若為多個 隨機挑取一個
		var xxx_id_doc = document.getElementById(xxx_id);
		if (xxx_id_doc.children.length > 1) {
			// 將已顯示的關閉
			if (index[xxx_id]) {
				xxx_id_doc.children[index[xxx_id]].style.display = "none";
			}
			var choise_index = parseInt(Math.random()*xxx_id_doc.children.length);
			// 顯示內層
			xxx_id_doc.children[choise_index].style.display = "block";
			// 更新已顯示的id
			index[xxx_id] = choise_index;
		}

		// 顯示外層
		document.getElementById(xxx_id).style.display = "block";
		// 更新已顯示的id
		id[key] = xxx_id;
		// 結束符
		if (xxx_end !== 0) {
			a.parentNode.style.display = "none";
		}
	}
}

// 按鈕次數
function buttom_times(id, change_to) {
	const id_doc = document.getElementById(id);
	if (change_to > 0) {
		id_doc.innerHTML = change_to;
		if (id_doc.parentNode.style.visibility === 'hidden') {
			id_doc.parentNode.style.visibility = 'visible';
		}
	}
	else {
		id_doc.innerHTML = 0;
		if (id_doc.parentNode.style.visibility !== 'hidden') {
			id_doc.parentNode.style.visibility = 'hidden';
		}
	}
}

function para_change_reset(id, or) {
	document.getElementById(id).innerHTML = or;
}
function change_to_num(id) {
	var num = document.getElementById(id).innerHTML;
	return parseInt(num);
}
function change_to_num2(num, range) {
	var num2 = num+Math.random()*range-range*0.5;
	return Math.round(num2)
}
