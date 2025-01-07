import { Source } from "./source";

export interface Message {
    role?: string | undefined;
    content?: string | undefined;
    sources?: Source[];
}

