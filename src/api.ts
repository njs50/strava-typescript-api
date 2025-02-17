import axios from 'axios';
import { StreamKeys } from './enums';
import {
  ActivityStats,
  ActivityZone,
  Comment,
  DetailedActivity,
  DetailedAthlete,
  DetailedGear,
  Lap,
  Photo,
  StreamSet,
  SummaryActivity,
  SummaryAthlete,
  Zones
} from './models';

const STRAVA_API_URL = 'https://www.strava.com/api/v3';

export class Strava {
  constructor(private accessToken: string) {}

  private async doRequest<T>(path: string, params?: object): Promise<T> {
    const url = `${STRAVA_API_URL}/${path}`;

    return axios
      .get<T>(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        params: params
      })
      .then(res => res.data);
  }

  /**
   * Returns the comments on the given activity.
   * @param id The identifier of the activity.
   * @param page Page number.
   * @param perPage Number of items per page. Defaults to 30.
   * @returns An array of Comment objects.
   */
  async getCommentsByActivityId(id: number, page?: number, perPage?: number) {
    const path = `activities/${id}/comments`;

    return this.doRequest<Comment[]>(path, {
      page: page,
      per_page: perPage
    });
  }

  /**
   * Returns the given activity that is owned by the authenticated athlete.
   * @param id The identifier of the activity.
   * @param includeAllEfforts To include all segments efforts.
   * @returns The activity's detailed representation. An instance of DetailedActivity.
   */
  async getActivityById(id: number, includeAllEfforts: boolean) {
    const path = `activities/${id}`;

    return this.doRequest<DetailedActivity>(path, {
      include_all_efforts: includeAllEfforts
    });
  }

  /**
   * Returns the laps of an activity identified by an identifier.
   * @param id The identifier of the activity.
   * @returns An array of Lap objects.
   */
  async getLapsByActivityId(id: number) {
    const path = `activities/${id}/laps`;

    return this.doRequest<Lap[]>(path);
  }

  /**
   * Returns the athletes who kudoed an activity identified by an identifier.
   * @param id The identifier of the activity.
   * @param page Page number.
   * @param perPage Number of items per page. Defaults to 30.
   * @returns An array of SummaryAthlete objects.
   */
  async getKudoersByActivityId(id: number, page?: number, perPage?: number) {
    const path = `activities/${id}/kudos`;

    return this.doRequest<SummaryAthlete[]>(path, {
      page: page,
      per_page: perPage
    });
  }

  /**
   * Returns the activities of an athlete for a specific identifier.
   * @param before An epoch timestamp to use for filtering activities that have taken place before a certain time.
   * @param after An epoch timestamp to use for filtering activities that have taken place after a certain time.
   * @param page Page number.
   * @param perPage Number of items per page. Defaults to 30.
   * @returns An array of SummaryActivity objects.
   */
  async getLoggedInAthleteActivities(
    before?: number,
    after?: number,
    page?: number,
    perPage?: number
  ) {
    const path = 'athlete/activities';

    return this.doRequest<SummaryActivity[]>(path, {
      before: before,
      after: after,
      page: page,
      per_page: perPage
    });
  }

  /**
   * Premium Feature. Returns the zones of a given activity.
   * @param id The identifier of the activity.
   * @returns An array of ActivityZone objects.
   */
  async getZonesByActivityId(id: number) {
    const path = `activities/${id}/zones`;

    return this.doRequest<ActivityZone[]>(path);
  }

  /**
   * Undocumented Feature. Gets media attached to an activity
   * @param id The identifier of the activity.
   */
  async getPhotosByActivityId(id: number) {
    const path = `activities/${id}/photos`;

    return this.doRequest<Photo[]>(path);
  }


  /**
   * Returns the currently authenticated athlete
   * @returns Returns the currently authenticated athlete.
   */
  async getLoggedInAthlete() {
    const path = 'athlete';

    return this.doRequest<DetailedAthlete>(path);
  }

  /**
   * Returns the authenticated athlete's heart rate and power zones.
   * @returns Returns the authenticated athlete's heart rate and power zones.
   */
  async getLoggedInAthleteZones() {
    const path = 'athlete/zones';

    return this.doRequest<Zones>(path);
  }

  /**
   * Returns the activity stats of an athlete
   * @param id The identifier of the athlete.
   * @param page Page number.
   * @param perPage Number of items per page. Defaults to 30.
   * @returns Returns the activity stats of an athlete.
   */
  async getAthleteStats(id: number, page?: number, perPage?: number) {
    const path = `athletes/${id}/stats`;

    return this.doRequest<ActivityStats>(path, {
      page: page,
      per_page: perPage
    });
  }

  /**
   * Returns an equipment using its identifier.
   * @param id The identifier of the gear.
   * @returns A representation of the gear. An instance of DetailedGear.
   */
  async getGearById(id: string) {
    const path = `gear/${id}`;

    return this.doRequest<DetailedGear>(path);
  }

  /**
   * Returns the given activity's streams
   * @param id The identifier of the activity.
   * @param keys Desired stream types.
   * @param keyByType Must be true.
   * @returns The set of requested streams. An instance of StreamSet.
   */
  async getActivityStreams(
    id: number,
    keys: StreamKeys[],
    keyByType: boolean = true
  ) {
    const path = `activities/${id}/streams`;

    return this.doRequest<StreamSet>(path, {
      keys: keys.join(','),
      key_by_type: keyByType
    });
  }
}
