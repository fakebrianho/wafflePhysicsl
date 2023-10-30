import styles from '@/styles/Home.module.css'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import Floor from '@/components/Floor'
// import { useRigidBodyContext } from '@react-three/rapier/dist/declarations/src/components/RigidBody'
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
	const [ref, api] = useRigidBody(() => ({
		type: 'dynamic',
		position: [0, 2, 0],
	}))

	useEffect(() => {
		const handleKeyDown = (event) => {
			switch (event.key) {
				case 'ArrowUp':
					api.applyImpulse([0, 0, -10])
					break
				case 'ArrowDown':
					api.applyImpulse([0, 0, 10])
					break
				case 'ArrowLeft':
					api.applyImpulse([-10, 0, 0])
					break
				case 'ArrowRight':
					api.applyImpulse([10, 0, 0])
					break
				default:
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [api])

	return (
		<mesh ref={ref}>
			<Box />
		</mesh>
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
						{/* <RigidBody colliders={'hull'} restitution={2}>
							<Box />
						</RigidBody> */}
						<Player />
						<CuboidCollider
							position={[0, -1, 0]}
							args={[20, 0.5, 20]}
						/>
					</Physics>
					<Floor position={[0, -1, 0]} />
					<LightBulb position={[0, 3, 0]} />
					{/* <Box rotateX={3} rotateY={0.2} /> */}
					<Controls />
					<ambientLight color={'white'} intensity={0.3} />
				</Canvas>
			</Suspense>
		</div>
	)
}
