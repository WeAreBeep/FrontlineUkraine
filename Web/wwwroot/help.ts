var
    $ = $ || []; //"lazy" but pragmatic fix to not being bothered with webpack nmp and and .d.ts files but still wanting to use jQuery in our ts 


class Settings {
    //static apiUrl: string = "http://staging.api.frontline.live/data";
    static apiUrl: string = "/map";
    //static apiUrl: string = "http://x.front/map";
    static needsUrl: string = "https://frontlinehelp.api.ushahidi.io/api/v3/posts/?form=6";
    static suppliesUrl: string = "https://frontlinehelp.api.ushahidi.io/api/v3/posts/?form=2";
    static debugMode: boolean = true;
    static tweetsLimit: number = 4;
    static mapZoomDefault: number = 5; //smaller = more zoomed
    static mapDefaultLat: number = 54.606039;
    static mapDefaultLng: number = -1.537400;
    static needsColor: string = "#A51A1A";
    static needsMetColor: string = "#007FFF";
    static suppliesColor: string = "#00966B";
    static freeMapMode: boolean = false;    
}


class Images {
    static mapNeed: string = "";
}

class ChartHelp {
    static chartColors = {
        red: 'rgb(255, 99, 132)',
        red1: '#F88597', //'#F34F69',
        red2: '#B10621',
        red3: '#770013',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: '#4BC0C0', //#277554 'rgb(75, 192, 192)',
        green1: '#75AF96', //http://paletton.com/#uid=13T0u0kvYnil8ywtfuEEDheQH8T
        green2: '#499272',
        green3: '#0F5738',
        green4: '#003A21',
        blue: 'rgb(54, 162, 235)',
        blue1: '#80A9E6', //'4D5DB5',
        blue2: '#0A47A2', //'2237A7',
        blue3: '#08165E',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    static tootlTipLabelForPie(tooltipItem, data) {
        let percentage = ChartHelp.getPercentage(tooltipItem, data);
        let label = data.labels[tooltipItem.index].trim();
        let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        if (label === "Partial") {
            label = "Partially Met";
        }
        return ` ${label} Needs Posts ${value} (${percentage}%)`;
    };

    static getPercentage(tooltipItem: any, data: any) {
        let dataset = data.datasets[tooltipItem.datasetIndex]; //get the concerned dataset
        let total = dataset.data.reduce(
            function(previousValue, currentValue, currentIndex, array) { //calculate the total of this data set
                return previousValue + currentValue;
            });
        let currentValue = dataset.data[tooltipItem.index]; //get the current items value
        let percentage = Math.floor(((currentValue / total) * 100) + 0.5); //calculate the percentage based on the total and current item, also this does a rough rounding to give a whole number
        return percentage;
    }
}

class Help {


    static setupBackendApp() {
        $(document).ready(function() {
            Help.setupEarlyErrors();
            Help.iconiseServerModelErrors();
            Help.scrollToValSummary();
        });
    }

    static showMessagesJson(msgsJson: JSON): void {
        if (!Help.isNullOrUndef(msgsJson)) {
            var countMsgsShown = 1;
            let notyTypes = Object.keys(msgsJson);
            for (var i = 0; i < notyTypes.length; i++) {
                let notyType: string = NotyTypes[notyTypes[i]]; // ensures is in the enum here
                var messagesForType = msgsJson[notyType];
                for (var j = 0; j < messagesForType.length; j++) {
                    Help.showMessageWithDelay(countMsgsShown, notyType, messagesForType[j]);
                    countMsgsShown++;
                }
            }
        }
    }

    static defaultMessageTimeout: number = 6500;

    static showMessage(type: string,
        msg: string,
        buttonsArray?: Noty.Button[],
        key?: string,
        killer = false,
        modal = false,
        fancy = true,
        timeout: false | number | undefined = undefined): Noty {
        return AppCoreData.showMessage(type, msg, buttonsArray, key, killer, modal, fancy, timeout);
    }

    static showMessageWithDelay(count: number, type: string, msg) {
        (function(count: number, type: string, msg: string) {
            setTimeout(function() {
                    Help.showMessage(type, msg);
                },
                count * 500);
        }(count, type, msg));
    }

    static setupEarlyErrors() {
        window.onerror = Help.handleErrors;
    }

