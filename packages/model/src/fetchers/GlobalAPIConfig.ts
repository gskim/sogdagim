import { InterceptorManager } from './lib/InterceptorManager'

export class GlobalAPIConfig {
	static interceptors = new InterceptorManager()
}
