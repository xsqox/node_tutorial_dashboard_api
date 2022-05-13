import { Logger } from 'tslog';

export interface ILogger {
	logger: unknown; // allows different logger implementations
	log: (...args: unknown[]) => void;
	warn: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
}
