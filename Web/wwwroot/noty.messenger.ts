/// <reference path="typings/index.d.ts"/>

class NotyTypes {
    static alert: string = "alert";
    static success: string = "success";
    static error: string = "error";
    static warning: string = "warning";
    static information: string = "information";
    static confirmation: string = "confirmation";
};

interface IDictionaryItem<TK, TV> {
    0: TK,
    1: TV,
};

class AppCoreData {
    private static instance: AppCoreData; //Assign "new Singleton()" here to avoid lazy initialisation

    constructor() {
        if (Help.isNullOrUndef(AppCoreData.instance)) {
            //console.log(`Creating singleton`);
            this.member = 0;
            this.keysVsNotys = [];
            AppCoreData.instance = this;
        }
        return AppCoreData.instance;
    }

    member!: number;
    keysVsNotys!: IDictionaryItem<string, Noty>[];

    static closeMessage(key: string) {
        console.log(`closing ${key}`);
        let data = new AppCoreData();
        let existingMsg: Noty = data.keysVsNotys[key];
        existingMsg.close();
    }

    static showMessage(type: string,
        msg: string,
        buttonsArray?: Noty.Button[],
        key?: string,
        killer = false,
        modal = false,
        fancy = true,
        timeout: false | number | undefined = Help.defaultMessageTimeout): Noty {

        let closeWith: any = ['click'];
        if (modal) {
            timeout = false;
            closeWith = [];
        }

        let animation: any | undefined = undefined; //Noty defaults

        if (killer) {
            animation = {
                open: null,
                close: null,
            }
        } else {
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

        let data = new AppCoreData();
        var callback: any = {};
        var msgNoty: Noty;

        if (Help.isString(key)) {

            let existingMsg: Noty = data.keysVsNotys[key];
            if (!Help.isNullOrUndef(existingMsg)) {
                existingMsg.close();
            } else {
                //console.log(`NO ${key} found`);
            }

            callback.onShow = () => {
                // console.log(`${key} onShow`);
                let existingMsg: Noty = data.keysVsNotys[key];
                if (!Help.isNullOrUndef(existingMsg)) {
                    existingMsg.close();
                } else {
                    // console.log(`NO ${key} found`);
                }
                console.log(`saving ${key}`);
                data.keysVsNotys[key] = msgNoty;
            };
            callback.afterShow = () => {
                // console.log(`${key} afterShow`);
                data.keysVsNotys[key] = msgNoty;
                if (!Help.isNullOrUndef(buttonsArray)) {
                    $("#button-0").focus();
                }
            };
            callback.onClose = () => {
                //  console.log(`${key} onClose`);
                data.keysVsNotys[key] = null;
            };
        } else {
            //  console.log(`no key`);
            callback = {
                afterShow: function() {
                    //console.log(`after show party`);
                    if (!Help.isNullOrUndef(buttonsArray)) {
                        //console.log(`btn array`);
                        $("#button-0").focus();
                    }
                }
            };
        }

        let typeString: Noty.Type = NotyTypes[type];
      
        msgNoty = new Noty(
            {
                theme: 'metroui',
                layout: 'bottom',
                type: typeString,
                text: msg,
                timeout: timeout, 
                animation: animation as Noty.IAnimationBcs,
                buttons: buttonsArray,
                callbacks: callback as Noty.ICallbacksBcs,
                killer: killer,
                modal: modal,
                closeWith: closeWith
            });
        msgNoty.show();
        return msgNoty;
    }
}