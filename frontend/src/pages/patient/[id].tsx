import { MetaTags } from "@/components/meta";
import { API_URL } from "@/constants";
import { useUser } from "@/context/user";
import useHydrateUserState from "@/hook/userHydrateUserState";
import {
  Button,
  Container,
  createStyles,
  Group,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useStyles = createStyles((d) => ({
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function PatientRequirements() {
  const user = useUser((d) => d.user);
  useHydrateUserState();
  const { classes } = useStyles();
  const { query, isReady, asPath, replace } = useRouter();
  useEffect(() => {
    if (!user.id || !localStorage.getItem("token")) {
      replace({
        pathname: "/",
        query: {
          to: asPath,
        },
      });
    }
  }, [user.id]);

  const [patientRequirement, setPatientRequirement] = useState<{
    id: string;
    bloodGroup: string;
    component: string;
    currentHealthStatus: string;
    requiredOn: Date;
    patient: {
      user: {
        phone: string;
        email: string;
      };
    };
  }>();

  useEffect(() => {
    if (!isReady || !query.id) return;
    const token = localStorage.getItem("token");
    const controller = new AbortController();
    axios
      .get(`${API_URL}/patient/${query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })
      .then((r) => r.data)
      .then(setPatientRequirement)
      .catch((err) => {
        showNotification({
          title: "Error",
          message: err?.response?.data?.message || "Something went wrong",
          color: "red",
        });
      });
    return () => controller.abort();
  }, [isReady, query.id]);

  return (
    <>
      <Container>
        <MetaTags
          title="Patient Requirements"
          description="Patient Requirements"
        />
        {patientRequirement != undefined ? (
          <>
            <Group position="center" mt="xl" pt="xl" className={classes.info}>
              <Title order={1}>Blood Requirement</Title>
              <Text>BloodGroup: {patientRequirement.bloodGroup}</Text>
              <Text>Component: {patientRequirement.component}</Text>
              <Text>
                Current Health Status: {patientRequirement.currentHealthStatus}
              </Text>
              <Text>
                Required On:{" "}
                {new Date(patientRequirement.requiredOn).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  }
                )}
              </Text>
              <Group position="center">
                <a href={`tel:${patientRequirement.patient.user.phone}`}>
                  <Button variant="outline">Call</Button>
                </a>
                <a href={`mailto:${patientRequirement.patient.user.email}`}>
                  <Button variant="outline">Email</Button>
                </a>
              </Group>
            </Group>
          </>
        ) : (
          <Group position="center" mt="xl" pt="xl">
            <Loader mt="xl" variant="oval" />
          </Group>
        )}
      </Container>
    </>
  );
}
