import { ExpoDevice, PostDevicesRequest, PostDevicesResponse } from '@sogdagim/model'
import Api from './api'

export default class DeviceFetcher extends Api {
	async postDevice(device: ExpoDevice): Promise<PostDevicesResponse> {
		const url = `/devices`
		const data = await this.post<PostDevicesRequest, PostDevicesResponse>(url, device)
		return data
	}

}
