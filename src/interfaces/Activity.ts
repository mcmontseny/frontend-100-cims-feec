export interface Activity {
  id: number;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    start_date: string;
    start_date_local: string;
    timezone: string;
    start_lat: number[];
    end_lat: number[];
    average_speed: number;
    max_speed: number;
    elev_high: number;
    elev_low: number;
}