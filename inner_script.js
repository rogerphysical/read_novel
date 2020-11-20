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

// this 要改變的id 是否為圖 紀錄當前位置id的存放位置
function para_select_item(a, choise_id, pic=0, or_pos=0) {
	var or_id = a.parentNode.children[or_pos];
	if (pic !== 0) {
		document.getElementById(or_id.innerHTML).style.display = "none";
	}
	document.getElementById(choise_id).style.display = "block";
	// 選後按鈕消失
	a.parentNode.style.display = "none";

	// 顯示重選按鈕
	a.parentNode.parentNode.children[0].style.display = "block";
	// 更新已顯示的id
	or_id.innerHTML = choise_id;
}
// this pic:id顯現(否則為0) 紀錄當前位置id的存放位置 是否把自己none
function para_select_reset(a, pic=0, or_pos=0, exist=0) {
	if (exist === 0) {
		a.style.display = "none";
	}
	var p_c = a.parentNode.children[1];
	p_c.style.display = "block";
	var or_id = a.parentNode.children[1].children[or_pos];
	document.getElementById(or_id.innerHTML).style.display = "none";
	if (pic !== 0) {
		document.getElementById(pic).style.display = "block";
		or_id.innerHTML = pic;
	}
}
function para_change(a, id, change_to, min=-Infinity, max=Infinity, min_id=0, mid_id=0, max_id=0, min_end=0, mid_end=0, max_end=0) {
	var or_id = a.parentNode.children[0];

	if (change_to <= min) {
		document.getElementById(id).innerHTML = min;
		if (min_id !== 0) {
			document.getElementById(or_id.innerHTML).style.display = "none";

			// 若為多個 隨機挑取一個
			var min_id_doc = document.getElementById(min_id);
			if (min_id_doc.children.length > 1) {
				min_id_doc.children[min_id_doc.children[0].innerHTML].style.display = "none";
				var choise_index = Math.floor(1+Math.random()*(min_id_doc.children.length-1));
				min_id_doc.children[choise_index].style.display = "block";
				min_id_doc.children[0].innerHTML = choise_index;
			}

			document.getElementById(min_id).style.display = "block";
			or_id.innerHTML = min_id;
			if (min_end !== 0) {
				a.parentNode.style.display = "none";
			}
		}
	}
	else if (change_to >= max) {
		document.getElementById(id).innerHTML = max;
		if (max_id !== 0) {
			document.getElementById(or_id.innerHTML).style.display = "none";

			var max_id_doc = document.getElementById(max_id);
			if (max_id_doc.children.length > 1) {
				max_id_doc.children[max_id_doc.children[0].innerHTML].style.display = "none";
				var choise_index = Math.floor(1+Math.random()*(max_id_doc.children.length-1));
				max_id_doc.children[choise_index].style.display = "block";
				max_id_doc.children[0].innerHTML = choise_index;
			}

			document.getElementById(max_id).style.display = "block";
			or_id.innerHTML = max_id;
			if (max_end !== 0) {
				a.parentNode.style.display = "none";
			}
		}
	}
	else {
		document.getElementById(id).innerHTML = change_to;
		if (mid_id !== 0) {
			document.getElementById(or_id.innerHTML).style.display = "none";

			var mid_id_doc = document.getElementById(mid_id);
			if (mid_id_doc.children.length > 1) {
				mid_id_doc.children[mid_id_doc.children[0].innerHTML].style.display = "none";
				var choise_index = Math.floor(1+Math.random()*(mid_id_doc.children.length-1));
				mid_id_doc.children[choise_index].style.display = "block";
				mid_id_doc.children[0].innerHTML = choise_index;
			}

			document.getElementById(mid_id).style.display = "block";
			or_id.innerHTML = mid_id;
			if (mid_end !== 0) {
				a.parentNode.style.display = "none";
			}
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