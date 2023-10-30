import React from 'react'

function Floor(props) {
	return (
		<mesh {...props} recieveShadow>
			<boxBufferGeometry args={[40, 1, 40]} />
			<meshPhysicalMaterial color='white' />
		</mesh>
	)
}

export default Floor
