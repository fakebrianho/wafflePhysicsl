import { CuboidCollider } from '@react-three/rapier'
import { useRouter } from 'next/router'

export default function Room(props) {
	const router = useRouter()

	return (
		<CuboidCollider
			sensor
			position={props.position}
			args={props.args}
			onIntersectionEnter={() => {
				router.push(`${props.url}`)
			}}
		/>
	)
}
