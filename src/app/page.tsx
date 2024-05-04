'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, ScrollControls } from '@react-three/drei'
import { NextPage } from 'next'
import Banner from '@/components/banner'
import Carousel from '@/components/carousel'
import { Logo } from '@pmndrs/branding'

const carouselImages: { src: string }[] = Array.from(
	{ length: 10 },
	(_, i) => ({
		src: `/assets/img${Math.floor(i % 10) + 1}_.jpg`,
	}),
)

const radius = 2

const Page: NextPage = () => (
	<main className='h-screen pt-20'>
		<div className='h-96'>
			<Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
				<fog attach='fog' args={['#a79', 8.5, 12]} />
				<ScrollControls style={{ scrollbarWidth: 'none' }} pages={4} infinite>
					<Carousel
						rotation={[0, 0, 0.15]}
						images={carouselImages}
						radius={radius}
					/>
					<Banner position={[0, -0.15, 0]} radius={radius} />
				</ScrollControls>
				<Environment preset='dawn' background blur={0.5} />
			</Canvas>
		</div>
		<div>
			<a
				href='https://pmnd.rs/'
				target='_blank'
				rel='noopener noreferrer'
				className='absolute bottom-5 left-20 text-sm'
			>
				pmnd.rs
				<br />
				dev collective
			</a>
			<div className='absolute bottom-5 right-10 text-sm'>03. May 2024</div>
			<Logo className='absolute bottom-6 left-10 w-7' />
			<p className='absolute top-5 left-10 text-sm'>scroll up/down ...</p>
		</div>
	</main>
)
export default Page
