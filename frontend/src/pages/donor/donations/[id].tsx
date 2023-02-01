import { MetaTags } from "@/components/meta";
import { API_URL } from "@/constants";
import { Center, Container, Loader, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios, { isCancel } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type Root = {
  availableOn: string;
  alternateDay: string;
  onAlternateDay: boolean;
  donor: {
    bloodGroup: string;
    allergies: Array<any>;
    currentHealthStatus: string;
    drugUseHistory: Array<any>;
    gender: string;
    height: string;
    donatedBloodPreviously: boolean;
    medicationsCurrentlyTaking: Array<any>;
    weight: string;
    pregnant: boolean;
    user: {
      name: string;
    };
  };
};

const DonationsComponent = () => {
  const [donationInfo, setDonationInfo] = useState<Root | null>(null);
  const { isReady, replace, asPath, query } = useRouter();
  useEffect(() => {
    if (!isReady) return;
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
      .get(`${API_URL}/donation-request/${query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })
      .then((d) => d.data)
      .then(setDonationInfo)
      .catch((err) => {
        if (isCancel(err)) return;
        return showNotification({
          title: "Error",
          message: err?.response?.data?.message || "Something went wrong",
          color: "red",
        });
      });
  }, [isReady]);

  return (
    <Container>
      <MetaTags
        title="Blood Donation"
        description="Donate blood and save lives"
      />
      {!donationInfo ? (
        <Center>
          <Loader variant="oval" />
        </Center>
      ) : (
        <>
          <Title align="center" mt="xl">
            {donationInfo.donor.user.name} wants to donate blood
          </Title>
          <Text align="center" mt="xl">
            {donationInfo.donor.bloodGroup} blood group
          </Text>
          <Text align="center" mt="xl">
            Available on{" "}
            {new Date(donationInfo.availableOn).toLocaleDateString()}
          </Text>
          {donationInfo.onAlternateDay && (
            <Text align="center" mt="xl">
              Alternate day:{" "}
              {new Date(donationInfo.alternateDay).toLocaleDateString()}
            </Text>
          )}
          {donationInfo.donor.allergies.length > 0 && (
            <Text align="center" mt="xl">
              Allergies:{" "}
              {donationInfo.donor.allergies.map((a) => a.name).join(", ")}
            </Text>
          )}
          {donationInfo.donor.medicationsCurrentlyTaking.length > 0 && (
            <Text align="center" mt="xl">
              Medications currently taking:{" "}
              {donationInfo.donor.medicationsCurrentlyTaking
                .map((a) => a.name)
                .join(", ")}
            </Text>
          )}
          {donationInfo.donor.drugUseHistory.length > 0 && (
            <Text align="center" mt="xl">
              Drug use history:{" "}
              {donationInfo.donor.drugUseHistory.map((a) => a.name).join(", ")}
            </Text>
          )}
          <Text align="center" mt="xl">
            Current health status: {donationInfo.donor.currentHealthStatus}
          </Text>
          <Text align="center" mt="xl">
            Weight: {donationInfo.donor.weight} kg
          </Text>
          <Text align="center" mt="xl">
            Height: {donationInfo.donor.height} feet
          </Text>
          <Text align="center" mt="xl">
            Gender: {donationInfo.donor.gender}
          </Text>

          {donationInfo.donor.gender.toLowerCase() === "male" ? null : (
            <Text align="center" mt="xl">
              Pregnant: {donationInfo.donor.pregnant ? "Yes" : "No"}
            </Text>
          )}
          <Text align="center" mt="xl">
            Donated blood previously:{" "}
            {donationInfo.donor.donatedBloodPreviously ? "Yes" : "No"}
          </Text>
          
        </>
      )}
    </Container>
  );
};

export default DonationsComponent;
