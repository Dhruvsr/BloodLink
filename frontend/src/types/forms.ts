const RegisterDonorForm = {
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
};

export type RegisterDonorForm = typeof RegisterDonorForm;
