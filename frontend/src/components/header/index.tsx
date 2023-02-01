import { useUser } from "@/context/user";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Avatar,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string };
}
const links: HeaderSimpleProps["links"][] = [
  { link: "/donor/auth/register", label: "Register As Donor" },
];

export function H() {
  const [opened, { toggle }] = useDisclosure(false);
  const { asPath: active } = useRouter();
  const { classes, cx } = useStyles();
  const user = useUser((d) => d.user);
  const setUser = useUser((d) => d.setUser);

  return (
    <Header height={60} mb={20}>
      <Container className={classes.header}>
        <Link href="/">
          <Avatar size={28} />
        </Link>
        <Menu shadow={"md"} width={200}>
          <Menu.Dropdown>
            {user.id ? (
              <>
                <Menu.Item color="green">
                  <Link href="/donor/donate" className={cx(classes.link)}>
                    Donate
                  </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Danger</Menu.Label>
                <Menu.Item
                  color="red"
                  onClick={() => {
                    setUser({ avatarUrl: "", id: "", role: "Donor" });
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Label>Authentication</Menu.Label>
                <Menu.Item>
                  <Link href="/donor/auth/register">Register as a donor</Link>
                </Menu.Item>
              </>
            )}
          </Menu.Dropdown>
          <Menu.Target>
            {user.id ? (
              <Avatar />
            ) : (
              <Burger
                opened={opened}
                onClick={toggle}
                className={classes.burger}
                size="sm"
              />
            )}
          </Menu.Target>
        </Menu>
      </Container>
    </Header>
  );
}
