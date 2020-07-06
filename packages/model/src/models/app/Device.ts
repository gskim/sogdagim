export class ExpoDevice {
	isDevice: boolean

	brand: string | null

	manufacturer: string | null

	modelName: string | null

	// IOS only
	modelId: string | null

	// AND only
	designName: string | null

	// AND only
	productName: string | null

	deviceYearClass: number | null

	supportedCpuArchitectures: string[] | null

	osName: string

	osVersion: string

	osBuildId: string | null

	osInternalBuildId: string | null

	// AND only
	osBuildFingerprint: string | null

	// AND only
	platformApiLevel: number | null

	deviceName: string | null
}

export class PostDevicesResponse {
	success: boolean
}

export class PostDevicesRequest extends ExpoDevice  {

}
