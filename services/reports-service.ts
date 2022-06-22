import axios from 'axios';
import { Report } from '../models/report';
import { ServiceReturnType } from '../types/services/common-service';
import { GetReportsServiceProps } from '../types/services/reports-service';
import config from '../utils/config';
import { fakeReports } from '../utils/fake-data';

const ReportsService = () => {
  const getReports = async (
    props: GetReportsServiceProps
  ): Promise<ServiceReturnType<Report[]>> => {
    return {
      data: fakeReports,
      error: undefined
    };

    try {
      const result = await axios.get(
        `${config.API_URL}/reports/`, // FIXME
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: props.token,
          },
        }
      );

      const reports = result.data as Report[];

      return {
        data: reports,
        error: undefined
      };
    } catch (error) {
      return {
        data: [],
        error: error,
      };
    }
  };

  return {
    getReports,
  };
};

export default ReportsService();
