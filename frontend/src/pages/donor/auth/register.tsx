import { MetaTags } from "@/components/meta";
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

export default function DonorRegister() {
  const formState = useForm({
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
      socialSecurityNumber: "",
      allergies: "",
      pregnant: false,
      gender: "",
    },
  });
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
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor<"a">
          href="#"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Create account
        </Anchor>
      </Text>

      <form onSubmit={formState.onSubmit(console.log)}>
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
            required
            {...formState.getInputProps("medicationsCurrentlyTaking")}
          />
          <TextInput
            mt="md"
            label="Travel History"
            placeholder="Places you have travelled to (separated by comma)"
            required
            {...formState.getInputProps("travelHistory")}
          />
          <TextInput
            mt="md"
            label="Drug Use History"
            placeholder="Your drug use history (separated by comma)"
            required
            {...formState.getInputProps("drugUseHistory")}
          />
          <TextInput
            mt="md"
            label="Height"
            placeholder="Your height"
            required
            {...formState.getInputProps("height")}
          />
          <TextInput
            mt="md"
            label="Weight"
            placeholder="Your weight"
            required
            {...formState.getInputProps("weight")}
          />
          <TextInput
            mt="md"
            label="Social Security Number"
            placeholder="Your social security number"
            required
            {...formState.getInputProps("socialSecurityNumber")}
          />
          <TextInput
            mt="md"
            label="Allergies"
            placeholder="Your allergies (separated by comma)"
            required
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

          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
