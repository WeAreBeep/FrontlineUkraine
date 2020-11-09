/// <reference path="typings/index.d.ts"/>
var NotyTypes = /** @class */ (function () {
    function NotyTypes() {
    }
    NotyTypes.alert = "alert";
    NotyTypes.success = "success";
    NotyTypes.error = "error";
    NotyTypes.warning = "warning";
    NotyTypes.information = "information";
    NotyTypes.confirmation = "confirmation";
    return NotyTypes;
}());
;
;
var AppCoreData = /** @class */ (function () {
    function AppCoreData() {
        if (Help.isNullOrUndef(AppCoreData.instance)) {
            //console.log(`Creating singleton`);
            this.member = 0;
            this.keysVsNotys = [];
            AppCoreData.instance = this;
        }
        return AppCoreData.instance;
    }
    AppCoreData.closeMessage = function (key) {
        console.log("closing " + key);
        var data = new AppCoreData();
        var existingMsg = data.keysVsNotys[key];
        existingMsg.close();
    };
    AppCoreData.showMessage = function (type, msg, buttonsArray, key, killer, modal, fancy, timeout) {
        if (killer === void 0) { killer = false; }
        if (modal === void 0) { modal = false; }
        if (fancy === void 0) { fancy = true; }
        if (timeout === void 0) { timeout = Help.defaultMessageTimeout; }
        var closeWith = ['click'];
        if (modal) {
            timeout = false;
            closeWith = [];
        }
        var animation = undefined; //Noty defaults
        if (killer) {
            animation = {
                open: null,
                close: null,
            };
        }
        else {
            if (fancy) { //looks better - but leads to lag which means focus is delayed, and can duplicate the msgs. 
                animation = {
                    open: 'animated flipInX',
                    close: 'animated flipOutX',
                };
            }
        }
        if (animation === undefined) {
            animation = {
                open: 'noty_effects_open',
                close: 'noty_effects_close'
            };
        }
        var data = new AppCoreData();
        var callback = {};
        var msgNoty;
        if (Help.isString(key)) {
            var existingMsg = data.keysVsNotys[key];
            if (!Help.isNullOrUndef(existingMsg)) {
                existingMsg.close();
            }
            else {
                //console.log(`NO ${key} found`);
            }
            callback.onShow = function () {
                // console.log(`${key} onShow`);
                var existingMsg = data.keysVsNotys[key];
                if (!Help.isNullOrUndef(existingMsg)) {
                    existingMsg.close();
                }
                else {
                    // console.log(`NO ${key} found`);
                }
                console.log("saving " + key);
                data.keysVsNotys[key] = msgNoty;
            };
            callback.afterShow = function () {
                // console.log(`${key} afterShow`);
                data.keysVsNotys[key] = msgNoty;
                if (!Help.isNullOrUndef(buttonsArray)) {
                    $("#button-0").focus();
                }
            };
            callback.onClose = function () {
                //  console.log(`${key} onClose`);
                data.keysVsNotys[key] = null;
            };
        }
        else {
            //  console.log(`no key`);
            callback = {
                afterShow: function () {
                    //console.log(`after show party`);
                    if (!Help.isNullOrUndef(buttonsArray)) {
                        //console.log(`btn array`);
                        $("#button-0").focus();
                    }
                }
            };
        }
        var typeString = NotyTypes[type];
        msgNoty = new Noty({
            theme: 'metroui',
            layout: 'bottom',
            type: typeString,
            text: msg,
            timeout: timeout,
            animation: animation,
            buttons: buttonsArray,
            callbacks: callback,
            killer: killer,
            modal: modal,
            closeWith: closeWith
        });
        msgNoty.show();
        return msgNoty;
    };
    return AppCoreData;
}());
//# sourceMappingURL=noty.messenger.js.map