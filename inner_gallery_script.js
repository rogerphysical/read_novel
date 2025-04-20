// var pic_name_list = {"images": ["images/.png"]};
var pic_name_list = {};

var pic_focus_now_name = "";
var pic_focus_now_i = -1;
var pic_focus_mode = 0; // 1: full pic

// click to get pic
function clear_pic_gallery() {
	pic_name_list = {};
	pic_focus_now_name = "";
	pic_focus_now_i = -1;

	pic_gallery_pic.innerHTML = "";
}
function get_pic_dir(dir) {
	pic_name_list[dir] = [];
	pic_gallery_pic.innerHTML += "<div class='pic_files_text pic_area'>" + dir + "</div>";
}
function get_pic_files(dir, file_name) {
	let index = pic_name_list[dir].length;
	pic_name_list[dir].push(file_name);
	// console.log(file_name);

	let pic_focus_click_fun = "pic_focus_fun('" + dir + "', " + index + ")";
	let pic_focus_click_img = "./images/" + file_name;

	pic_gallery_pic.innerHTML += `
		<div class="pic_area" onclick="` + pic_focus_click_fun + `">
			<div class="para_pic"> <img src=` + pic_focus_click_img + `> </div>
		</div>`;

	return true
}

// pic focus fun
function pic_focus_fun(dir, file_i) {
	// console.log(pic_name_list);
	var pic_name = pic_name_list[dir][file_i];
	pic_focus_img.src = "./images/" + pic_name;
	pic_focus_info.innerHTML = pic_name;

	pic_focus_now_name = dir;
	pic_focus_now_i = file_i;

	$('#pic_focus').fadeIn(400);
	pic_focus_scale_mode(pic_focus_mode);
}
function pic_focus_touch_fun(action) {
	switch (action) {
		case 'switch_touch':
			pic_focus_touch.style.display = pic_focus_touch.style.display == "none" ? "block" : "none";
			break;

		case 'close_focus':
			$('#pic_focus').fadeOut(400);
			pic_focus_mode_keep = 0;
			break;

		case 'scale_-':
			pic_focus_scale_fix(0, -1);
			break;

		case 'scale_+':
			pic_focus_scale_fix(0, 1);
			break;
	}
}
// to_next: -1, 1
function pic_focus_change(to_next) {
	if (to_next == -1 && pic_focus_now_i == 0) {
		return false;
	}
	if (to_next == 1 && pic_focus_now_i == pic_name_list[pic_focus_now_name].length-1) {
		return false;
	}
	pic_focus_now_i += to_next;

	var pic_name = pic_name_list[pic_focus_now_name][pic_focus_now_i];
	pic_focus_img.src = "./images/" + pic_name;
	pic_focus_info.innerHTML = pic_name;

	return true;
}
// mode: 0: large pic, 1: full pic, 2: switch
function pic_focus_scale_mode(mode) {
	switch (mode) {
		case 0:
			pic_focus_img.style.maxWidth = "unset";
			pic_focus_img.style.maxHeight = "unset";

			pic_focus_scale_fix(1, "auto");
			break;

		case 1:
			pic_focus_img.style.width = "fit-content";
			pic_focus_img.style.height = "fit-content";
			pic_focus_img.style.maxWidth = "100%";
			pic_focus_img.style.maxHeight = "100%";

			pic_focus_div.style.justifyContent = "center";
			pic_focus_div.style.alignItems = "center";
			break;

		case 2:
			if (pic_focus_mode_keep) {
				pic_focus_mode_keep = 0;
			}
			else {
				pic_focus_mode = (pic_focus_mode) ? 0 : 1;
			}
			pic_focus_scale_mode(pic_focus_mode);
			break;
	}
}
// scale_type: -1, 1
function pic_focus_scale_fix(init, scale_type) {
	var div_width = pic_focus_div.clientWidth;
	var div_height = pic_focus_div.clientHeight;
	// console.log("div_width:" + div_width);
	// console.log("div_height:" + div_height);

	var offset_coef_left = .5;
    var offset_coef_top = .5;

	// fix
	if (init) {
		pic_focus_img.style.width = "fit-content";
		pic_focus_img.style.height = "100%";

		if (pic_focus_img.clientWidth < pic_focus_div.clientWidth) {
			pic_focus_img.style.width = "100%";
			pic_focus_img.style.height = "fit-content";
		}
	}
	else {
		// trace
		var trace_img_width = pic_focus_img.clientWidth;
		var trace_img_height = pic_focus_img.clientHeight;
		// var trace_offset_left = pic_focus_div.scrollLeft;
		// var trace_offset_top = pic_focus_div.scrollTop;
		// console.log("trace_img_width:" + trace_img_width);
		// console.log("trace_img_height:" + trace_img_height);
		// console.log("trace_offset_left:" + trace_offset_left);
		// console.log("trace_offset_top:" + trace_offset_top);

		offset_coef_left = pic_focus_div.scrollLeft/(trace_img_width-div_width);
		offset_coef_top = pic_focus_div.scrollTop/(trace_img_height-div_height);

		offset_coef_left = (trace_img_width<=div_width*1.2) ? .5 : Math.round(100*offset_coef_left)/100;
		offset_coef_top = (trace_img_height<=div_height*1.2) ? .5 : Math.round(100*offset_coef_top)/100;
		// console.log("offset_coef_left:" + offset_coef_left);
		// console.log("offset_coef_top:" + offset_coef_top);

		pic_focus_img.style.width = "fit-content";
		pic_focus_img.style.height = Math.round(trace_img_height + scale_type*.2*div_height) + "px";
	}

	pic_focus_img.style.maxWidth = "unset";
	pic_focus_img.style.maxHeight = "unset";

	var img_width = pic_focus_img.clientWidth;
	var img_height = pic_focus_img.clientHeight;
	// console.log("img_width:" + img_width);
	// console.log("img_height:" + img_height);
	
	pic_focus_div.style.justifyContent = (img_width > div_width) ? "normal" : "center";
	pic_focus_div.style.alignItems = (img_height > div_height) ? "normal" : "center";
	
	pic_focus_div.scrollTo((img_width-div_width)*offset_coef_left, (img_height-div_height)*offset_coef_top);
}

