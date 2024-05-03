'use client'

import * as THREE from 'three'
import { FC, useRef, useState } from 'react'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { Image, ImageProps } from '@react-three/drei'
import { easing } from 'maath'
import '@/extendedElements/bentPlaneGeometry'

const Card: FC<ImageProps> = (props) => {
	const ref =
		useRef<
			THREE.Mesh<
				THREE.BufferGeometry<THREE.NormalBufferAttributes>,
				THREE.Material | THREE.Material[],
				THREE.Object3DEventMap
			>
		>(null)
	const [hovered, hover] = useState(false)
	const pointerOver = (e: ThreeEvent<PointerEvent>) => (
		e.stopPropagation(), hover(true)
	)
	const pointerOut = () => hover(false)
	useFrame((_state, delta) => {
		if (!ref.current) return
		easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
		easing.damp(
			ref.current.material,
			'radius',
			hovered ? 0.25 : 0.1,
			0.2,
			delta,
		)
		easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
	})

	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<Image
			ref={ref}
			transparent
			side={THREE.DoubleSide}
			onPointerOver={pointerOver}
			onPointerOut={pointerOut}
			{...props}
		>
			<bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
		</Image>
	)
}

export default Card
