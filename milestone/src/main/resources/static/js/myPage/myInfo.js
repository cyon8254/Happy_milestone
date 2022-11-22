const $submitBtn = $('.submitBtn');

/*----------------------------이메일 유효성 검사----------------------------*/
const $email = $('#email');
let emailFlag = false;
let $warningMsg;
const existingEmail = $email.val();

function email_check(email) {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != 'undefined' && regex.test(email));
}

$email.on('blur', function () {
    $submitBtn.attr("disabled", true);
    var email = $(this).val();
    $warningMsg = $(this).next();

    if (existingEmail == $email.val()) {
        $warningMsg.hide();
        return;
    }

    if (email == '' || email == 'undefined') {
        $warningMsg.show();
        $warningMsg.find(".warningMsg").css("color", "rgb(255, 64, 43)");
        $warningMsg.find(".warningMsg").text('이메일을 입력해 주세요');
        emailFlag = false;
        return;
    }
    if (!email_check(email)) {
        $warningMsg.show();
        $warningMsg.find(".warningMsg").css("color", "rgb(255, 64, 43)");
        $warningMsg.find(".warningMsg").text('이메일 형식이 유효하지 않습니다.');
        emailFlag = false;
        return false;
    }

    $warningMsg.show();
    $warningMsg.find(".warningMsg").css("color", "rgb(79 189 18)");
    $warningMsg.find(".warningMsg").text('사용 가능한 이메일입니다.');
    emailFlag = true;
    joinSubmit();
});

/*----------------------------닉네임 유효성 검사----------------------------*/
const $nickName = $('#nickName');
const existingNickName = $nickName.val();
let nickNameCheckFlag = false;

