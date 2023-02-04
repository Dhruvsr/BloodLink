import { MetaTags } from "@/components/meta";
import { useUser } from "@/context/user";
import { registerDonor } from "@/services/donor";
import { RegisterDonorForm } from "@/types/forms";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Select,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DonorRegister() {
  const formState = useForm<RegisterDonorForm>({
    initialValues: {
      email: "",
      password: "",
      name: "",
      address: "",
      dateOfBirth: "",
      currentHealthStatus: "",
      donatedBloodPreviously: false,
      previousBloodDonationDates: [new Date()],
      bloodGroup: "",
      medicationsCurrentlyTaking: "",
      travelHistory: "",
      drugUseHistory: "",
      height: "",
      weight: "",
      aadharNumber: "",
      allergies: "",
      pregnant: false,
      gender: "",
      phone: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const user = useUser((d) => d.user);
  const setUser = useUser((d) => d.setUser);
  const { replace, query, isReady } = useRouter();

  useEffect(() => {
    if (user.id) replace((query.to as string) || "/dashboard");
  }, [user.id, isReady, query.to]);

  return (
    <Container size={420} my={40}>
      <MetaTags title="Register" description="Register as a donor" />
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Register
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor component={Link} href="/donor/auth/login" size="sm">
          Login
        </Anchor>
      </Text>

      <form
        onSubmit={formState.onSubmit(async (d) => {
          setLoading(true);
          const res = await registerDonor({
            ...d,
            medicationsCurrentlyTaking:
              d.medicationsCurrentlyTaking.length > 0
                ? d.medicationsCurrentlyTaking.split(",")
                : [],
            travelHistory:
              d.travelHistory.length > 0 ? d.travelHistory.split(",") : [],
            drugUseHistory:
              d.drugUseHistory.length > 0 ? d.drugUseHistory.split(",") : [],
            allergies: d.allergies.length > 0 ? d.allergies.split(",") : [],
          });
          if (res.error == true) {
            setLoading(false);
            return showNotification({
              message: res.message,
              color: "red",
              title: "Error",
            });
          } else {
            const { data } = res;
            localStorage.setItem("token", data!.token);
            setUser(data!.user);
            setLoading(false);
          }
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
            mt="md"
            label="Name"
            placeholder="Your name"
            required
            {...formState.getInputProps("name")}
          />
          <TextInput
            mt="md"
            label="Address"
            placeholder="Your address"
            required
            {...formState.getInputProps("address")}
          />
          <TextInput
            mt="md"
            label="Phone Number"
            placeholder="Your phone number"
            required
            {...formState.getInputProps("phone")}
          />
          <DatePicker
            mt="md"
            label="Date of Birth"
            placeholder="Your date of birth"
            required
            {...formState.getInputProps("dateOfBirth")}
          />
          <TextInput
            mt="md"
            label="Current Health Status"
            placeholder="Your current health status"
            required
            {...formState.getInputProps("currentHealthStatus")}
          />
          <Checkbox
            mt="md"
            label="Donated Blood Previously"
            {...formState.getInputProps("donatedBloodPreviously")}
          />
          {formState.values.donatedBloodPreviously ? (
            <>
              <>
                {formState.values.previousBloodDonationDates.map(
                  (date, index) => {
                    return (
                      <div key={index}>
                        <DatePicker
                          mt="md"
                          placeholder="Pick date"
                          label="Date"
                          {...formState.getInputProps(
                            `previousBloodDonationDates.${index}`
                          )}
                        />
                      </div>
                    );
                  }
                )}
                <Button
                  fullWidth
                  mt="xl"
                  onClick={() =>
                    formState.insertListItem(
                      "previousBloodDonationDates",
                      new Date()
                    )
                  }
                >
                  Add
                </Button>
              </>
            </>
          ) : null}
          <Select
            mt="md"
            label="Blood Group"
            data={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            {...formState.getInputProps("bloodGroup")}
            required
            placeholder="Select blood group"
          />
          <TextInput
            mt="md"
            label="Medications Currently Taking"
            placeholder="List of medications you are currently taking (separated by comma)"
            {...formState.getInputProps("medicationsCurrentlyTaking")}
          />
          <TextInput
            mt="md"
            label="Travel History"
            placeholder="Places you have travelled to (separated by comma)"
            {...formState.getInputProps("travelHistory")}
          />
          <TextInput
            mt="md"
            label="Drug Use History"
            placeholder="Your drug use history (separated by comma)"
            {...formState.getInputProps("drugUseHistory")}
          />
          <TextInput
            mt="md"
            label="Height"
            placeholder="Your height(in feet)"
            required
            {...formState.getInputProps("height")}
          />
          <TextInput
            mt="md"
            label="Weight"
            placeholder="Your weight(in kg)"
            required
            {...formState.getInputProps("weight")}
          />
          <TextInput
            mt="md"
            label="Aadhar Number"
            placeholder="Your aadhar number"
            required
            {...formState.getInputProps("aadharNumber")}
          />
          <TextInput
            mt="md"
            label="Allergies"
            placeholder="Your allergies (separated by comma)"
            {...formState.getInputProps("allergies")}
          />
          <Select
            mt="md"
            label="Gender"
            data={["Male", "Female", "Other"]}
            required
            placeholder="Select your Gender"
            {...formState.getInputProps("gender")}
          />
          {formState.values.gender === "" ||
          formState.values.gender.toLowerCase() != "female" ? null : (
            <Checkbox
              mt="md"
              label="Pregnant"
              {...formState.getInputProps("pregnant")}
              placeholder="Are you pregnant?"
            />
          )}

          <Button fullWidth mt="xl" loading={loading} type="submit">
            Register
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
