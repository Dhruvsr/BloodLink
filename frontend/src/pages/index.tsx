import useHydrateUserState from "@/hook/userHydrateUserState";
import { Button, clsx, Container, createStyles, Group } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((t) => ({
  link: {
    textDecoration: "none",
  },
}));

export default function Home() {
  const { classes } = useStyles();
  useHydrateUserState();
  return (
    <Container>
      <Group position="center">
        <Link href="/donor/auth/register" className={clsx(classes.link)}>
          <Button fullWidth variant="light">
            Register As A Donor
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
