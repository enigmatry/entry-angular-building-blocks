export class AuthorRole {
    system?: AuthorRole;
    assistant?: AuthorRole;
    user?: AuthorRole;
    tool?: AuthorRole;

    label?: string;

    constructor(authorRole: AuthorRole) {
        this.label = authorRole.label;
        this.system = authorRole.system;
        this.assistant = authorRole.assistant;
        this.user = authorRole.user;
        this.tool = authorRole.tool;
    }
}