// pic_focus_scale
var pic_focus_mode_keep = 0;
var pic_focus_scale_start = 0;
var pic_focus_scale_pos = -1;
var pic_focus_scale_pos_init = -1;
function pic_focus_scale_fun() {
	// scale
	pic_focus_scale.addEventListener('mousedown', function (e) {
		if (e.which){
			pic_focus_scale_d(e.offsetY);
		}
	})
	pic_focus_scale.addEventListener('mouseup', function (e) {
		if (e.which){
			pic_focus_scale_u(e.offsetY);
		}
	})
	pic_focus_scale.addEventListener('mousemove', function (e) {
		if (e.which){
			pic_focus_scale_m(e.offsetY);
		}
	})
	pic_focus_scale.addEventListener('touchstart', function (e) {
		e.preventDefault();
		pic_focus_scale_d(e.changedTouches[0].clientY);
	})
	pic_focus_scale.addEventListener('touchend', function (e) {
		e.preventDefault();
		pic_focus_scale_u(e.changedTouches[0].clientY);
	})
	pic_focus_scale.addEventListener('touchmove', function (e) {
		e.preventDefault();
		pic_focus_scale_m(e.changedTouches[0].clientY);
	})
}
function pic_focus_scale_d(y) {
	pic_focus_scale_start = 1;
	pic_focus_scale_pos = y;
	pic_focus_scale_pos_init = y;
}
function pic_focus_scale_u(y) {
	pic_focus_scale_start = 0;
	if (Math.abs(y - pic_focus_scale_pos_init) < 20) {
		pic_focus_scale_mode(2);
	}
}
function pic_focus_scale_m(y) {
	if (pic_focus_scale_start) {
		// console.log(pic_focus_scale_pos);
		var dy = y - pic_focus_scale_pos;
		if (Math.abs(dy) > 20) {
			pic_focus_mode_keep = 1;

			dy = (dy>0) ? -1 : 1;
			pic_focus_scale_fix(0, dy);

			pic_focus_scale_pos = y;
		}
	}
}

// write pic_focus
function write_pic_focus_fun() {
	var write_pic_focus = `
		<!-- pic_focus -->
		<div id="pic_focus" class="pic_focus_pos">
			<div id="pic_focus_div" class="pic_focus_pos" onclick="pic_focus_touch_fun('switch_touch')" ondblclick="pic_focus_scale_mode(2)">
				<img id="pic_focus_img">
			</div>

			<!-- pic_focus_touch -->
			<div id="pic_focus_touch" class="pic_focus_pos">
				<!-- info -->
				<div id="pic_focus_info" class="pic_focus_pos pic_focus_touch_button">pic_path</div>

				<!-- back -->
				<div class="pic_focus_pos pic_focus_touch_button" style="left: 0%; transform: rotate(-90deg);" onclick="pic_focus_touch_fun('close_focus')">&Delta;</div>

				<!-- scale -->
				<div id="pic_focus_scale" class="pic_focus_pos pic_focus_touch_button" style="left: calc(100% - 40px); top: -120px; height: 80px;">&varr;</div>

				<!-- change -->
				<div class="pic_focus_pos pic_focus_touch_button" style="left: calc(100% - 40px); top: -20px;" onclick="pic_focus_change(-1)">&Delta;</div>
				<div class="pic_focus_pos pic_focus_touch_button" style="left: calc(100% - 40px); top: 20px; transform: rotate(180deg);" onclick="pic_focus_change(1)">&Delta;</div>

			</div>
		</div>
	`;
	document.write(write_pic_focus);
}


