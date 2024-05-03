import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// Paul West @prisoner849 https://discourse.threejs.org/u/prisoner849
// https://discourse.threejs.org/t/simple-curved-plane/26647/10

export class MeshSineMaterial extends THREE.MeshBasicMaterial {
	time: { value: number }
	constructor(parameters: THREE.MaterialParameters = {}) {
		super(parameters)
		this.setValues(parameters)
		this.time = { value: 0 }
	}
	onBeforeCompile(shader: THREE.WebGLProgramParametersWithUniforms) {
		shader.uniforms.time = this.time
		shader.vertexShader = `
      uniform float time;
      ${shader.vertexShader}
    `
		shader.vertexShader = shader.vertexShader.replace(
			'#include <begin_vertex>',
			`vec3 transformed = vec3(position.x, position.y + sin(time + uv.x * PI * 4.0) / 4.0, position.z);`,
		)
	}
}

extend({ MeshSineMaterial })
