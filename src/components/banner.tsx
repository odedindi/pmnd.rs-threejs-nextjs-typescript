import * as THREE from 'three'
import { FC, useRef } from 'react'
import { MeshProps, useFrame } from '@react-three/fiber'
import { useScroll, useTexture } from '@react-three/drei'
import '@/extendedElements/meshSineMaterial'

interface BannerProps extends MeshProps {
	radius: number
}

const Banner: FC<BannerProps> = ({ radius, ...props }) => {
	const ref =
		useRef<
			THREE.Mesh<
				THREE.BufferGeometry<THREE.NormalBufferAttributes>,
				THREE.MeshSineMaterial,
				THREE.Object3DEventMap
			>
		>(null)
	const texture = useTexture('/assets/work_.png')
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping
	const scroll = useScroll()
	useFrame((_state, delta) => {
		if (!ref.current || !ref.current.material.map) return
		ref.current.material.time.value += Math.abs(scroll.delta) * 4
		ref.current.material.map.offset.x += delta / 2
	})

	const radialSymmetry = Math.min(2.6, radius * 1.15)
	const height = Math.min(0.2, radius * 0.1)

	return (
		<mesh ref={ref} {...props}>
			<cylinderGeometry
				args={[radialSymmetry, radialSymmetry, height, 128, 16, true]}
			/>
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
