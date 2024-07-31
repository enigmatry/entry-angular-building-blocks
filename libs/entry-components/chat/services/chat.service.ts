import { Observable } from "rxjs";

export abstract class EntryChatService {
    public abstract getURL(): string;
    public abstract getAccessToken(): Observable<string>;
}