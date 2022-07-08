import { ActionIcon, Grid, TextInput } from '@mantine/core';
import { GetInputPropsPayload } from '@mantine/form/lib/types';
import { FiTrash } from 'react-icons/fi';

export interface EmergencyContactInputProps {
  index: any;
  inputProps: GetInputPropsPayload;
  onRemoveItem: () => void;
}

export const EmergencyContactInput = (props: EmergencyContactInputProps) => {
  return (
    <Grid align='center' py={0}>
      <Grid.Col span={11}>
        <TextInput
            p={0}
          placeholder={`Email Emergency Contact ${props.index+1}`}
          {...props.inputProps}
          sx={{
            'input:focus': {
              borderColor: 'var(--p-color)',
            },
          }}
        />
      </Grid.Col>
      <Grid.Col span={1} p={0}>
        <ActionIcon
            color="red"
            variant="hover"
            onClick={props.onRemoveItem}
        >
            <FiTrash size={16} />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  );
};
