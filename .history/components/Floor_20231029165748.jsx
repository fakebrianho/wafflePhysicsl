import React from 'react'

function Floor(props) {
	return (
		<mesh {...props} recieveShadow>
			<boxBufferGeometry args={[30, 1, 30]} />
			<meshPhysicalMaterial color='white' />
		</mesh>
	)
}

export default Floor
