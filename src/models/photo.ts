import { MetaAthlete, MetaActivity } from '.';
import { ResourceState, MediaType } from '../enums';

export interface Photo {
  "unique_id": string,
  "athlete_id": MetaAthlete,
  "activity_id": MetaActivity,
  "activity_name": string,
  "post_id": null,
  "resource_state": ResourceState,
  "caption": "",
  "type": MediaType,
  "source": 1,
  "status": 3,
  "uploaded_at": Date,
  "created_at": Date,
  "created_at_local": Date,
  "urls": {
    [key:string]: string
  },
  "sizes": {
    [key:string]: [
      number,
      number
    ]
  },
  "default_photo": true,
  "location": [
    number,
    number
  ]  
  // video media:
  "duration"?: number;
  "video_url"?: string;  
}