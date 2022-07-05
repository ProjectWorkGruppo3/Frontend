import axios from 'axios';
import { DailyStatistics, GeolocalizationValue } from 'models/daily-statistics';
import { ServiceReturnType } from 'types/services/common-service';
import {
  DailyStatisticsRaw,
  GeneralStatistics,
  GetDailyStatisticsProps,
  GetGeneralStatisticsProps,
} from 'types/services/stats-service';
import config from 'utils/config';

const StatisticsService = () => {
  const getGeneralStatistics = async (
    props: GetGeneralStatisticsProps
  ): Promise<ServiceReturnType<GeneralStatistics | null>> => {
    try {
      const response = await axios.get(`${config.API_URL}/Analysis`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });

      const data = response.data as GeneralStatistics;

      return {
        data: data,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error,
      };
    }
  };

  const getDailyStatistics = async (
    props: GetDailyStatisticsProps
  ): Promise<ServiceReturnType<DailyStatistics | null>> => {
    try {
      const response = await axios.get(`${config.API_URL}/Analysis/daily`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });

      const data = response.data as DailyStatisticsRaw;

      return {
        data: {
          date: data.date,
          analysis: data.analysis,
          geolocalizationData: JSON.parse(
            data.geolocalizationData
          ) as GeolocalizationValue[],
        },
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error: error,
      };
    }
  };

  return {
    getGeneralStatistics,
    getDailyStatistics,
  };
};

export default StatisticsService();
