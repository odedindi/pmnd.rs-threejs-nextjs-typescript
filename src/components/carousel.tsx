import * as THREE from 'three'
import { FC, useRef } from 'react'
import { GroupProps, useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { easing } from 'maath'

import Card from './card'

interface CarouselProps extends Omit<GroupProps, 'children'> {
	radius: number
	images: { src: string }[]
}

const Carousel: FC<CarouselProps> = ({ radius, images, ...props }) => {
	const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null)
	const scroll = useScroll()
	useFrame((state, delta) => {
		if (!ref.current) return
		ref.current.rotation.y = -scroll.offset * (Math.PI * 2) // Rotate contents
		state?.events?.update?.() // Raycasts every frame rather than on pointer-move
		easing.damp3(
			state.camera.position,
			[-state.pointer.x * 2, state.pointer.y + 1.5, 10],
			0.3,
			delta,
		) // Move camera
		state.camera.lookAt(0, 0, 0) // Look at center
	})
	const cardsCount = images.length
	return (
		<group ref={ref} {...props}>
			{images.map((image, i) => (
				<Card
					key={i}
					url={image.src}
					position={[
						Math.sin((i / cardsCount) * Math.PI * 2) * radius,
						0,
						Math.cos((i / cardsCount) * Math.PI * 2) * radius,
					]}
					rotation={[0, Math.PI + (i / cardsCount) * Math.PI * 2, 0]}
				/>
			))}
		</group>
	)
}

export default Carousel
