import { Source } from "./source";

export interface Message {
  content: string;
  role: string;
  sources?: Source[];
}
