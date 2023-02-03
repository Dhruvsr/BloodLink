import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { MetaTags } from "@/components/meta";
import { outfit } from "@/fonts";
import useHydrateUserState from "@/hook/userHydrateUserState";
import {
  Button,
  Container,
  createStyles,
  Group,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

const STATS = [
  "Patients needs 15 million units of blood each year but manages to receive 73%.",
  "402 million eligible donors in India.",
  " 0.65 million units of blood are wasted every year.",
  "1% of blood in blood banks is infected.",
];

const useStyles = createStyles((d) => ({
  paper: {
    maxWidth: "300px",
    minHeight: "133px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  useHydrateUserState();
  return (
    <>
      <Container>
        <MetaTags
          title="BloodLink"
          description="Saving lives through blood donation made simple"
        />
        <Title mb="xl" className={outfit.className} align="center">
          BloodLink
        </Title>
        <Text className={outfit.className} align="center" mb="xl">
          Saving lives through blood donation made simple
        </Text>
        <Group position="center" my="xl">
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
        <Text className={outfit.className} align="center" my="xl">
          Blood donation is a noble cause that saves countless lives every year.
          However, the process of connecting donors with patients in need of
          blood can be a cumbersome and inefficient process. BloodLink was
          created to address these challenges and provide a seamless, secure and
          efficient platform for blood donation. With BloodLink, donors can
          quickly and easily register themselves, view urgent blood requests,
          and have all their important medical information readily available
          when needed. Patients can access a pool of potential donors and have
          peace of mind knowing that they will receive the right type of blood
          when they need it most, reducing the risk of wasted blood in the
          process.
        </Text>
        <Title className={outfit.className} align="center" my="xl">
          Statistics
        </Title>
      </Container>
      <Group my="xl" position="center">
        {STATS.map((stat, index) => (
          <Paper
            key={index}
            withBorder
            shadow="sm"
            p="md"
            radius={"md"}
            className={classes.paper}
          >
            <Text className={outfit.className} align="center">
              {stat}
            </Text>
          </Paper>
        ))}
      </Group>
      <Container mb="xl">
        <Contact />
      </Container>
      <Footer />
    </>
  );
}
