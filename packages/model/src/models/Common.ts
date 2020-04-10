// tslint:disable:variable-name
export class BaseModel<T, I> {
	success: boolean
	datas: T | null
	error: {
		code: I | null
		message: string | null
	} | null
}
