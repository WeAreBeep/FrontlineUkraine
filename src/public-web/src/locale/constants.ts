import { Locale, Messages } from './type';
import en from './messages/en';
import uk from './messages/uk';

export const MESSAGE_MAP: {[k in Locale]: Messages} = {
  [Locale.En]: en,
  [Locale.Uk]: uk,
}
