import styles from '@/styles/Home.module.css'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import Floor from '@/components/Floor'
// import { useRigidBodyContext } from '@react-three/rapier/dist/declarations/src/components/RigidBody'
import { useEffect } from 'react'
// import Box from '@/components/Box'
import LightBulb from '@/components/Lightbulb'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
	Physics,
	RigidBody,
	CuboidCollider,
	useRigidBody,
	useRapierPhysics,
	useRapierBox,
	RapierRigidBody,
	BoxCollider,
} from '@react-three/rapier'
import { Torus } from '@react-three/drei'
import { Box } from '@react-three/drei'
extend({ OrbitControls })

function Controls() {
	const controls = useRef()
	const { camera, gl } = useThree()
	useFrame(() => controls.current.update())
	return (
		<orbitControls
			ref={controls}
			args={[camera, gl.domElement]}
			enableDamping
			dampingFactor={0.1}
			rotateSpeed={0.5}
		/>
	)
}

function Player() {
	const rigidBodyRef = useRef(null)

	useEffect(() => {
		const handleKeyDown = (event) => {
			let impulse
			switch (event.key) {
				case 'ArrowUp':
					impulse = { x: 0, y: 0, z: -10 }
					break
				case 'ArrowDown':
					impulse = { x: 0, y: 0, z: 10 }
					break
				case 'ArrowLeft':
					impulse = { x: -10, y: 0, z: 0 }
					break
				case 'ArrowRight':
					impulse = { x: 10, y: 0, z: 0 }
					break
				default:
					return
			}
			rigidBodyRef.current.applyImpulse(impulse, true)
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return (
		<RigidBody ref={rigidBodyRef}>
			<Box />
		</RigidBody>
	)
}

export default function Home() {
	return (
		<div className={styles.scene}>
			<Suspense>
				<Canvas
					shadows
					className={styles.canvas}
					camera={{
						position: [-6, 7, 7],
					}}
				>
					<Physics debug>
						<Player />
						<CuboidCollider
							position={[0, -1, 0]}
							args={[20, 0.5, 20]}
						/>
					</Physics>
					<Floor position={[0, -1, 0]} />
					<LightBulb position={[0, 3, 0]} />
					<Controls />
					<ambientLight color={'white'} intensity={0.3} />
				</Canvas>
			</Suspense>
		</div>
	)
}
