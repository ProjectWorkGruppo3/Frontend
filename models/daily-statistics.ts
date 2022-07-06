import { GeolocalizationValue } from 'types/geolocalization';
import { Analytic } from './analytic';

export type DailyStatistics = {
  date: Date;
  geolocalizationData: GeolocalizationValue[];
  analysis: Analytic[];
};

