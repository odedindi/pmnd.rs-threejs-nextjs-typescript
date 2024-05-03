import { MeshBasicMaterial } from 'three'
import { Object3DNode, MaterialNode } from '@react-three/fiber'

import { MeshSineMaterial } from '@/extendedElements/meshSineMaterial'
import { BentPlaneGeometry } from '@/extendedElements/bentPlaneGeometry'

declare module '@react-three/fiber' {
	interface ThreeElements {
		bentPlaneGeometry: Object3DNode<BentPlaneGeometry, typeof BentPlaneGeometry>
		meshSineMaterial: MaterialNode<MeshSineMaterial, typeof MeshSineMaterial>
	}
}
