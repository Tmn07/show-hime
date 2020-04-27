var name_lists = {"0": "\u5929\u6d77 \u6625\u9999", "1": "\u5982\u6708 \u5343\u65e9", "2": "\u661f\u4e95 \u7f8e\u5e0c", "3": "\u8429\u539f \u96ea\u6b69", "4": "\u9ad8\u69fb \u3084\u3088\u3044", "5": "\u83ca\u5730 \u771f", "6": "\u6c34\u702c \u4f0a\u7e54", "7": "\u56db\u6761 \u8cb4\u97f3", "8": "\u79cb\u6708 \u5f8b\u5b50", "9": "\u4e09\u6d66 \u3042\u305a\u3055", "10": "\u53cc\u6d77 \u4e9c\u7f8e", "11": "\u53cc\u6d77 \u771f\u7f8e", "12": "\u6211\u90a3\u8987 \u97ff", "13": "\u6625\u65e5 \u672a\u6765", "14": "\u6700\u4e0a \u9759\u9999", "15": "\u4f0a\u5439 \u7ffc", "16": "\u7530\u4e2d \u7434\u8449", "17": "\u5cf6\u539f \u30a8\u30ec\u30ca", "18": "\u4f50\u7af9 \u7f8e\u5948\u5b50", "19": "\u6240 \u6075\u7f8e", "20": "\u5fb3\u5ddd \u307e\u3064\u308a", "21": "\u7bb1\u5d0e \u661f\u68a8\u82b1", "22": "\u91ce\u3005\u539f \u831c", "23": "\u671b\u6708 \u674f\u5948", "24": "\u4f34\u7530 \u8def\u5b50", "25": "\u4e03\u5c3e \u767e\u5408\u5b50", "26": "\u9ad8\u5c71 \u7d17\u4ee3\u5b50", "27": "\u677e\u7530 \u4e9c\u5229\u6c99", "28": "\u9ad8\u5742 \u6d77\u7f8e", "29": "\u4e2d\u8c37 \u80b2", "30": "\u5929\u7a7a\u6a4b \u670b\u82b1", "31": "\u30a8\u30df\u30ea\u30fc", "32": "\u5317\u6ca2 \u5fd7\u4fdd", "33": "\u821e\u6d5c \u6b69", "34": "\u6728\u4e0b \u3072\u306a\u305f", "35": "\u77e2\u5439 \u53ef\u5948", "36": "\u6a2a\u5c71 \u5948\u7dd2", "37": "\u4e8c\u968e\u5802 \u5343\u9db4", "38": "\u99ac\u5834 \u3053\u306e\u307f", "39": "\u5927\u795e \u74b0", "40": "\u8c4a\u5ddd \u98a8\u82b1", "41": "\u5bae\u5c3e \u7f8e\u4e5f", "42": "\u798f\u7530 \u306e\u308a\u5b50", "43": "\u771f\u58c1 \u745e\u5e0c", "44": "\u7be0\u5bae \u53ef\u6190", "45": "\u767e\u702c \u8389\u7dd2", "46": "\u6c38\u5409 \u6634", "47": "\u5317\u4e0a \u9e97\u82b1", "48": "\u5468\u9632 \u6843\u5b50", "49": "\u30b8\u30e5\u30ea\u30a2", "50": "\u767d\u77f3 \u7d2c", "51": "\u685c\u5b88 \u6b4c\u7e54", "54": "\u8a69\u82b1", "55": "\u73b2\u97f3"};

var form = $("#main");
function checkbox_init(val, name, check_status=false){
    // old = '<label><img style="height:80px;" src="../data/'+(parseInt(val)+1)+'-0.png">\
    //     <input class="idol pure-checkbox" type="checkbox" \
    //     name="idol" value="'+val+'" >'+name+'</label>';

    var test = '<div class="hvr-grow">\
            <label>\
                <div class="icon_img" style=" \
                background-image: url(../data/'+(parseInt(val)+1)+'-01.png);">\
                </div>\
                <br>\
                <input class="idol" iid="'+ val +'" type="checkbox" name="idol">'+name+'\
            </label>\
        </div>';

    return test;
}
// i18n
finish_msg = "保存成功";
if (chrome.i18n.getUILanguage()!="zh_CN") {
    $('title')[0].innerText = chrome.i18n.getMessage("optionPageTitle");
    $('h1').text(chrome.i18n.getMessage("optionHead1"))
    $("#ho_btn").text(chrome.i18n.getMessage("hoHead1"))
    $('#save_btn').text(chrome.i18n.getMessage("optionButtonSave"))
    $('#all_btn').text(chrome.i18n.getMessage("optionButtonAll"))
    $('#clr_btn').text(chrome.i18n.getMessage("optionButtonClr"))
    finish_msg = chrome.i18n.getMessage("finishMsg");
}



chrome.storage.local.get({list:[]}, function(data){
    var show_list = data.list;
    // console.log(show_list)
    for (var i in name_lists) {
        form.append(checkbox_init(i, name_lists[i]));
    }
    // 如何优雅的添加checked checkbox?
    for (var i in show_list){
        if (show_list[i]==54) {
            $("input.idol")[52].click();
        }
        else if(show_list[i]==55){
            $("input.idol")[53].click();
        }
        else{
            $("input.idol")[show_list[i]].click();
        }
    }
    
})

$("#save_btn").click(function(){
    // console.log("press!!");
    var show_list = [];
    idols = $("input.idol");
    lens = $("input.idol").length
    for (var idolid=0; idolid<lens; idolid++){
        if (idols[idolid].checked){
            show_list.push(parseInt($(idols[idolid]).attr('iid')));
        }
    }
    // console.log(show_list);
    chrome.storage.local.set({list: show_list}, function(){
        // console.log('存储完成');
        alert(finish_msg);
    })

})

$("#all_btn").click(function(){
    $("input.idol").each(function(){
        if(this.checked == false)
        {
            $(this).click()
        }
    })
})

$("#clr_btn").click(function(){
    $("input.idol").each(function(){
        if(this.checked == true)
        {
            $(this).click()
        }
    })
})

$("#ho_btn").click(function(){
    window.open('./ho.html','_blank');
})
