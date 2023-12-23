import {vec3} from "gl-matrix"


function groupInto(size, mainArray) {
	const arrayOfArrays = []
	for (let i = 0; i < mainArray.length; i += size)
		arrayOfArrays.push(mainArray.slice(i, i + size))

	return arrayOfArrays
}

export default class PrimitiveProcessor {
	static computeNormals(indices, vertices) {
		if (!indices || !vertices)
			return []
		const faces = groupInto(3, indices)
		const positions = groupInto(3, vertices)
		const quantity = positions.length
		const normals = new Array(quantity)


		for (let i = 0; i < quantity; ++i)
			normals[i] = [0, 0, 0]

		for (let i = 0; i < faces.length; ++i) {
			let f = faces[i], p = 0, c = f[f.length - 1], n = f[0]
			for (let j = 0; j < f.length; ++j) {
				p = c
				c = n
				n = f[(j + 1) % f.length]

				const v0 = positions[p],
					v1 = positions[c],
					v2 = positions[n]

				let d01 = new Array(3),
					m01 = 0,
					d21 = new Array(3),
					m21 = 0

				if (v0 && v1 && v2) {
					vec3.sub(<vec3>d01, v0, v1)
					vec3.sub(<vec3>d21, v2, v1)
					m01 = vec3.dot(<vec3>d01, <vec3>d01)
					m21 = vec3.dot(<vec3>d21, <vec3>d21)

					if (m01 * m21 > 1e-6) {
						const norm = normals[c]
						const w = 1.0 / Math.sqrt(m01 * m21)
						for (let k = 0; k < 3; ++k) {
							const u = (k + 1) % 3, v = (k + 2) % 3
							norm[k] += w * (d21[u] * d01[v] - d21[v] * d01[u])
						}
					}
				}
			}
		}

		return normals.flat()
	}

	static computeTangents(indices, vertices, uvs, normals) {
		if (!indices || !vertices || !uvs || !normals)
			return []
		const norm = groupInto(3, normals)

		const groupedVertices = groupInto(3, vertices),
			groupedUVs = groupInto(2, uvs),
			tangents = [],
			tangentArray = [],
			triangles = groupInto(3, indices)

		for (let i = 0; i < groupedVertices.length; ++i) {
			tangents[i] = [0, 0, 0]
		}
		for (let i = 0; i < triangles.length; i++) {
			const i0 = triangles[i][0],
				i1 = triangles[i][1],
				i2 = triangles[i][2]

			const v0 = groupedVertices[i0],
				v1 = groupedVertices[i1],
				v2 = groupedVertices[i2],
				uv0 = groupedUVs[i0],
				uv1 = groupedUVs[i1],
				uv2 = groupedUVs[i2]
			const e1 = [], e2 = []

			if (v1 && v0 && v2) {
				vec3.sub(<vec3>e1, v1, v0)
				vec3.sub(<vec3>e2, v2, v0)

				const x1 = uv1[0] - uv0[0],
					x2 = uv2[0] - uv0[0],
					y1 = uv1[1] - uv0[1],
					y2 = uv2[1] - uv0[1]

				const div = x1 * y2 - x2 * y1

				const r = div === 0 ? 1 : 1 / div

				const tangent = [],
					tangentP1 = [],
					tangentP2 = []
				// TANGENT
				vec3.scale(<vec3>tangentP1, <vec3>e1, y2)
				vec3.scale(<vec3>tangentP2, <vec3>e2, y1)
				vec3.sub(<vec3>tangent, <vec3>tangentP1, <vec3>tangentP2)
				vec3.scale(<vec3>tangent, <vec3>tangent, r)

				vec3.add(tangents[i0], tangents[i0], <vec3>tangent)
				vec3.add(tangents[i1], tangents[i1], <vec3>tangent)
				vec3.add(tangents[i2], tangents[i2], <vec3>tangent)
			}
		}

		for (let i = 0; i < groupedVertices.length; i++) {
			const t0 = tangents[i],
				n = norm[i]

			const t = [0, 0, 0]
			const nCop = [0, 0, 0]
			vec3.scale(<vec3>nCop, n, vec3.dot(n, t0))
			vec3.sub(<vec3>t, t0, <vec3>nCop)
			vec3.normalize(<vec3>t, <vec3>t)
			tangentArray[i] = [t[0], t[1], t[2]]

		}

		return tangentArray.flat()
	}

	static computeBoundingBox(vertices) {
		if (vertices && vertices.length > 0) {
			const toVector = groupInto(3, vertices)
			const min = [], max = []
			const size = toVector.length
			for (let i = 0; i < size; i++) {
				const current = toVector[i]
				if (!min[0] || current[0] < min[0])
					min[0] = current[0]

				if (!min[1] || current[1] < min[1])
					min[1] = current[1]

				if (!min[2] || current[2] < min[2])
					min[2] = current[2]

				if (!max[0] || current[0] > max[0])
					max[0] = current[0]

				if (!max[1] || current[1] > max[1])
					max[1] = current[1]

				if (!max[2] || current[2] > max[2])
					max[2] = current[2]
			}

			return [min, max]

		} else
			return [0, 0]
	}
}