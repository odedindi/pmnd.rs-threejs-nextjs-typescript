import * as THREE from 'three'
import { FC, useRef } from 'react'
import { MeshProps, useFrame } from '@react-three/fiber'
import { useScroll, useTexture } from '@react-three/drei'
import '@/extendedElements/meshSineMaterial'

const Banner: FC<MeshProps> = (props) => {
	const ref =
		useRef<
			THREE.Mesh<
				THREE.BufferGeometry<THREE.NormalBufferAttributes>,
				THREE.MeshSineMaterial,
				THREE.Object3DEventMap
			>
		>(null)
	const texture = useTexture('/work_.png')
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping
	const scroll = useScroll()
	useFrame((_state, delta) => {
		if (!ref.current || !ref.current.material.map) return
		ref.current.material.time.value += Math.abs(scroll.delta) * 4
		ref.current.material.map.offset.x += delta / 2
	})
	return (
		<mesh ref={ref} {...props}>
			<cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
			<meshSineMaterial
				map={texture}
				map-anisotropy={16}
				map-repeat={[30, 1]}
				side={THREE.DoubleSide}
				toneMapped={false}
			/>
		</mesh>
	)
}

export default Banner
