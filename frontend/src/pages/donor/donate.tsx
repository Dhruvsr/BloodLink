import useHydrateUserState from "@/hook/userHydrateUserState";
import { useEffect, useState } from "react";
import {
  Button,
  Center,
  Checkbox,
  Container,
  createStyles,
  Group,
  Loader,
  Paper,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { MetaTags } from "@/components/meta";
import { DonorInfo } from "@/types/donor";
import { outfit } from "@/fonts";
import { useRouter } from "next/router";
import { useUser } from "@/context/user";
import axios, { isCancel } from "axios";
import { API_URL } from "@/constants";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";

const useStyles = createStyles((t) => ({
  container: {
    "*": {
      fontFamily: outfit.style.fontFamily,
    },
  },
}));

export default function Donate() {
  useHydrateUserState();
  const [donorInfo, setDonorInfo] = useState<DonorInfo | undefined>(undefined);
  const { classes } = useStyles();
  const { replace, asPath } = useRouter();
  const user = useUser((d) => d.user);
  useEffect(() => {
    if (!user.id)
      return void replace({
        pathname: "/donor/auth/login",
        query: {
          to: asPath,
        },
      });
    const token = localStorage.getItem("token");
    if (!token)
      return void replace({
        pathname: "/donor/auth/login",
        query: {
          to: asPath,
        },
      });
    const controller = new AbortController();
    axios
      .get(`${API_URL}/me/donor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })
      .then((d) => d.data)
      .then((d) => {
        setDonorInfo(d);
        Object.keys(d).forEach((key) => {
          formState.setFieldValue(key, d[key]);
        });
      })
      .catch((err) => {
        if (isCancel(err)) return;
        showNotification({
          title: "Error",
          message: err?.response?.data?.message || "Something went wrong",
          color: "red",
        });
      });
    return () => controller.abort();
  }, []);

  const formState = useForm({
    initialValues: {
      availableOn: new Date(),
      alternateDay: new Date(),
      addAlternateDay: false,
    },
  });

  return (
    <>
      <Container className={classes.container}>
        <MetaTags title="Donate Blood" description="Donate Blood" />

        <Title align="center">Donate Blood</Title>

        {donorInfo === undefined ? (
          <Center mt="xl">
            <Loader variant="oval" />
          </Center>
        ) : (
          <>
            <form onSubmit={formState.onSubmit(console.log)}>
              <Paper shadow={"md"} withBorder radius={"md"} p="md" mt="xl">
                <TextInput
                  label="Name"
                  name="name"
                  {...formState.getInputProps("name")}
                  required
                  disabled
                />
                <DatePicker
                  label="Available On"
                  name="availableOn"
                  {...formState.getInputProps("availableOn")}
                  required
                  withAsterisk
                  mt="md"
                />

                <Checkbox
                  label="Add Alternate Day"
                  name="addAlternateDay"
                  {...formState.getInputProps("addAlternateDay", {
                    type: "checkbox",
                  })}
                  mt="md"
                />
                {formState.values.addAlternateDay ? (
                  <DatePicker
                    label="Alternate Day"
                    name="alternateDay"
                    mt="md"
                    {...formState.getInputProps("alternateDay")}
                  />
                ) : null}
                <TextInput
                  label="Address"
                  name="address"
                  mt="md"
                  {...formState.getInputProps("address")}
                  required
                  disabled
                />
                <TextInput
                  label="Phone"
                  name="phone"
                  mt="md"
                  {...formState.getInputProps("phone")}
                  required
                  disabled
                />
                <TextInput
                  label="Email"
                  name="email"
                  mt="md"
                  {...formState.getInputProps("email")}
                  required
                  disabled
                />
                <TextInput
                  label="Aadhar Number"
                  name="aadharNumber"
                  mt="md"
                  {...formState.getInputProps("aadharNumber")}
                  required
                  disabled
                />
                <Select
                  data={["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"]}
                  label="Blood Group"
                  name="bloodGroup"
                  mt="md"
                  {...formState.getInputProps("bloodGroup")}
                  required
                  disabled
                />
                <DatePicker
                  readOnly
                  label="Date of Birth"
                  name="dateOfBirth"
                  mt="md"
                  {...formState.getInputProps("dateOfBirth")}
                  value={new Date(donorInfo.dateOfBirth)}
                  required
                  withAsterisk
                  disabled
                />
                <TextInput
                  label="Height"
                  name="height"
                  mt="md"
                  {...formState.getInputProps("height")}
                  required
                  disabled
                />
                <Select
                  data={["Male", "Female", "Other"]}
                  label="Gender"
                  {...formState.getInputProps("gender")}
                  required
                  disabled
                  mt="md"
                />
                {(formState.values as any).gender.toLowerCase() !== "male" ? (
                  <Checkbox
                    label="Pregnant"
                    name="pregnant"
                    mt="md"
                    {...formState.getInputProps("pregnant")}
                    required
                  />
                ) : null}
                <Group position="center" mt="xl">
                  <Button fullWidth type="submit">
                    Submit
                  </Button>
                </Group>
              </Paper>
            </form>
          </>
        )}
      </Container>
    </>
  );
}
