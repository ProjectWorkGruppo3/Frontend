import axios from 'axios';
import { Report } from '../models/report';
import { ServiceReturnType } from '../types/services/common-service';
import {
  DonwloadReportProps,
  GetReportsProps,
} from '../types/services/reports-service';
import config from '../utils/config';

const ReportsService = () => {
  const getReports = async (
    props: GetReportsProps
  ): Promise<ServiceReturnType<Report[]>> => {
    try {
      const result = await axios.get(`${config.API_URL}/Reports/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
      });

      const reports = result.data as Report[];

      return {
        data: reports,
        error: undefined,
      };
    } catch (error) {
      return {
        data: [],
        error: error,
      };
    }
  };

  const downloadReport = async (
    props: DonwloadReportProps
  ): Promise<ServiceReturnType<boolean>> => {
    try {
      const response = await axios.post(
        `${config.API_URL}/Reports/${props.filename}`,
        undefined,
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', props.filename); //or any other extension
      document.body.appendChild(link);
      link.click();

      link.remove();

      return {
        data: true,
        error: undefined,
      };
    } catch (error) {
      return {
        data: false,
        error: error,
      };
    }
  };

  return {
    getReports,
    downloadReport,
  };
};

export default ReportsService();
