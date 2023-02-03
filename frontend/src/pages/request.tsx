import { MetaTags } from "@/components/meta";
import { API_URL } from "@/constants";
import { useUser } from "@/context/user";
import { outfit } from "@/fonts";
import useHydrateUserState from "@/hook/userHydrateUserState";
import {
  Button,
  Container,
  createStyles,
  FileButton,
  FileInput,
  Group,
  Paper,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useStyles = createStyles((d) => ({
  container: {
    "*": {
      fontFamily: outfit.style.fontFamily,
    },
  },
}));

function RequestBloodDonation() {
  useHydrateUserState();
  const { user, setUser } = useUser();
  const { replace, asPath, isReady } = useRouter();
  const { classes } = useStyles();
  const formState = useForm({
    initialValues: {
      bloodGroup: "",
      bloodComponent: "",
      requiredOn: new Date(),
      dateOfBirth: new Date(),
      currentHealthStatus: "",
      letterFromDoctor: "",
    },
  });
  const [letter, setLetter] = useState<File | null>();
  useEffect(() => {
    if (!isReady) return;
    if (!user?.id)
      return void replace({
        pathname: "/patient/auth/login",
        query: { to: asPath },
      });
    const token = localStorage.getItem("token");
    if (!token)
      return void replace({
        pathname: "/patient/auth/login",
        query: { to: asPath },
      });
  }, [isReady]);

  return (
    <Container className={classes.container}>
      <MetaTags title="Request Blood" description="" />
      <Title align="center">Request Blood Donation</Title>
      <form
        onSubmit={formState.onSubmit((d) => {
          let letterFromDoctor = "";
          let replied = false;
          if (letter != null) {
            const formData = new FormData();
            formData.append("file", letter);
            axios
              .post(`${API_URL}/upload`, formData, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}}`,
                },
              })
              .then((d) => d.data)
              .then((d) => {
                letterFromDoctor = d.path;
              })
              .catch((err) => {
                showNotification({
                  message:
                    err?.response?.data?.message || "Something went wrong",
                  color: "red",
                  title: "Error",
                });
                replied = true;
              });
          }
          axios.post(
            `${API_URL}/requirement/create`,
            { ...d, letterFromDoctor: letterFromDoctor || undefined },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ).then(() => {
            showNotification({
              message: "Requirement created successfully",
              color: "green",
              title: "Success",
            });
            formState.reset()
            setLetter(null)
          }).catch(err => {
            showNotification({
              message:
                err?.response?.data?.message || "Something went wrong",
              color: "red",
              title: "Error",
            });
          })
        })}
      >
        <Paper shadow={"md"} p="md" mt="xl" withBorder radius={"md"}>
          <Select
            label="Blood Group"
            data={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            required
            {...formState.getInputProps("bloodGroup")}
            placeholder="Pick a Blood Group"
          />

          <Select
            label="Component of Blood"
            required
            mt="md"
            data={[
              {
                value: "RedBloodCells",
                label: "Red Blood Cells",
              },
              "Platelets",
              "Plasma",
              "Cryoprecipitate",
              { value: "WholeBlood", label: "Whole Blood" },
            ]}
            {...formState.getInputProps("bloodComponent")}
            placeholder="Pick a Component of Blood"
          />
          <DatePicker
            required
            withAsterisk
            label="Required On"
            {...formState.getInputProps("requiredOn")}
            mt="md"
          />
          <DatePicker
            required
            withAsterisk
            label="Date of birth"
            {...formState.getInputProps("dateOfBirth")}
            mt="md"
          />
          <TextInput
            label="Current Health Status"
            required
            mt="md"
            {...formState.getInputProps("currentHealthStatus")}
            placeholder="Sick"
          />
          <FileInput
            label="Letter From Doctor"
            onChange={setLetter}
            mt="md"
            placeholder="Pick a file"
          />
          <Group mt="xl" position="center">
            <Button type="submit" radius="md">
              Request
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
}

export default RequestBloodDonation;
