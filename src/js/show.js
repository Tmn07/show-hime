$(function() {

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
    {
        if(request.cmd == 'browserAction.onClicked') {
            display = document.querySelector("#hime07").style["display"];
            if (display=="none") { 
                document.querySelector("#hime07").style["display"] = "block";
            }
            else { 
                document.querySelector("#hime07").style["display"] = "none";
            }
            // alert(request.value);
        } 
        sendResponse('ok');
        // $(this).css("display",'none');
        // chrome.runtime.sendMessage({show:false},function (response) {
        //     consolog('content get response:',response);
        // });
    });

    // var log_flag = true;
    var log_flag = false;
    // 封装console.log
    function consolog(){
        if (log_flag) {
            var length=arguments.length;
            if(length==1)
            {
                console.log(arguments[0]);
            }
            else{
                console.log( Array.prototype.slice.call(arguments) );
            }        
        }
    }
    function inArray(needle, haystack) {
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return true;
        }
        return false;
    }

    var show_flag=true;
    var ho_probs = [1, 0.8, 0.6, 0.4, 0.2];
    
    chrome.storage.local.get({
         list:[20],
         ho_btn:"0",
         ho_range:"1",
         ho_prob:"3",
         ho_method:['1'],
         ho_audio: ['1'],
         }, function(data){

        if (data.list.length==0) {
            data.list = [20];
        }
        consolog(data);
        // 获取showlist，并随机一个
        var show_list = data.list;
        // https error
        // var info2 = $.get("http://tmn07.com/info.json");
        var info = {"1": ["\u5929\u6d77 \u6625\u9999", ["0", "01", "1", "11", "2", "22"]], "2": ["\u5982\u6708 \u5343\u65e9", ["0", "01", "1", "2", "22"]], "3": ["\u661f\u4e95 \u7f8e\u5e0c", ["0", "01", "1", "2", "22"]], "4": ["\u8429\u539f \u96ea\u6b69", ["0", "01", "1", "2"]], "5": ["\u9ad8\u69fb \u3084\u3088\u3044", ["0", "01", "1", "2"]], "6": ["\u83ca\u5730 \u771f", ["0", "01", "1", "11", "2"]], "7": ["\u6c34\u702c \u4f0a\u7e54", ["0", "01", "1", "11", "2"]], "8": ["\u56db\u6761 \u8cb4\u97f3", ["0", "01", "1", "2"]], "9": ["\u79cb\u6708 \u5f8b\u5b50", ["0", "01", "1", "2"]], "10": ["\u4e09\u6d66 \u3042\u305a\u3055", ["0", "01", "1", "2"]], "11": ["\u53cc\u6d77 \u4e9c\u7f8e", ["0", "01", "1", "2"]], "12": ["\u53cc\u6d77 \u771f\u7f8e", ["0", "01", "1", "2"]], "13": ["\u6211\u90a3\u8987 \u97ff", ["0", "01", "1", "2"]], "14": ["\u6625\u65e5 \u672a\u6765", ["0", "00", "01", "1", "10", "11", "12", "2"]], "15": ["\u6700\u4e0a \u9759\u9999", ["0", "00", "01", "1", "10", "12", "2"]], "16": ["\u4f0a\u5439 \u7ffc", ["0", "00", "01", "1", "10", "12", "2"]], "17": ["\u7530\u4e2d \u7434\u8449", ["0", "00", "01", "1", "2"]], "18": ["\u5cf6\u539f \u30a8\u30ec\u30ca", ["0", "00", "01", "1", "2"]], "19": ["\u4f50\u7af9 \u7f8e\u5948\u5b50", ["0", "00", "01", "1", "10", "2"]], "20": ["\u6240 \u6075\u7f8e", ["0", "00", "01", "1", "2"]], "21": ["\u5fb3\u5ddd \u307e\u3064\u308a", ["0", "00", "01", "1", "2"]], "22": ["\u7bb1\u5d0e \u661f\u68a8\u82b1", ["0", "00", "01", "1", "2"]], "23": ["\u91ce\u3005\u539f \u831c", ["0", "00", "01", "1", "2"]], "24": ["\u671b\u6708 \u674f\u5948", ["0", "00", "01", "1", "11", "2"]], "25": ["\u4f34\u7530 \u8def\u5b50", ["0", "00", "01", "1", "2"]], "26": ["\u4e03\u5c3e \u767e\u5408\u5b50", ["0", "00", "01", "1", "2"]], "27": ["\u9ad8\u5c71 \u7d17\u4ee3\u5b50", ["0", "00", "01", "1", "2"]], "28": ["\u677e\u7530 \u4e9c\u5229\u6c99", ["0", "00", "01", "1", "2"]], "29": ["\u9ad8\u5742 \u6d77\u7f8e", ["0", "00", "01", "1", "2"]], "30": ["\u4e2d\u8c37 \u80b2", ["0", "00", "01", "1", "2"]], "31": ["\u5929\u7a7a\u6a4b \u670b\u82b1", ["0", "00", "01", "1", "2"]], "32": ["\u30a8\u30df\u30ea\u30fc \u30b9\u30c1\u30e5\u30a2\u30fc\u30c8", ["0", "00", "01", "1", "2"]], "33": ["\u5317\u6ca2 \u5fd7\u4fdd", ["0", "00", "01", "1", "2"]], "34": ["\u821e\u6d5c \u6b69", ["0", "00", "01", "1", "11", "2"]], "35": ["\u6728\u4e0b \u3072\u306a\u305f", ["0", "00", "01", "1", "2"]], "36": ["\u77e2\u5439 \u53ef\u5948", ["0", "00", "01", "1", "2"]], "37": ["\u6a2a\u5c71 \u5948\u7dd2", ["0", "00", "01", "1", "2"]], "38": ["\u4e8c\u968e\u5802 \u5343\u9db4", ["0", "00", "01", "1", "2"]], "39": ["\u99ac\u5834 \u3053\u306e\u307f", ["0", "00", "01", "1", "2"]], "40": ["\u5927\u795e \u74b0", ["0", "00", "01", "1", "2"]], "41": ["\u8c4a\u5ddd \u98a8\u82b1", ["0", "00", "01", "1", "2"]], "42": ["\u5bae\u5c3e \u7f8e\u4e5f", ["0", "00", "01", "1", "2"]], "43": ["\u798f\u7530 \u306e\u308a\u5b50", ["0", "00", "01", "1", "2"]], "44": ["\u771f\u58c1 \u745e\u5e0c", ["0", "00", "01", "1", "2"]], "45": ["\u7be0\u5bae \u53ef\u6190", ["0", "00", "01", "1", "2"]], "46": ["\u767e\u702c \u8389\u7dd2", ["0", "00", "01", "1", "2"]], "47": ["\u6c38\u5409 \u6634", ["0", "00", "01", "1", "2"]], "48": ["\u5317\u4e0a \u9e97\u82b1", ["0", "00", "01", "1", "2"]], "49": ["\u5468\u9632 \u6843\u5b50", ["0", "00", "01", "1", "2"]], "50": ["\u30b8\u30e5\u30ea\u30a2", ["0", "00", "01", "1", "2"]], "51": ["\u767d\u77f3 \u7d2c", ["0", "00", "01", "1", "10", "2"]], "52": ["\u685c\u5b88 \u6b4c\u7e54", ["0", "00", "01", "1", "10", "2"]], "53": ["\u97f3\u7121 \u5c0f\u9ce5", []], "54": ["\u9752\u7fbd \u7f8e\u54b2", []], "55": ["\u8a69\u82b1", ["01", "02"]], "56": ["\u73b2\u97f3", ["01", "02"]]};
        
        var n = Math.floor(Math.random() * show_list.length + 1)-1; 
        // consolog(show_list[n]);
        idolid = show_list[n]+1;
        // consolog(info[idolid]);
        height = 80;
        picid = Math.floor((Math.random()*info[idolid][1].length));
        
        picid = info[idolid][1][picid]
        // consolog(picid);
        // 2nd tests
        // picid = "2";
        if (picid == "00") {
            height = 90;
        }


        // 获取showflag，position，注入元素
        chrome.runtime.sendMessage({show:"what", position:"what"},function (response) {
            show_flag = response.show;
            position = response.position;
            // consolog('show_flag response:',response.show);
            // consolog("position =", response.position);
            // img_url = "https://tmn07.com/load/" + idolid + "-" + picid + ".png";
            // consolog(img_url);
            if(show_flag){
                display_val = 'block';
            }
            else{
                display_val = "none"
            }
            //Code for displaying /images/myimage.png:
            var img_url = chrome.extension.getURL("data/"+ idolid + "-" + picid + ".png");

            consolog(img_url);
            // <audio id='myaudio'src='http://tmn07.com/ho-test.mp3' hidden='true'></audio>\
            
            $('<img/>').attr('src', img_url).load(function() {

                $(this).remove(); // prevent memory leaks as @benweet suggested
                if (picid=="2"){
                    gif = idolid + "-" + picid + ".gif"
                    gif_url = chrome.extension.getURL("data_gif/" + idolid + "-" + picid + ".gif")
                    $('<img/>').attr('src', gif_url).load(function(){
                        $(this).remove();
                    });
                }

                // <audio id='myaudio' src='"+audio_url+"' hidden='true'></audio>\

                $("body").append("<div id='hime07' style='background-repeat:no-repeat;\
                            background-size:100% 100%;-moz-background-size:100% 100%;\
                            display: "+display_val+";position: fixed;"+position+"height:\
                            "+ height +"px; width: 80px; z-index: 9999999999'> \
                            </div>");

                $("#hime07").css('background-image', "url('"+img_url+"')");
                $("#hime07").dblclick(function(){
                    $(this).css("display",'none');
                    chrome.runtime.sendMessage({show:false},function (response) {
                        consolog('content get response:',response);
                    });
                })
                var moving = false;
                var hime = document.getElementById("hime07");
                hime.addEventListener("mousedown", initialClick, false);
                hime.addEventListener("mouseup", stopmove, false);
                hime.addEventListener("touchstart", initialClick_T, false);
                hime.addEventListener("touchend", stopmove_T, false);

                // consolog(data.ho_method);
                
                // consolog(data.ho_btn);
                // consolog(data.ho_range);
                // consolog(idolid);
                if (data.ho_btn == "1" && (data.ho_range == '0' || (data.ho_range == '1' && idolid==21))) {
                    // audios selections
                    var ho_audio_filename = ["ho.ogg","ho_.ogg","hiho.ogg","wonderho.ogg","kuluri.ogg","waa.ogg","hehen.ogg","hemn.ogg","lumilumi.ogg","nanodesu.ogg","nanodesu.ogg","morning.ogg","matsuri.ogg"];

                    var rand = data.ho_audio[Math.floor(Math.random() * data.ho_audio.length)];
                    var audio_url = chrome.extension.getURL("audio/"+ho_audio_filename[rand-1]);
                    $("body").append("<audio id='myaudio' src='"+audio_url+"' hidden='true'></audio>")
                    
                    function ho(e) {
                        // var rand = ho_audio_filename[Math.floor(Math.random() * ho_audio_filename.length)];
                        // var audio_url = chrome.extension.getURL("audio/"+rand);
                        // $("body").prepend("<audio id='myaudio' src='"+audio_url+"' hidden='true'></audio>")
                        
                        p = Math.random();
                        if (p<ho_probs[data.ho_prob-1]) {
                            document.getElementById('myaudio').play();
                        }
                    }

                    if (inArray('1', data.ho_method)) {
                        // 单击
                        hime.addEventListener('mousedown', ho);
                    }
                    if (inArray('2', data.ho_method)) {
                        // 拖动结束
                        hime.addEventListener("mouseup", ho);
                    }
                    if (inArray('4', data.ho_method)) {
                        // 双击 （单击存在的情况下 双击无法体现）
                        hime.addEventListener('dblclick', ho);
                    }
                }                



            });


            var ori_img = ""

            // touch move event
            function initialClick_T(e) {
                image = this;
                if (picid=="2")
                {
                    gif_url = chrome.extension.getURL("data_gif/" + idolid + "-" + picid + ".gif")
                    $(this).css("background-image","url("+gif_url+")");
                }
                document.addEventListener("touchmove", move_T, false);
            }
            function move_T(e){
                // consolog(e)
                var touch = e.touches[0];
                var newX = touch.clientX -40;
                var newY = touch.clientY -60;
                image.style.left = newX + "px";
                image.style.top = newY + "px";
                // consolog(newX, newY)
            }
            function stopmove_T(e){
                // consolog(e)
                var touch = e.changedTouches[0];
                var newX = touch.clientX;
                var newY = touch.clientY;
                // consolog(newX, newY)
                document.removeEventListener("touchmove", move_T);
                if (picid=="2")
                {
                    $(this).css("background-image", ori_img);
                }
                chrome.runtime.sendMessage(
                    {position:'set', X:newX, Y:newY},
                    function (response) {
                        consolog('content get response:',response);
                        ;
                    }
                );
            }
            // mouse click move event
            function stopmove(e){
                // consolog(e.clientX, e.clientY)
                // consolog('up');
                document.removeEventListener("mousemove", move);
                if (picid=="2")
                {
                    $(this).css("background-image", ori_img);
                }
                chrome.runtime.sendMessage(
                    {position:'set', X:e.clientX, Y:e.clientY},
                    function (response) {
                        consolog('content get response:',response);
                        ;
                    }
                );
            }

            function move(e){
                var newX = e.clientX -40;
                var newY = e.clientY -60;
                image.style.left = newX + "px";
                image.style.top = newY + "px";
                // consolog(newX, newY)
            }

            function initialClick(e) {
                image = this;
                // consolog(image);
                ori_img = $(this).css("background-image")
                // consolog(idolid);
                if (picid=="2")
                {
                    gif_url = chrome.extension.getURL("data_gif/" + idolid + "-" + picid + ".gif")
                    $(this).css("background-image","url("+gif_url+")");
                }
                document.addEventListener("mousemove", move, false);
            }
            
        });
    })

})
