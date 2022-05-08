import { TranslationContextValue } from '../locale/LocaleProvider';

export const VALIDATION_MSG = {
  required: (
    renderToString: TranslationContextValue['renderToString']
  ): string => renderToString('common_required_field_error'),
  what3wordsPattern: (
    renderToString: TranslationContextValue['renderToString']
  ): string => renderToString('common_what_3_words_address_pattern_error'),
  USREOUPattern: (
    renderToString: TranslationContextValue['renderToString']
  ): string => renderToString('common_usreou_code_pattern_error'),
};
