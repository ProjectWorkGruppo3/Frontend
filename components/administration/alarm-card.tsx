import { Card, Grid, Text, Tooltip } from "@mantine/core";
import {
    RiMailSendLine
} from 'react-icons/ri';
import {
    MdError,
    MdBattery20
} from 'react-icons/md';
import {
    GiFalling
} from 'react-icons/gi';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { TbHeartbeat } from 'react-icons/tb';
import dayjs from "dayjs";

type AlarmType = 'fall' | 'heartbeat' | 'low-battery' | 'other';

export interface AlarmCardProps {
    type: AlarmType;
    date: Date;
    sended: boolean;
}

export const AlarmCard = (props: AlarmCardProps) => {

    const getIconAlarmType = (type: AlarmType) => {
        switch (type) {
            case 'fall':
                return <GiFalling size={28} />
            case 'heartbeat':
                return <TbHeartbeat size={28} />
            case 'low-battery':
                return <MdBattery20 size={28} />
            default:
                return <RiAlarmWarningLine size={28} />
        }
        
    }

    const formatDate = dayjs(props.date).format('DD/MM  h:mm:ss A');


    return (
        <Card shadow='xl' radius='sm'>
             <Grid align='center'>
                <Grid.Col span={1}>
                    {
                        props.sended
                        ?
                        <RiMailSendLine size={28} color='green' />
                        :
                        <MdError size={28} color='red' />
                    }
                </Grid.Col>
                <Grid.Col span={1} mx='xs'>
                    <Tooltip
                        label={<Text>{props.type}</Text>}
                    >
                        {getIconAlarmType(props.type)}
                    </Tooltip>
                </Grid.Col>
                <Grid.Col span={9}>
                    <Text>{formatDate}</Text>
                </Grid.Col>
             </Grid>
        </Card>
    );
}