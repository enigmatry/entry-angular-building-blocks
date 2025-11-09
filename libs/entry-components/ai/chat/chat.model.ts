export class ChatMessage {
    constructor(readonly message: string, readonly isRequest: boolean, readonly timestamp: string) {}
}