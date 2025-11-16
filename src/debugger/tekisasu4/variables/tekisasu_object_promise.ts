import { TekisasuVariable } from "../../debug_runtime";

export interface TekisasuObject {
	tekisasu_id: bigint;
	type: string;
	sub_values: TekisasuVariable[];
}

/**
 * A promise that resolves to a {@link TekisasuObject}.
 *
 * This promise is used to handle the asynchronous nature of requesting a Tekisasu object.
 * It is used as a placeholder until the actual object is received.
 *
 * When the object is received from the server, the promise is resolved with the object.
 * If the object is not received within a certain time, the promise is rejected with an error.
 */
export class TekisasuObjectPromise {
	private _resolve!: (value: TekisasuObject | PromiseLike<TekisasuObject>) => void;
	private _reject!: (reason?: any) => void;
	public promise: Promise<TekisasuObject>;
	private timeoutId?: NodeJS.Timeout;

	constructor(timeoutMs?: number) {
		this.promise = new Promise<TekisasuObject>((resolve_arg, reject_arg) => {
			this._resolve = resolve_arg;
			this._reject = reject_arg;

			if (timeoutMs !== undefined) {
				this.timeoutId = setTimeout(() => {
					reject_arg(new Error("TekisasuObjectPromise timed out"));
				}, timeoutMs);
			}
		});
	}

	async resolve(value: TekisasuObject) {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = undefined;
		}
		await this._resolve(value);
	}

	async reject(reason: Error) {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = undefined;
		}
		await this._reject(reason);
	}
}
