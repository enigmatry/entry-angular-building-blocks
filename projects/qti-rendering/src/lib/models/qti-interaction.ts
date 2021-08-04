import { CompletionStatus } from './completion-status.enum';
import { OutcomeDeclaration } from './outcome-declaration';
import { ResponseDeclaration } from './response-declaration';

export interface QtiInteraction {
    responseIdentifier: string;
    completionStatus: CompletionStatus;

    isValid(): boolean;
    isResponded(): boolean;
    getCandidateResponse(): ResponseDeclaration;
    completeAndShowFeedback(outcome: OutcomeDeclaration): void;
    reset(): void;
}
