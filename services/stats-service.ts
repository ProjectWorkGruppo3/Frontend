import axios from "axios";
import { ServiceReturnType } from "types/services/common-service";
import { GeneralStatistics, GetGeneralStatisticsProps } from "types/services/stats-service";
import config from "utils/config";

const StatisticsService = () => {

    const getGeneralStatistics = async (props: GetGeneralStatisticsProps) : Promise<ServiceReturnType<GeneralStatistics | null>> => {

        try {

            const response = await axios.get(
                `${config.API_URL}/Analysis`,
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`
                    }
                }
            );

            const data = response.data as GeneralStatistics;

            return {
                data: data,
                error: null
            }
        } catch (error) {
            return {
                data: null,
                error: error
            }
        }
        
    }

    return {
        getGeneralStatistics
    }
}

export default StatisticsService();