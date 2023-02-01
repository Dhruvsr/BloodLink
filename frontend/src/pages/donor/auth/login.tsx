import axios from "axios";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { MetaTags } from "@/components/meta";
import Link from "next/link";
import { API_URL } from "@/constants";
import { useUser } from "@/context/user";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import useHydrateUserState from "@/hook/userHydrateUserState";

export default function DonorLogin() {
  const formState = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const user = useUser((d) => d.user);
  const setUser = useUser((d) => d.setUser);
  const { isReady, query, replace } = useRouter();
  useHydrateUserState();
  useEffect(() => {
    if (user.id) replace((query.to as string) || "/");
  }, [user.id, query.to, isReady]);

  return (
    <Container size={420} my={40}>
      <MetaTags title="Login" description="Login" />
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          component={Link}
          href="/donor/auth/signup"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Create account
        </Anchor>
      </Text>
      <form
        onSubmit={formState.onSubmit((d) => {
          axios
            .post(`${API_URL}/auth/donor/login`, d)
            .then((res) => res.data)
            .then((d) => {
              localStorage.setItem("token", d.token);
              setUser(d.user);
            })
            .catch((err) => {
              const message =
                err?.response?.data?.errors?.[0]?.message ||
                err?.response?.data?.message ||
                "Something went wrong";
              showNotification({
                message,
                color: "red",
                title: "Error",
              });
            });
        })}
      >
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...formState.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...formState.getInputProps("password")}
          />
          <Button fullWidth mt="xl" type="submit">
            Login
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
