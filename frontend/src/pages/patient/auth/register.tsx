import { MetaTags } from "@/components/meta";
import { API_URL } from "@/constants";
import { useUser } from "@/context/user";
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
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
function Register() {
  const user = useUser((d) => d.user);
  const setUser = useUser((d) => d.setUser);
  const { isReady, replace, asPath, query } = useRouter();
  useEffect(() => {
    if (!isReady) return;
    if (user.id) replace((query.to as string) || "/");
  }, [query.to, isReady, asPath, user.id]);

  const formState = useForm({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  return (
    <Container size={420} my={40}>
      <MetaTags title="Register" description="Register to use our services" />
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor component={Link} href="/patient/auth/login" size="sm">
          Login
        </Anchor>
      </Text>
      <form
        onSubmit={formState.onSubmit((d) => {
          axios
            .post<{ token: string; user: typeof user }>(
              `${API_URL}/patient/auth/signup`,
              d
            )
            .then((d) => d.data)
            .then((d) => {
              localStorage.setItem("token", d.token);
              setUser(d.user);
            })
            .catch((err) => {
              showNotification({
                title: "Error",
                message: err?.response?.data?.message || "Something went wrong",
                color: "red",
              });
              return null;
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
          <TextInput
            label="Name"
            placeholder="Your name"
            required
            mt="md"
            {...formState.getInputProps("name")}
          />
          <TextInput
            label="Address"
            placeholder="Your address"
            required
            mt="md"
            {...formState.getInputProps("address")}
          />
          <TextInput
            label="Phone"
            placeholder="Your phone"
            required
            mt="md"
            {...formState.getInputProps("phone")}
          />
          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default Register;
