import useHydrateUserState from "@/hook/userHydrateUserState";
import { Button, Container, Group } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  useHydrateUserState();
  return (
    <Container>
      <Group position="center">
        <Link href="/donor/auth/register">
          <Button fullWidth variant="light">
            Register As A Donor
          </Button>
        </Link>
        <Link href="/patient/auth/register">
          <Button fullWidth variant="light">
            Register As A Patient
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
