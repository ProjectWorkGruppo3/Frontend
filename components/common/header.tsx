import { Grid, Title, Group, ActionIcon, Divider } from "@mantine/core";
import { MdExitToApp } from "react-icons/md";

export interface HeaderProps {
  title: string;
  onLogout: () => void;
}

export const Header = (props: HeaderProps) => {
  return (
    <>
      <Grid>
        <Grid.Col span={10}>
          <Title order={2}>{props.title}</Title>
        </Grid.Col>
        <Grid.Col span={2}>
          <Group position="right">
            <ActionIcon
              color="dark"
              onClick={props.onLogout}
            >
              <MdExitToApp size={24} />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>

      <Divider mb="md" />
    </>
  );
};
