import { Country, Occupation } from './users';

export interface UserSearchParams {
  name: string;
  occupation: readonly Occupation[];
  username: string | null;
  country: Country | null;
  dateOfBirth: Date | null;
  score: string;
}
