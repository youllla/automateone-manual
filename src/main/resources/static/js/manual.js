//Markdown

files = {};
$(function() {
	var $previewContainer = $('#editor-content-preview-container');
	$previewContainer.hide();
	var $md = $("#editor-content").markdown({
		autofocus: false,
		height: 370,
		iconlibrary: 'fa',
		onShow: function(e) {
		e.change(e);
		},
		onChange: function(e) {
		//console.log(e.getContent());
			var getContent = e.getContent();
			var parseContent = e.parseContent();
			if (parseContent === '') {
				$previewContainer.hide();
			} else {
				$previewContainer.show().find('#editor-content-preview').html(parseContent).find('table').addClass('table table-bordered table-striped table-hover');
				$("#getContent").val(getContent);
				$("#parseContent").val(parseContent);
			}
		},
		footer: function(e) {
			return '\
					<span class="text-muted">\
						<span data-md-footer-message="err">\
						</span>\
						<span data-md-footer-message="default">\
							드래그하여 이미지를 업로드 해주세요. 또는 \
							<a class="btn-input">\
							이미지를 선택해주세요.\
								<input type="file" multiple="" id="comment-images" />\
							</a>\
						</span>\
						<span data-md-footer-message="loading">\
							이미지 업로드 중...\
						</span>\
					</span>';
		}
	});

	var $mdEditor = $('.md-editor'),
	msgs = {};
	
	$mdEditor.find('[data-md-footer-message]').each(function() {
		msgs[$(this).data('md-footer-message')] = $(this).hide();
	});
	msgs.
	default.show();
	
	//드래그 앤 드롭
	$mdEditor.filedrop({
	binded_input: $('#comment-images'),
	url: '/imgUpload',
	data: files,
	fallbackClick: false,
		beforeSend: function(file, i, done) {
			msgs.
			default.hide();
			msgs.err.hide();
			msgs.loading.show();
			done();
		},
		// maxfilesize: 15,
		error: function(err, file) {
			switch (err) {
				case 'BrowserNotSupported':
				alert('browser does not support HTML5 drag and drop')
				break;
				case 'FileExtensionNotAllowed':
				break;
				default:
				break;
			}
			var filename = typeof file !== 'undefined' ? file.name : '';
			msgs.loading.hide();
			msgs.err.show().html('<span class="text-danger"><i class="fa fa-times"></i> Error uploading ' + filename + ' - ' + err + '</span><br />');
		},
		dragOver: function() {
			$(this).addClass('active');
		},
		dragLeave: function() {
			$(this).removeClass('active');
		},
		progressUpdated: function(i, file, progress) {
			msgs.loading.html('<i class="fa fa-refresh fa-spin"></i> Uploading <span class="text-info">' + file.name + '</span>... ' + progress + '%');
		},
		afterAll: function() {
			msgs.
			default.show();
			msgs.loading.hide();
			msgs.err.hide();
		},
		uploadFinished: function(i, file, response, time) {
			$md.val($md.val() + "![" + file.name + "](http://localhost:28080/uploadImage/" + file.name + ")\n").trigger('change');
		}
	});
	
});

function isEmpty(val){
	if(typeof val == "undefined" || val == null || val == ""){
		return true;
	} else {
		return false;
	}
}

