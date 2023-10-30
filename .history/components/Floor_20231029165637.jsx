import React from 'react'

function Floor(props) {
	return (
		<mesh {...props} recieveShadow>
			<boxBufferGeometry args={[20, 20, 10]} />
			<meshPhysicalMaterial color='white' />
		</mesh>
	)
}

export default Floor
