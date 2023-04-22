import { ContactDetails } from "./contactDetails";
import { EmergencyContactDetails } from "./emergencyContactDetails";
import { EmploymentDetails } from "./employmentDetails";

export interface Employee {
  id: number;
  name: string;
  surname: string;
  nrcNumber: string; 
  gender: string;
  maritalStatus: string;
  dateOfBirth: string;
  contactDetails: ContactDetails;
  employmentDetails: EmploymentDetails
  emergencyContactDetails: EmergencyContactDetails;
}
