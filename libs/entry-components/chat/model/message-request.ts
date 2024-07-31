import { Message } from "./message";

export class MessageRequest  {
    messages?: Message[];

    constructor(data?: MessageRequest) {
       this.messages = data.messages;
    }
}