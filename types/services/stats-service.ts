import { Analytic } from 'models/analytic';
import { Report } from 'models/report';
import { AuthorizeProps } from './auth-service';

export interface GeneralStatistics {
  adminsCount: number;
  devicesCount: number;
  latestReports: Report[];
  lastAnalysis: Analytic[];
}

export interface GetGeneralStatisticsProps extends AuthorizeProps {}
