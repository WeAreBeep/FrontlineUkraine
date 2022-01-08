import { Nullable } from '../utils/nullable';
import { PpeType } from './ppeType';

/*
{
    "id": 1234,
    "datetime": "2020-04-29T12:12:16+00:00",
    "status": 2,
    "postcode": "POST_CODE",
    "latitude": 55.6789,
    "longitude": -1.2345,
    "tweetId": null,
    "ppeTypes": [
        {
            "ppeType": 1,
            "ppeTypeOther": null
        },
        {
            "ppeType": 12,
            "ppeTypeOther": "Fluid resistant coveralls Cat III Type 3-B\nFluid resistant coveralls Cat III Type 5-B\nN95 Masks"
        }
    ],
    "organisation": "Example",
    "description": "Sample description",
    "capacityNotes": "Sample note",
    "website": null
}
*/
export interface Supply {
  id: number;
  datetime: string;
  postcode: string;
  latitude: number;
  longitude: string;
  organisation: string;
  tweetId: Nullable<string>;
  description: Nullable<string>;
  capacityNotes: Nullable<string>;
  website: Nullable<string>;
  ppeTypes: PpeType[];
}
