import { MeshBasicMaterial, MeshBasicMaterialParameters } from 'three'

declare module 'three' {
	interface MeshSineMaterial extends MeshBasicMaterial {
		constructor(parameters?: MeshBasicMaterialParameters)
		time: { value: number }
	}
}
