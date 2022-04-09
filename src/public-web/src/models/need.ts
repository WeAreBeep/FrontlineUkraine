import { Nullable } from '../utils/nullable';
import { NeedPpeType } from './ppeType';

/*
{
    "id": 1234,
    "datetime": "2020-04-14T16:19:45+00:00",
    "postcode": "POST_CODE",
    "latitude": 55.6789,
    "longitude": -1.2345,
    "organisation": "Example",
    "tweetId": null,
    "ppeTypes": [
        {
            "status": 3,
            "ppeType": 3,
            "ppeTypeOther": null
        },
        {
            "status": 3,
            "ppeType": 12,
            "ppeTypeOther": "Long sleeve aprons"
        }
    ]
}
*/
export interface Need {
  id: number;
  datetime: string;
  postcode: string;
  latitude: number;
  longitude: string;
  organisation: string;
  tweetId: Nullable<string>;
  ppeTypes: NeedPpeType[];
}
