/* eslint-disable @typescript-eslint/naming-convention */
export class Events {
	static QtiElementCreated = 'qtiElementCreated';
	static QtiElementDestroyed = 'qtiElementDestroyed';
}

export class Tags {
	static readonly QtiPrompt = 'qti-prompt';
	static readonly QtiSimpleChoice = 'qti-simple-choice';
	static readonly QtiInlineChoice = 'qti-inline-choice';
	static readonly QtiGapText = 'qti-gap-text';
	static readonly QtiSimpleAssociableChoice = 'qti-simple-associable-choice';
	static readonly QtiSimpleMatchSet = 'qti-simple-match-set';
}
