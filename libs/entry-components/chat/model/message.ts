import { AuthorRole } from "./author-role";
import { Source } from "./source";

export class Message  {
    role?: AuthorRole;
    content?: string | undefined;
    sources?: Source[];

    constructor(message : Message){
        this.role = message.role;
        this.content = message.content;
        this.sources = message.sources;
    }
}
