import { Report } from "models/report";
import { AuthorizeProps } from "./auth-service";

export interface GeneralStatistics {
    totalAdmins: number;
    totalBracelets: number;
    lastReports: Report[],
    analytics: any[]
}

export interface GetGeneralStatisticsProps extends AuthorizeProps {}