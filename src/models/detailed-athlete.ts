import { SummaryClub, SummaryGear } from '.';
import { FollowerStatus, ResourceState, UnitSystem } from '../enums';

export interface DetailedAthlete {
  id: number;
  resource_state: ResourceState;
  firstname: string;
  lastname: string;
  profile_medium: string;
  profile: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  friend: FollowerStatus;
  follower: FollowerStatus;
  premium: boolean;
  created_at: Date;
  updated_at: Date;
  follower_count: number;
  friend_count: number;
  mutual_friend_count: number;
  measurement_preference: UnitSystem;
  email: string;
  ftp: number;
  weight: number;
  clubs: SummaryClub;
  bikes: SummaryGear;
  shoes: SummaryGear;

  username: string;
  bio: string;
  summit: boolean;
  badge_type_id: number;
  blocked: boolean;
  can_follow: boolean;
  athlete_type: number;
  date_preference: string;

  is_winback_via_upload: boolean;
  is_winback_via_view: boolean;
}
