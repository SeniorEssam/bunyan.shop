var genFun = {
    onkeyPress: function (evt, type, obj) {
        var charCode = (evt.which) ? (evt.which) : (evt.keyCode);
        if (charCode == 13) {
            return false;
        }
        else {
            switch (type) {
                case 1:
                    return genFun.isTeleNumber(evt, null);
                    break;
            }
        }
    },
    //#endregion
    // onkeydown
    //#region onkeydown 
    onkeydown: function (evt, type, obj) {
        if (evt.keyCode == 13 || evt.which == 13) {
            return false;
        }
        else {
            switch (type) {
                case 1:
                    return genFun.isTeleNumber(evt, null);
                    break;
            }
        }
    },
    getSitePath: function () {
        return window.location.protocol + "//" + window.location.host;
    },
    // preview clear add/edit form
    //#Region clear Add/Edit form
    prevFile: function (params) {
        var url = genFun.getSitePath() + "/Receipt/Index/" + params + "?t=" + Math.floor(Math.random() * 999999);
        if (!(/mobile/.test(navigator.userAgent.toLowerCase()))) {
            var width = 900;
            var height = 600;
            var left = parseInt((screen.availWidth / 2) - (width / 2));
            var top = parseInt((screen.availHeight / 2) - (height / 2));
            var windowFeatures = "width=" + width + ",height=" + height + ",left=" + left + ",scrollbars=yes,top=" + top + ",screenX=" + left + ",screenY=" + top;
            myWindow = window.open(url, "preview" + Math.floor(Math.random() * 10), windowFeatures);
        }
        else {
            var view_pdf_temp_form = document.createElement("form");
            view_pdf_temp_form.setAttribute("id", "view_pdf_temp_form");
            view_pdf_temp_form.setAttribute("method", "post");
            view_pdf_temp_form.setAttribute("action", url);
            view_pdf_temp_form.setAttribute("target", "_blank");
            var hdn_param = document.createElement("input");
            hdn_param.setAttribute("id", "params");
            hdn_param.setAttribute("name", "params");
            hdn_param.setAttribute("type", "hidden");
            hdn_param.setAttribute("value", params);
            view_pdf_temp_form.appendChild(hdn_param);
            document.body.appendChild(view_pdf_temp_form);
            view_pdf_temp_form.submit();
            document.body.removeChild(document.getElementById('view_pdf_temp_form'));
        }
    },
    //#EndRegion
    // special Character
    //#Region special Character
    specialCharacter: function (e) {
        var evt = ((navigator.appName == "Microsoft Internet Explorer") ? (event) : (e));
        var charCode = (evt.charCode != undefined || evt.charCode != null) ? evt.charCode : evt.keyCode
        var x = String.fromCharCode(charCode);
        var charAry = ["’", "‘", "،", "؟", "?", '=', '+', '!', '@', '#', '$', '%', '^', '&', '*', ')', '(', '_', "'", ">", "<", "{", "}", "[", "]", "|", ":", ";", "÷", "؛", '"', "~", "'", '×']
        if (genFun.contains(charAry, x)) {
            return false;
        }
        return true;
    },
    //#EndRegion
    // special Character for emails
    //#Region special Character for emails
    emailSpecialCharacter: function (e) {
        var evt = ((navigator.appName == "Microsoft Internet Explorer") ? (event) : (e));
        var charCode = (evt.which != undefined || evt.which != null) ? evt.which : evt.keyCode
        var x = String.fromCharCode(charCode);
        var charAry = ["’", "‘", "،", "؟", "?", '=', '+', '!', '#', '$', '%', '^', '&', '*', ')', '(', "'", ">", "<", "{", "}", "[", "]", "|", ":", ";", "÷", "؛", '"', "،", ",", "~", "'", '×']
        if (genFun.contains(charAry, x)) {
            return false;
        }
        return true;
    },
    //#EndRegion
    // special Character for url
    //#Region url Character for emails
    urlSpecialCharacter: function (e) {
        var evt = ((navigator.appName == "Microsoft Internet Explorer") ? (event) : (e));
        var charCode = (evt.which != undefined || evt.which != null) ? evt.which : evt.keyCode
        var x = String.fromCharCode(charCode);
        var charAry = ["’", "‘", "،", "؟", '+', '!', '#', '$', '%', '^', '&', '*', ')', '(', "'", ">", "<", "{", "}", "[", "]", "|", "÷", "؛", '"', "،", ",", "~", "'", '×', "@"];
        if (genFun.contains(charAry, x)) {
            return false;
        }
        return true;
    },
    //#EndRegion
    // special Character for domain user name
    //#Region special Character for domain user name
    domainSpecialCharacter: function (e) {
        var evt = ((navigator.appName == "Microsoft Internet Explorer") ? (event) : (e));
        var charCode = (evt.which != undefined || evt.which != null) ? evt.which : evt.keyCode
        var x = String.fromCharCode(charCode);
        var charAry = ['=', '+', '/', '!', '@', '#', '$', '%', '^', '&', '*', ')', '(', "'", '\\', ']', '[', '|', ';', ':', ',', '<', '>']
        if (genFun.contains(charAry, x)) {
            return false;
        }
        return true;
    },
    //#EndRegion

    // specialCharacter2
    //#Region specialCharacter2
    // without to Character (*, # )
    specialCharacter2: function (e) {
        var evt = ((navigator.appName == "Microsoft Internet Explorer") ? (event) : (e));
        var charCode = (evt.charCode != undefined || evt.charCode != null) ? evt.charCode : evt.keyCode
        var x = String.fromCharCode(charCode);
        var charAry = ["’", "‘", "،", "؟", "?", '=', '+', '!', '@', '$', '%', '^', '&', ')', '(', '_', "'", ">", "<", "{", "}", "[", "]", "|", ":", ";", "÷", "؛", '"', "،", ",", ".", "~", "'", '×']
        if (genFun.contains(charAry, x)) {
            return false;
        }
        return true;
    },
    //#EndRegion
    // numbers only text box
    //#Region numbers only text box
    numbers_only: function (ev, Func) {
        if (Func) {
            if (typeof (Func) == 'function') {
                Func(((document.all) ? (window.event.srcElement) : (ev.currentTarget)));
            }
        }
        var result = true;
        var charCode = (ev.which != undefined || ev.which != null) ? ev.which : event.keyCode;

        result = (charCode == 8 || charCode == 9 || charCode == 46 || (charCode >= 37 && charCode <= 40) || (charCode >= 48 && charCode <= 57) ||
            (charCode >= 96 && charCode <= 105));

        //Control
        var ctrl = typeof ev.modifiers == 'undefined' ? ev.ctrlKey : ev.modifiers & ev.CONTROL_MASK;
        //Char V
        var v = typeof ev.which == 'undefined' ? ev.keyCode == 86 : ev.which == 86;
        //Char Z
        var z = typeof ev.which == 'undefined' ? ev.keyCode == 90 : ev.which == 90;
        //Char X
        var x = typeof ev.which == 'undefined' ? ev.keyCode == 88 : ev.which == 88;
        //Char C
        var c = typeof ev.which == 'undefined' ? ev.keyCode == 86 : ev.which == 86;
        //Char A
        var a = typeof ev.which == 'undefined' ? ev.keyCode == 65 : ev.which == 65;
        // If the control and 'V' keys are pressed at the same time
        if ((ctrl && v) || (ctrl && z) || (ctrl && x) || (ctrl && c) || (ctrl && a)) {
            result = true;
        }
        if (charCode == 46 || charCode == 8) {
            result = true;
        }
        return result;
    },
    //#EndRegion
    // numbers only with Arabic Escape Sequence
    //#Region numbers only with Arabic Escape Sequence
    numbers_only_Arabic_Escape_Sequnse: function (e, func) {
        var evt = ((navigator.appName == "Microsoft Internet Explorer") ? (event) : (e));
        var charCode = (evt.which != undefined || evt.which != null) ? evt.which : evt.keyCode
        var x = String.fromCharCode(charCode);
        var charAry = ['ا', 'أ', 'آ', 'ظ', 'ظ', '!', '@', '#', '$', '%', '^', '&', '*', ')', '(', '_', 'ذ', '\\']
        if (genFun.contains(charAry, x) || evt.shiftKey == true) {
            return false;
        }
        if (func) {
            return func(evt);
        }
        else {
            return true;
        }
    }
    //#EndRegion
    ,
    // on past to pervent special Character
    //#Region on past to pervent special Character
    onPasteR: function (e/*Element*/) {
        var r = ["’", "‘", "،", "؟", "?", '=', '+', '!', '@', '#', '$', '%', '^', '&', '*', ')', '(', '_', "'", ">", "<", "{", "}", "[", "]", "|", ":", ";", "÷", "؛", '"', "،", ",", ".", "~", "'", '×'];
        var vBeforePaste = e.value, lBeforePaste = vBeforePaste.length;
        var inerv =
            setInterval
                (
                    function () {
                        if (e.value != '') {
                            o: for (var i = 0; i < r.length; i++) {
                                if (e.value.indexOf(((typeof (r) == "string") ? (r.charAt(i)) : (r[i]))) != -1) {
                                    e.value = e.value.replaceAll(r[i], '')
                                    continue o;
                                }
                            }
                            clearInterval(inerv);
                        }
                        else {
                            clearInterval(inerv);
                        }
                    }
                    , 0.1);

    }
    ,
    //#EndRegion 
    // on onlyNormalChar to pervent  Numbers and special Character 
    //#Region onlyNormalChar
    onlyNormalChar: function (e/*Event*/) {
        var evt = ((navigator.appName == "Microsoft Internet Explorer") ? (event) : (e));
        var charCode = (evt.which != undefined || evt.which != null) ? evt.which : evt.keyCode
        if (charCode >= 48 && charCode <= 57) {
            return false;
        }
        else {
            return genFun.specialCharacter(evt);
        }

    },
    //#EndRegion 
    // get time in format 24 from time in format 12 ...
    // hhmm : string time value to convert "01:30" / PmOrAm : time status "am / pm"
    //#Region get24TimeFormate
    get24TimeFormate: function (hhmm, PmOrAm) {
        if (PmOrAm == "am" && hhmm.split(':')[0] != "12") {
            return hhmm;
        }
        else if (PmOrAm == "pm" && hhmm.split(':')[0] != "12") {
            var Hs = (parseInt(hhmm.split(':')[0], 10) + 12);
            return ("" + Hs + ":" + hhmm.split(':')[1] + "");
        }
        else if (PmOrAm == "pm" && hhmm.split(':')[0] == "12") {
            return hhmm;
        }
        else if (PmOrAm == "am" && hhmm.split(':')[0] == "12") {
            var Hs = (parseInt(hhmm.split(':')[0], 10) - 12);
            return ("0" + Hs + ":" + hhmm.split(':')[1] + "");
        }
    },
    //#EndRegion
    // get time in format 12 from time in format 24 ...
    //#Region get12TimeFormate
    get12TimeFormate: function (time) {
        var time = time.split(':');
        var timeObj = new Object();
        timeObj.hhmm = "";
        timeObj.PmOrAm = "-1";

        if (time[0] == 00) {
            timeObj.hhmm = "12:" + time[1];
            timeObj.PmOrAm = "am";
        }
        if (time[0] < 12 && time[0] != 00) {
            timeObj.hhmm = time[0] + ":" + time[1];
            timeObj.PmOrAm = "am";
        }
        if (time[0] == 12) {
            timeObj.hhmm = time[0] + ":" + time[1];
            timeObj.PmOrAm = "pm";
        }
        if (time[0] > 12) {
            timeObj.hhmm = (time[0] - 12) + ":" + time[1];
            if (time[0] - 12 < 10)
                timeObj.hhmm = "0" + timeObj.hhmm;
            timeObj.PmOrAm = "pm";
        }
        return timeObj;

    },
    //#EndRegion
    // contains
    //#Region contains
    contains: function (ary, x) {
        var found = false;
        if (ary.length > 0) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] == x) {
                    found = true;
                    break;
                }
            }
        }
        return found;
    },
    //#EndRegion
    // is Number
    //#Region is Number
    isCurrency: function (e, obj) {
        var key = e.charCode || e.keyCode || 0;
        // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
        // home, end, period, and numpad decimal
        if (key == 110 && obj.value.indexOf('.') >= 0) {
            return false;
        }
        return (
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            key == 110 ||
            key == 190 ||
            //(key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105));
    },
    isNumber: function (e, obj) {
        var key = e.charCode || e.keyCode || 0;
        // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
        // home, end, period, and numpad decimal
        return (
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            key == 110 ||
            key == 190 ||
            //(key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105));
    },
    //#EndRegion
    // is Number
    //#Region is Number
    isNumberWithoutDot: function (e) {
        var key = e.charCode || e.keyCode || 0;
        // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
        // home, end, period, and numpad decimal

        return (
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            // key == 110 ||
            key == 190 ||
            //(key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105));
    },
    //#EndRegion
    // is Number
    //#Region is Number
    isTeleNumber: function (e) {
        var key = e.charCode || e.keyCode || 0;
        // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
        // home, end, period, and numpad decimal
        return (
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            key == 107 ||
            key == 43 ||
            key == 61 ||
            key == 190 ||
            //(key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105));
    },
    //#EndRegion
    // get Correct Date Format
    //#Region get Correct Date Format
    getCorrectDateFormat: function (dateTimeStr, mode) {
        if (dateTimeStr != null && dateTimeStr != undefined && dateTimeStr != "") {
            try {
                var dateStr = new Date(dateTimeStr.replace("T", " ").replace(/-/g, "/").split(" ")[0]);
                var yyyy = genFun.pad(dateStr.getFullYear());
                var mm = genFun.pad(dateStr.getMonth() + 1);
                var dd = genFun.pad(dateStr.getDate());
                if (mode == "ar") {
                    return yyyy + "/" + mm + "/" + dd;
                } else {
                    return dd + "/" + mm + "/" + yyyy;
                }
            }
            catch (error) {
                return dateTimeStr;
            }
        }
        return dateTimeStr;
    },
    //#EndRegion
    // pad number to digit
    //#Region pad number to digit
    pad: function (num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
    },
    //#EndRegion
    // numbers only text box
    //#Region numbers only text box
    floatNumbersOnly: function (ev, Func) {
        if (Func) {
            if (typeof (Func) == 'function') {
                Func(((document.all) ? (window.event.srcElement) : (ev.currentTarget)));
            }
        }
        var result = true;
        var charCode = (ev.which != undefined || ev.which != null) ? ev.which : event.keyCode;
        result = (charCode == 8 || charCode == 9 || charCode == 46 || (charCode >= 37 && charCode <= 40) || (charCode >= 48 && charCode <= 57) ||
            (charCode >= 96 && charCode <= 105) || charCode == 190);

        //Control
        var ctrl = typeof ev.modifiers == 'undefined' ? ev.ctrlKey : ev.modifiers & ev.CONTROL_MASK;
        //Char V
        var v = typeof ev.which == 'undefined' ? ev.keyCode == 86 : ev.which == 86;
        //Char Z
        var z = typeof ev.which == 'undefined' ? ev.keyCode == 90 : ev.which == 90;
        //Char X
        var x = typeof ev.which == 'undefined' ? ev.keyCode == 88 : ev.which == 88;
        //Char C
        var c = typeof ev.which == 'undefined' ? ev.keyCode == 86 : ev.which == 86;
        //Char A
        var a = typeof ev.which == 'undefined' ? ev.keyCode == 65 : ev.which == 65;
        // If the control and 'V' keys are pressed at the same time
        if ((ctrl && v) || (ctrl && z) || (ctrl && x) || (ctrl && c) || (ctrl && a)) {
            result = true;
        }
        if (charCode == 46 || charCode == 8) {
            result = true;
        }
        return result;
    }
    //#EndRegion
}