$nickName.on('blur', function () {
    $submitBtn.attr("disabled", true);
    nickNameCheckFlag = false;
    /*특수문자 포함되었는지 검사*/
    var nickNameCheck = /[#?!@$%^&*-]/;
    /*자음만 쓰였는지 검사*/
    var nickNameConsonantsCheck = /[ㄱ-ㅎ]/;
    /*공백검사*/
    var nickNameSpaceCheck = /\s/;

    $warningMsg = $nickName.next();
    if (nickNameCheck.test($nickName.val())) {
        $warningMsg.show();
        $warningMsg.find('.warningMsg').text("닉네임은 특수문자, 공백를 포함할 수 없습니다.");
        return;
    }
    if (nickNameSpaceCheck.test($nickName.val())) {
        $warningMsg.show();
        $warningMsg.find('.warningMsg').text("닉네임은 특수문자, 공백를 포함할 수 없습니다.");
        return;
    }
    if (nickNameConsonantsCheck.test($nickName.val())) {
        $warningMsg.show();
        $warningMsg.find('.warningMsg').text("닉네임은 자음을 단독으로  사용할 수 없습니다.");
        return;
    }
    nickNameCheckFlag = true;
    $warningMsg.hide();
    $warningMsg.find('.warningMsg').text("");
    joinSubmit();
})

/*----------------------------이름 유효성 검사----------------------------*/
const $name = $('#name');
const existingName = $name.val();
let nameCheckFlag = false;

var nameCheck = /^[가-힣]{2,15}$/;

$name.on('blur', function () {
    $submitBtn.attr("disabled", true);
    nameCheckFlag = false;
    if (!$name.val()) return;
    if (!nameCheck.test($name.val())) {
        $name.next().show();
        $name.next().find('.warningMsg').text("이름을 정확히 입력해 주세요.");
    } else {
        $name.next().hide();
        $name.next().find('.warningMsg').text("");
        nameCheckFlag = true;
    }
    joinSubmit();
})

/*----------------------------전화번호 유효성 검사----------------------------*/
const $phone = $('#phone');
const existingPhone = $phone.val().replace(/-/g, "");
const $certificationBtn = $('.certificationBtn');
const $certification = $('#certification');
let phoneFlag = false;
let phoneCheckFlag = false;
let tempPhone;

var phoneCheck = /^[0-9]{11,11}$/;

$certificationBtn.on('click', function () {
    $certification.attr("disabled", true);
    var phone = $(this).prev().val();
    phone = phone.replace(/-/g, "");
    $(this).prev().val(phone);
    $warningMsg = $(this).parent().next();

    // if (phone == '' || phone == 'undefined') {
    //     $warningMsg.show();
    //     $warningMsg.find(".warningMsg").css("color", "rgb(255, 64, 43)");
    //     $warningMsg.find(".warningMsg").text('전화번호를 입력해 주세요');
    //     $email.focus();
    //     phoneFlag = false;
    //     return;
    // }
    if (!phoneCheck.test(phone) || !phone.startsWith("010")) {
        $warningMsg.show();
        $warningMsg.find(".warningMsg").css("color", "rgb(255, 64, 43)");
        $warningMsg.find(".warningMsg").text('전화번호를 정확히 입력해 주세요');
        $phone.focus();
        phoneFlag = false;
        return false;
    } else {
        $warningMsg.show();
        $warningMsg.find(".warningMsg").css("color", "rgb(79 189 18)");
        $warningMsg.find(".warningMsg").text('입력하신 전화번호로 인증번호가 전송되었습니다.');
        tempPhone = phone;
        $certification.attr("disabled", false)
        $certification.focus();
        phoneFlag = true;
    }
});

$phone.on('blur', function () {
    var phone = $(this).val();
    phone = phone.replace(/-/g, "");
    $warningMsg = $(this).parent().next();
    $nextWarningMsg = $(this).parent().next()
    console.log(existingPhone)
    console.log(phone)
    if (!(existingPhone == phone)) {
        $certificationBtn.attr("disabled", false)
    } else {
        $certificationBtn.attr("disabled", true)
    }
    if (tempPhone && !(phone == tempPhone)) {
        $warningMsg.find(".warningMsg").css("color", "rgb(255, 64, 43)");
        $warningMsg.find(".warningMsg").text('전화번호가 변경 되었습니다 인증을 다시 받아주세요');
        phoneFlag = false;
        tempPhone = "";
        $nextWarningMsg.hide();
        $nextWarningMsg.prev().val("");
        $certification.attr("disabled", true);
    }
});
/*인증번호*/
$certification.on('blur', function () {
    $certification.attr("disabled", true);
    phoneCheckFlag = false;
    if (phoneFlag) {
        $warningMsg = $(this).next();
        if (!$certification.val()) {
            $warningMsg.show();
            $warningMsg.find(".warningMsg").css("color", "rgb(255, 64, 43)");
            $warningMsg.find(".warningMsg").text("인증번호를 입력해 주세요")
        } else if ("1234" == $certification.val()) {
            $warningMsg.closest(".flexRow").show();
            phoneCheckFlag = true;
            $warningMsg.find(".warningMsg").css("color", "rgb(79 189 18)");
            $warningMsg.find(".warningMsg").text("인증번호가 일치합니다.")
            joinSubmit();
        } else {
            $warningMsg.show();
            $warningMsg.find(".warningMsg").css("color", "rgb(255, 64, 43)");
            $warningMsg.find(".warningMsg").text("인증번호가 일치하지 않습니다.")
        }
    }
})

/*수정하기 최종확인*/

function joinSubmit() {

    if (!(existingEmail == $('#email').val())) {
        if (!emailFlag) {
            console.log("이메일")
            return;
        }
    }
    if (!(existingNickName == $('#nickName').val())) {
        if (!nickNameCheckFlag) {
            console.log("닉네임")
            return;
        }
    }
    if (!(existingName == $('#name').val())) {
        if (!nameCheckFlag) {
            console.log("이름")
            return;
        }
    }
    if (!(existingPhone == $('#phone').val().replace(/-/g, ""))) {
        if (!phoneCheckFlag) {
            console.log("핸드폰")
            return;
        }
    }
    if (!(existingName == $('#name').val()) || !(existingNickName == $('#nickName').val()) || !(existingEmail == $('#email').val()) || !(existingPhone == $('#phone').val().replace(/-/g, ""))) {
        $submitBtn.attr("disabled", false)
    }
}