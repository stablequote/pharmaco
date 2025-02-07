import React from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Title,
  Group,
  ActionIcon,
  useMantineTheme,
  Input,
  Select,
  Flex,
} from "@mantine/core";
import { IconSearch, IconBell, IconUser } from "@tabler/icons-react";
import moment from "moment";

const DashboardHeader = () => {
  const theme = useMantineTheme();

  return (
    <Header height={60}  p="md" sx={{backgroundColor: "#1D242E", color: "white"}} >
      <Flex justify="space-between">
        <Text color="white">PHARMACO</Text>
        
        {/* <Group>
          <Input
            placeholder="Search for anything here"
            icon={<IconSearch size={16} />}
            sx={{ width: 300 }}
          />
        </Group> */}

        {/* Right side: Date, time, and icons */}
        <Group>
          <Select
            data={["English", "Arabic"]}
            placeholder="Language"
            defaultValue="English"
          />
          <Text>{moment(Date.now()).format('DD-MMMM-YYYY')}</Text>
          <ActionIcon onClick={() => alert("Notifications feature is coming soom...")}>
            <IconBell size={20} />
          </ActionIcon>
          <ActionIcon onClick={() => alert("Profile management is coming soon...")}>
            <IconUser size={20} />
          </ActionIcon>
        </Group>
      </Flex>
    </Header>
  );
};

export default DashboardHeader;