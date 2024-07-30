export class AuthorRole {
    system?: AuthorRole;
    assistant?: AuthorRole;
    user?: AuthorRole;
    label?: string;

    constructor(authorRole: AuthorRole) {
        this.label = authorRole.label;
    }
}