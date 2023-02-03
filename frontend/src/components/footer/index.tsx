import { Avatar, Footer as F, Group, Text } from "@mantine/core";
function Footer() {
    return (
        <F height={80} mt="auto" pt="xl">
            <Group position="center">
                <Avatar src={"/brand/BloodLink.png"} size="lg" />
            </Group>
            <Text align="center" mt="md" size="xl">
                BloodLink
            </Text>
            <Text align="center" mt="md" size="sm">
                © {new Date().getFullYear()} BloodLink. All rights reserved.
            </Text>
        </F>
    );
}

export default Footer;