$(function(){
	var category = $('#category-box');
	var	categoryVal = category.val();
	var input = $('#input');
	var id = '';
	
	//분류 추가 팝업
	$(".popup_open").click(function() {
		input.val('');
		id = $(this).attr('id');
		$("#popup_wrap").css("display", "block");
		$("#mask").css("display", "block");
	});
	
	//팝업 close
	$("#popup_close").click(function() {
		$("#popup_wrap").css("display", "none");
		$("#mask").css("display", "none");
	});

	//분류 추가
	$("#add").click(function(){
		var inputVal = input.val();
		
		if(id == 'main'){
			if(isEmpty(inputVal) == false){
				$.ajax({
					type: 'post',
					url: '/classInsert',
					data: {
						'id' : id,
						'userName' : inputVal,
					},
					success: function(data){
						if(data == 1) {
						console.log(data);
							alert("회원가입이 완료되었습니다.");
							location.href="/practice/user/main";
						} else {
							alert("회원가입이 실패되었습니다.");
							history.back()
						}
					},
					error:function(){
						alert("ERROR");
					}
				});
	
				$('#main-class-box').append("<option value='" + inputVal + "'>" + inputVal + "</option>");
			}
		} else if(id == 'middle'){
			if(isEmpty(inputVal) == false){
				$('#middle-class-box').append("<option value='" + inputVal + "'>" + inputVal + "</option>");
			}
		} else if(id == 'sub'){
			if(isEmpty(inputVal) == false){
				$('#sub-class-box').append("<option value='" + inputVal + "'>" + inputVal + "</option>");
			}
		}
		alert("추가되었습니다.");
    });
	
	//대분류 삭제
	$("#del-class").click(function(){
		if($('#main-class-box option:selected').val() !== ""){
			$('#main-class-box option:selected').remove();
			alert("삭제되었습니다.");
		}
	});
	
	//AO 버전
	$(category).change(function(){
		categoryVal = category.val();
		console.log(categoryVal); //value값 가져오기
		
		if(categoryVal == 1 || categoryVal == 3){
			$('#version-title').show();
			$('#version-box').show();
			$('#version-explain').show();
		} else {
			$('#version-title').hide();
			$('#version-box').hide();
			$('#version-explain').hide();
		}
	});
	
});


//수정 예정
function zz(){
	alert(files.file);
	
	$('#main-class-box option').each(function(index, optionCount) {
		if(index != 0){
			var mainClassList = '';
			var res = $("#main-class-box option:eq(" + index + ")").val();
			
			/*mainClassList = mainClassList +*/ 
			alert(res);
		}
	});
}

function manualInsert(){
	var category = $('#category-box option:selected').val();
	var version = $('#version-box option:selected').val();
	var mainClass = $('#main-class-box option:selected').val();
	var middleClass = $('#middle-class-box option:selected').val();
	var subClass = $('#sub-class-box option:selected').val();
	var title = $('#editor-title').val();
	var content = $('#editor-content').val();
	var parseContent = $('#parseContent').val();
	var isEmptyChk = false;
	
	/*alert($('#middle-class-box').text());
	alert($('#sub-class-box').text());*/
	
	//isEmpty check
	if(isEmpty(category)){
		alert("카테고리를 선택해주세요.");
		isEmptyChk = false;
	} else if(isEmpty(version)){
		if(category == 1 || category == 3){
			alert("버전을 선택해주세요.");
			isEmptyChk = false;
		}
	} else if(isEmpty(mainClass)) {
		alert("대분류를 선택해주세요.");
		isEmptyChk = false;
	} else if(isEmpty(title)) {
		alert("제목을 입력해주세요.");
		isEmptyChk = false;
	} else if(isEmpty(content)) {
		alert("내용을 입력해주세요.");
		isEmptyChk = false;
	} else if(isEmpty(subClass) == false) {
		if(isEmpty(middleClass)) {
			alert("소분류를 선택하려면 중분류를 먼저 선택해주세요.");
			isEmptyChk = false;
		}
		isEmptyChk = true;
	} else {
		isEmptyChk = true;
	}
	console.log(isEmptyChk);
	
	if(isEmptyChk){
		$.ajax({
			type: 'post',
			url: '/manualInsert',
			data: {
				'category' : category,
				'version' : version,
				'main_class' : mainClass,
				'middle_class' : middleClass,
				'sub_class' : subClass,
				'title' : title,
				'content' : content,
				'parse_content' : parseContent
			},
			success: function(data){
				var result = confirm("매뉴얼을 등록하시겠습니까?");
				
				if(result) {
					if(data == 1) {
						console.log(data);
						location.reload();
					} else {
						alert("매뉴얼 등록을 실패하였습니다.");
					}
				}
			},
			error:function(){
				alert("ERROR");
			}
		});
	}
}


//메뉴얼 상세

