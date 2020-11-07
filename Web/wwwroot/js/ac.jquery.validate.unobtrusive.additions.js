$(function () {
    // Replace the builtin US date validation with UK date validation
    //cref:https://stackoverflow.com/questions/18482230/uncaught-rangeerror-invalid-language-tag-on-chrome
    $.validator.addMethod(
        "date",
        function (value, element) {
            var bits = value.match(/([0-9]+)/gi), str;
            if (!bits)
                return this.optional(element) || false;
            str = bits[1] + '/' + bits[0] + '/' + bits[2];
            return this.optional(element) || !/Invalid|NaN/.test(new Date(str));
        },
        ""
    );
});

$(['requiredif', 'regularexpressionif', 'rangeif']).each(function (index, validationName) {
    //adds conditional validators 
    //cref:https://forums.asp.net/t/1924941.aspx?Conditional+Validation+using+DataAnnotation
    $.validator.addMethod(validationName,
        function (value, element, parameters) {
            // Get the name prefix for the target control, depending on the validated control name
            var prefix = "";
            var lastDot = element.name.lastIndexOf('.');
            if (lastDot != -1) {
                prefix = element.name.substring(0, lastDot + 1).replace('.', '_');
            }
            var id = '#' + prefix + parameters['dependentproperty'];
            // get the target value
            var targetvalue = parameters['targetvalue'];
            targetvalue = (targetvalue == null ? '' : targetvalue).toString();
            // get the actual value of the target control
            var control = $(id);
            if (control.length == 0 && prefix.length > 0) {
                // Target control not found, try without the prefix
                control = $('#' + parameters['dependentproperty']);
            }
            if (control.length > 0) {
                var controltype = control.attr('type');
                var actualvalue = "";
                switch (controltype) {
                    case 'checkbox':
                       //BCS changed on 2019-05-13 as was failing with chb on SaAdminEdit actualvalue = control.attr('checked').toString(); break;
                       //cref:https://stackoverflow.com/questions/6528156/jquery-attr-method-returns-undefined-for-a-checked-checkbox
                        actualvalue = control.is(':checked').toString(); break;
                    case 'radio': //BCS added on 2019-05-14 as was failing with rbs on SaAdminEdit 
                        var rbName = control.attr('name');
                        var selector = "input[name='"+ rbName + "']:checked"; //IE fix `input[name='${rbName}']:checked`;
                        if ($(selector).length > 0) {
                            actualvalue = $(selector).val();
                        }
                        break;
                    case 'select':
                        actualvalue = $('option:selected', control).text(); break;
                    default:
                        actualvalue = control.val(); break;
                }
                // if the condition is true, reuse the existing validator functionality
                if (targetvalue.toLowerCase() === actualvalue.toLowerCase()) {
                    var rule = parameters['rule'];
                    var ruleparam = parameters['ruleparam'];
                    return $.validator.methods[rule].call(this, value, element, ruleparam);
                }
            }
            return true;
        }
    );

    $.validator.unobtrusive.adapters.add(validationName, ['dependentproperty', 'targetvalue', 'rule', 'ruleparam'], function (options) {
        var rp = options.params['ruleparam'];
        options.rules[validationName] = {
            dependentproperty: options.params['dependentproperty'],
            targetvalue: options.params['targetvalue'],
            rule: options.params['rule']
        };
        if (rp) {
            options.rules[validationName].ruleparam = rp.charAt(0) == '[' ? eval(rp) : rp;
        }
        options.messages[validationName] = options.message;
    });
});