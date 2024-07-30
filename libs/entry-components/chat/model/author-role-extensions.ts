import { AuthorRole } from "./author-role";

const getAssistant = () => {
    return new AuthorRole({ label: 'assistant' });
};

const getUser = () => {
    return new AuthorRole({ label: 'user' });
};

export {
    getAssistant,
    getUser
};