    static log(msg) {
        if (Settings.debugMode) {
            console.log(msg);
        }
    }

    static handleErrors(error, url?, line?) {
        var msgDetail = `${error} LINE : ${line} URL : ${url}`;
        console.log("Error Caught : " + msgDetail);
        if (Settings.debugMode) {
            alert(msgDetail);
        }
    }

    static iconiseServerModelErrors() {
        $('.field-validation-error').each(function() {
            var ttipClassesForIcon = "tooltip tooltip-effect-1";
            var container = $(this as any);
            var errorMsg = container.html();
            container.addClass(ttipClassesForIcon);
            container.html(
                `<i class="fa fa-exclamation-circle"></i><span class="tooltip-content"><i class="main-icon fa fa-exclamation-circle"></i>${
                errorMsg}</span>`);
        });

        $("body").addClass("loaded"); //ensures no FOUC from .field-validation-error messing with layout
    }

    static scrollToValSummary() {
        var valSummaries = $('.validation-summary-errors');
        if (valSummaries !== undefined && valSummaries !== 'undefined' && valSummaries.length > 0) {
            console.log("scrolling to errors");
            var valSummary = valSummaries.first();
            var scrollPos = valSummary.offset().top;
            $(window).scrollTop(scrollPos);
        }
    }

    static numberedLabel(l: string, n: number) {
        return `${l} <i>${n}</i>`;
    }

    static coloredNumberedLabel(l: string, n: number, c: string) {
        return `<span class="${c}"></span>${l} <i>${n}</i>`;
    }

    static labelledTag(l: string, s: any, t: string, c: string = "") {
        return Help.isGoodString(s) ? `<span class="label ${c}">${l}</span>${Help.htmlTag(s, t)}` : "";
    }

    static labelledList(l: string, s: any) {
        var str = Help.htmlList(s);
        return Help.isGoodString(str) ? `<span class="label">${l}</span>${str}` : "";
    }

    static htmlTag(s: any, t: string, as: string = "") {
        return Help.isGoodString(s) ? `<${t} ${as}>${s}</${t}>` : "";
    }

    static htmlList(s: any) {
        var respVal = "";
        if (!Help.isNullOrUndef(s) && s.length > 0) {
            respVal = "<ul>";
            s.forEach(v => respVal += `<li>${v}</li>`);
            respVal += "</ul>";
        }
        return respVal;
    }

    static isGoodString(s: any) {
        return !Help.isNullOrEmpty(s) && Help.isString(s);
    }

    static isNumber(n: any): n is number {
        return typeof n === "number";
    }

    static isString(n: any): n is string {
        return typeof n === "string";
    }

    static isNullOrUndef(val: any): boolean {
        return val === undefined || val === null;
    }

    static isNullOrEmpty(val: any): boolean {
        return Help.isNullOrUndef(val) || val === '' || val === 'null' || val === 'undefined';
    }

    static getProp(key: any, obj: any, defaultVal: any = null) {
        return Help.hasProp(key, obj) ? obj[key] : defaultVal;
    }

    static tryGetProp<T>(key: any, obj: any, result: TryGetResult<T>): boolean {
        let respVal = false;
        if (Help.hasProp(key, obj)) {
            result.value = Help.getProp(key, obj);
            respVal = true;
        }
        return respVal;
    }

    static hasProp(key: any, obj: any): boolean {
        return (key in obj);
    }

    static getItem<T>(ary: any, i: number, defaultVal: any = null) {
        return !Help.isNullOrUndef(ary) ? ary[i] : defaultVal;
    }

    static hasIndex<T>(arr: Array<T>, i: number): boolean {
        return (arr[i] != null);
    }

    static contains<T>(arr: Array<T>, item: T): boolean {
        if (Array.isArray(arr)) {
            return arr.indexOf(item) > -1;;
        }
        return false;
    }

    static hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    static objectsEqualByValue(obj1, obj2): boolean {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    static deepCloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static isValidDate(val: any) {
        let respVal = false;
        if (Object.prototype.toString.call(val) === "[object Date]") {
            if (!isNaN(val.getTime())) {
                respVal = true;
            }
        }
        return respVal;
    }
}

class TryGetResult<T> {
    value: T | undefined | null;

    constructor() {
        this.value = null;
    }
}