import { AuthorizeProps } from './auth-service';

export interface GetReportsProps extends AuthorizeProps {}

export interface DonwloadReportProps extends AuthorizeProps {
    filename: string
}
