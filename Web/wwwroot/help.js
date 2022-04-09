var $ = $ || []; //"lazy" but pragmatic fix to not being bothered with webpack nmp and and .d.ts files but still wanting to use jQuery in our ts 
var Settings = /** @class */ (function () {
    function Settings() {
    }
    //static apiUrl: string = "http://staging.api.frontline.live/data";
    Settings.apiUrl = "/map";
    //static apiUrl: string = "http://x.front/map";
    Settings.needsUrl = "https://frontlinehelp.api.ushahidi.io/api/v3/posts/?form=6";
    Settings.suppliesUrl = "https://frontlinehelp.api.ushahidi.io/api/v3/posts/?form=2";
    Settings.debugMode = true;
    Settings.tweetsLimit = 4;
    Settings.mapZoomDefault = 5; //smaller = more zoomed
    Settings.mapDefaultLat = 54.606039;
    Settings.mapDefaultLng = -1.537400;
    Settings.needsColor = "#A51A1A";
    Settings.needsMetColor = "#007FFF";
    Settings.suppliesColor = "#00966B";
    Settings.freeMapMode = false;
    return Settings;
}());
var Images = /** @class */ (function () {
    function Images() {
    }
    Images.mapNeed = "";
    return Images;
}());
var ChartHelp = /** @class */ (function () {
    function ChartHelp() {
    }
    ChartHelp.tootlTipLabelForPie = function (tooltipItem, data) {
        var percentage = ChartHelp.getPercentage(tooltipItem, data);
        var label = data.labels[tooltipItem.index].trim();
        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        if (label === "Partial") {
            label = "Partially Met";
        }
        return " " + label + " Needs Posts " + value + " (" + percentage + "%)";
    };
    ;
    ChartHelp.getPercentage = function (tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex]; //get the concerned dataset
        var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
        });
        var currentValue = dataset.data[tooltipItem.index]; //get the current items value
        var percentage = Math.floor(((currentValue / total) * 100) + 0.5); //calculate the percentage based on the total and current item, also this does a rough rounding to give a whole number
        return percentage;
    };
    ChartHelp.chartColors = {
        red: 'rgb(255, 99, 132)',
        red1: '#F88597',
        red2: '#B10621',
        red3: '#770013',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: '#4BC0C0',
        green1: '#75AF96',
        green2: '#499272',
        green3: '#0F5738',
        green4: '#003A21',
        blue: 'rgb(54, 162, 235)',
        blue1: '#80A9E6',
        blue2: '#0A47A2',
        blue3: '#08165E',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };
    return ChartHelp;
}());
var Help = /** @class */ (function () {
    function Help() {
    }
    Help.setupBackendApp = function () {
        $(document).ready(function () {
            Help.setupEarlyErrors();
            Help.iconiseServerModelErrors();
            Help.scrollToValSummary();
        });
    };
    Help.showMessagesJson = function (msgsJson) {
        if (!Help.isNullOrUndef(msgsJson)) {
            var countMsgsShown = 1;
            var notyTypes = Object.keys(msgsJson);
            for (var i = 0; i < notyTypes.length; i++) {
                var notyType = NotyTypes[notyTypes[i]]; // ensures is in the enum here
                var messagesForType = msgsJson[notyType];
                for (var j = 0; j < messagesForType.length; j++) {
                    Help.showMessageWithDelay(countMsgsShown, notyType, messagesForType[j]);
                    countMsgsShown++;
                }
            }
        }
    };
    Help.showMessage = function (type, msg, buttonsArray, key, killer, modal, fancy, timeout) {
        if (killer === void 0) { killer = false; }
        if (modal === void 0) { modal = false; }
        if (fancy === void 0) { fancy = true; }
        if (timeout === void 0) { timeout = undefined; }
        return AppCoreData.showMessage(type, msg, buttonsArray, key, killer, modal, fancy, timeout);
    };
    Help.showMessageWithDelay = function (count, type, msg) {
        (function (count, type, msg) {
            setTimeout(function () {
                Help.showMessage(type, msg);
            }, count * 500);
        }(count, type, msg));
    };
    Help.setupEarlyErrors = function () {
        window.onerror = Help.handleErrors;
    };
    Help.log = function (msg) {
        if (Settings.debugMode) {
            console.log(msg);
        }
    };
    Help.handleErrors = function (error, url, line) {
        var msgDetail = error + " LINE : " + line + " URL : " + url;
        console.log("Error Caught : " + msgDetail);
        if (Settings.debugMode) {
            alert(msgDetail);
        }
    };
    Help.iconiseServerModelErrors = function () {
        $('.field-validation-error').each(function () {
            var ttipClassesForIcon = "tooltip tooltip-effect-1";
            var container = $(this);
            var errorMsg = container.html();
            container.addClass(ttipClassesForIcon);
            container.html("<i class=\"fa fa-exclamation-circle\"></i><span class=\"tooltip-content\"><i class=\"main-icon fa fa-exclamation-circle\"></i>" + errorMsg + "</span>");
        });
        $("body").addClass("loaded"); //ensures no FOUC from .field-validation-error messing with layout
    };
    Help.scrollToValSummary = function () {
        var valSummaries = $('.validation-summary-errors');
        if (valSummaries !== undefined && valSummaries !== 'undefined' && valSummaries.length > 0) {
            console.log("scrolling to errors");
            var valSummary = valSummaries.first();
            var scrollPos = valSummary.offset().top;
            $(window).scrollTop(scrollPos);
        }
    };
    Help.numberedLabel = function (l, n) {
        return l + " <i>" + n + "</i>";
    };
    Help.coloredNumberedLabel = function (l, n, c) {
        return "<span class=\"" + c + "\"></span>" + l + " <i>" + n + "</i>";
    };
    Help.labelledTag = function (l, s, t, c) {
        if (c === void 0) { c = ""; }
        return Help.isGoodString(s) ? "<span class=\"label " + c + "\">" + l + "</span>" + Help.htmlTag(s, t) : "";
    };
    Help.labelledList = function (l, s) {
        var str = Help.htmlList(s);
        return Help.isGoodString(str) ? "<span class=\"label\">" + l + "</span>" + str : "";
    };
    Help.htmlTag = function (s, t, as) {
        if (as === void 0) { as = ""; }
        return Help.isGoodString(s) ? "<" + t + " " + as + ">" + s + "</" + t + ">" : "";
    };
    Help.htmlList = function (s) {
        var respVal = "";
        if (!Help.isNullOrUndef(s) && s.length > 0) {
            respVal = "<ul>";
            s.forEach(function (v) { return respVal += "<li>" + v + "</li>"; });
            respVal += "</ul>";
        }
        return respVal;
    };
    Help.isGoodString = function (s) {
        return !Help.isNullOrEmpty(s) && Help.isString(s);
    };
    Help.isNumber = function (n) {
        return typeof n === "number";
    };
    Help.isString = function (n) {
        return typeof n === "string";
    };
    Help.isNullOrUndef = function (val) {
        return val === undefined || val === null;
    };
    Help.isNullOrEmpty = function (val) {
        return Help.isNullOrUndef(val) || val === '' || val === 'null' || val === 'undefined';
    };
    Help.getProp = function (key, obj, defaultVal) {
        if (defaultVal === void 0) { defaultVal = null; }
        return Help.hasProp(key, obj) ? obj[key] : defaultVal;
    };
    Help.tryGetProp = function (key, obj, result) {
        var respVal = false;
        if (Help.hasProp(key, obj)) {
            result.value = Help.getProp(key, obj);
            respVal = true;
        }
        return respVal;
    };
    Help.hasProp = function (key, obj) {
        return (key in obj);
    };
    Help.getItem = function (ary, i, defaultVal) {
        if (defaultVal === void 0) { defaultVal = null; }
        return !Help.isNullOrUndef(ary) ? ary[i] : defaultVal;
    };
    Help.hasIndex = function (arr, i) {
        return (arr[i] != null);
    };
    Help.contains = function (arr, item) {
        if (Array.isArray(arr)) {
            return arr.indexOf(item) > -1;
            ;
        }
        return false;
    };
    Help.hasClass = function (element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    };
    Help.objectsEqualByValue = function (obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    };
    Help.deepCloneObject = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    Help.isValidDate = function (val) {
        var respVal = false;
        if (Object.prototype.toString.call(val) === "[object Date]") {
            if (!isNaN(val.getTime())) {
                respVal = true;
            }
        }
        return respVal;
    };
    Help.defaultMessageTimeout = 6500;
    return Help;
}());
var TryGetResult = /** @class */ (function () {
    function TryGetResult() {
        this.value = null;
    }
    return TryGetResult;
}());
//# sourceMappingURL=help.js.map