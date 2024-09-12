$(function() {
    let
    push1 = "",
    push2 = "",
    answer = "",
    en = "",
    push_box = [],
    en_switch = false,
    ren = false,
    answer_con = false;

    /**初期値 */
    push_box.push("0");
    $('.display_right').text(push_box.join(''));

    /**数値キーの処理 */
    $('.number').click(function() {
        if(answer_con === true && en_switch === false) {
            push1 = "";
            push2 = "";
            push_box = [];
            answer_con = false;
            $('.display_left').removeClass('after');
        };
        if(($('.display_right').text() === "0" && ($(this).text() === "0" || $(this).text() === "00")) || push_box.length >= 17) {
            ;
        }else if(en_switch === true) {
            if($('.display_right').text() === "0" && $(this).text() !== ".") {
                push_box.pop();
            };
            if($(this).text() === "00") {
                if(push_box.length === 16) {
                    push_box.push("0");
                }else{
                    push_box.push("0");
                    push_box.push("0");
                };
            }else{
                push_box.push($(this).text());
            };
            push2 = push_box.join('');
            $('.display_right').text(push2);
            ren = true;
            answer_con = false;
        }else{
            if($('.display_right').text() === "0" && $(this).text() !== ".") {
                push_box.pop();
            };
            if($(this).text() === "00") {
                if(push_box.length === 16) {
                    push_box.push("0");
                }else{
                    push_box.push("0");
                    push_box.push("0");
                };
            }else{
                push_box.push($(this).text());
            };
            push1 = push_box.join('');
            $('.display_right').text(push1);
        };
    });

    /**演算キーの処理 */
    $('.enzan').click(function() {
        if(answer_con === false && ren === true) {
            if(en === "ta") {
                answer = (((push1*1)*10) + ((push2*1)*10)) / 10;
            }else if(en === "hi") {
                answer = (((push1*1)*10) - ((push2*1)*10)) / 10;
            }else if(en === "ka") {
                answer = push1 * push2;
            }else if(en === "wa") {
                answer = push1 / push2;
            };
            push_box = [];
            push_box = answer.toString().split('').map(Number);
            if(push_box.length > 17) {
                $('.display_right').text("計算できません");
            }else{
                $('.display_right').text(answer);
            };
            push1 = answer;
            if($(this).text() === "×" || $(this).text() === "÷") {
                push2 = 1;
            }else{
                push2 = 0;
            };
        };
        push_box = [];
        en_switch = true;
        en = $(this).attr('id');
        $('.display_left').addClass('after');
        $('.display_left').text($(this).text());
    });

    /**イコールキーの処理 */
    $('.answer').click(function() {
        $('.display_left').text($(this).text());
        if(en === "") {
            answer = push1;
        }else if(en === "ta") {
            answer = (((push1*1)*10) + ((push2*1)*10)) / 10;
        }else if(en === "hi") {
            answer = (((push1*1)*10) - ((push2*1)*10)) / 10;
        }else if(en === "ka") {
            answer = push1 * push2;
        }else if(en === "wa") {
            answer = push1 / push2;
        };
        push_box = [];
        push_box = answer.toString().split('').map(Number);
        if(push_box.length > 17) {
            $('.display_right').text(answer.toPrecision(16));
        }else{
            $('.display_right').text(answer);
        };
        push1 = answer;
        answer_con = true;
        en_switch = false;
        ren = false;
    });

    /**Cキーの処理 */
    $('.c').click(function() {
        push_box = [];
        push_box.push("0");
        $('.display_right').text(push_box.join(''));
        push_box = [];
        if(en_switch === true) {
            push2 = "";
        }else{
            push1 = "";
        };
    });

    /**ACキーの処理 */
    $('.ac').click(function() {
        push1 = "";
        push2 = "";
        answer = "";
        en = "";
        push_box = [];
        en_switch = false;
        ren = false;
        answer_con = false;
        push_box.push("0");
        $('.display_right').text(push_box.join(''));
        $('.display_left').removeClass('after');
    });

    /**BSキーの処理 */
    $('.bs').click(function() {
        push_box.pop();
        if(push_box.length === 0) {
            push_box.push("0");
        };
        if(en_switch === true) {
            push2 = push_box.join('');
            $('.display_right').text(push2);
        }else{
            push1 = push_box.join('');
            $('.display_right').text(push1);
        };
    });
});