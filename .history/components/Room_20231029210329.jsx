import { CuboidCollider } from '@react-three/rapier'
import Router from 'next/router'
export default function Room(props) {
	return (
		<CuboidCollider
			sensor
			position={props.position}
			args={props.args}
			onIntersectionEnter={() => {
				Router.push()
			}}
		/>
	)
}
