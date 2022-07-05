import { Analytic } from './analytic';

export type DailyStatistics = {
  date: Date;
  geolocalizationData: GeolocalizationValue[];
  analysis: Analytic[];
};

export type GeolocalizationValue = {
  total: number;
  latitude: number;
  longitude: number;
};
