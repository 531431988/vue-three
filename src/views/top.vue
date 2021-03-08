<template>
  <div></div>
</template>

<script>

import { Mesh, OrthographicCamera, Scene, WebGLRenderer, BufferGeometry, BufferAttribute, MeshBasicMaterial, DoubleSide, PointsMaterial, Points, AxesHelper, VertexColors, Geometry, Vector3, Face3, Color, MeshLambertMaterial, PlaneBufferGeometry, BoxGeometry, FaceColors } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  components: {

  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    const scene = new Scene()
    /*  顶点位置数据解析渲染
    const geometry = new BufferGeometry() // 创建一个Buffer类型几何体对象
    const vertices = new Float32Array([
      0, 0, 0, // 顶点1坐标
      50, 0, 0, // 顶点2坐标
      0, 100, 0, // 顶点3坐标
      0, 0, 10, // 顶点4坐标
      0, 0, 100, // 顶点5坐标
      50, 0, 10 // 顶点6坐标
    ])

    // 创建属性缓冲区对象
    const attribue = new BufferAttribute(vertices, 3) // 3个为一组，表示一个顶点的xyz坐标
    // 设置几何体attributes属性的位置属性
    geometry.attributes.position = attribue

    // 三角面(网格)渲染模式
    // const material = new MeshBasicMaterial({
    //   color: VertexColors,
    //   side: DoubleSide // 两面可见
    // })
    // const mesh = new Mesh(geometry, material)
    // scene.add(mesh)
    const colors = new Float32Array([
      1, 0, 0, // 顶点1颜色
      0, 1, 0, // 顶点2颜色
      0, 0, 1, // 顶点3颜色

      1, 1, 0, // 顶点4颜色
      0, 1, 1, // 顶点5颜色
      1, 0, 1 // 顶点6颜色
    ])
    geometry.attributes.color = new BufferAttribute(colors, 3)
    // 点渲染模式
    const material = new PointsMaterial({
      vertexColors: VertexColors,
      size: 10.0 // 点对象像素尺寸
    }) // 材质对象
    const points = new Points(geometry, material) // 点模型对象
    scene.add(points) // 点对象添加到场景中 */

    /* // Face3对象定义Geometry的三角形面
    const geometry = new Geometry()
    // 顶点坐标添加到geometry对象
    geometry.vertices.push(new Vector3(0, 0, 0), new Vector3(50, 0, 0), new Vector3(0, 100, 0), new Vector3(0, 0, 100))
    // Face3构造函数创建一个三角面
    const face1 = new Face3(0, 1, 2) // 012分别是geometry.vertices下标
    // 设置三角面Face3三个顶点的法向量
    face1.vertexNormals.push(new Vector3(0, 0, -1), new Vector3(0, 0, -1), new Vector3(0, 0, -1))
    face1.vertexColors.push(new Color(0x00ff00), new Color(0xff0000), new Color(0x0000ff))
    const face2 = new Face3(0, 3, 1) // 031分别是geometry.vertices下标
    // 设置三角面法向量
    face2.normal = new Vector3(0, -1, 0)
    geometry.faces.push(face1, face2)
    // 设置材质
    const material = new MeshLambertMaterial({
      vertexColors: VertexColors,
      side: DoubleSide
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    console.log(geometry)
    console.log(new PlaneBufferGeometry(100, 100)) */

    const geometry = new BoxGeometry(100, 100, 100)
    console.log(geometry)
    geometry.faces.pop()
    geometry.faces.shift()
    geometry.faces.forEach(face => {
      face.vertexColors = [
        new Color(0xffff00),
        new Color(0xff00ff),
        new Color(0x00ffff)
      ]
    })
    const material = new MeshBasicMaterial({
      vertexColors: FaceColors
    })
    geometry.scale(0.5, 1.5, 2)
    const mesh = new Mesh(geometry, material)
    // mesh.scale.set(0.5, 1.5, 2)
    scene.add(mesh)

    // 辅助三维坐标系
    const axesHelper = new AxesHelper(250)
    scene.add(axesHelper)

    const w = window.innerWidth - 256 - 48
    const h = 300
    const r = w / h
    const s = 300
    const camera = new OrthographicCamera(-s * r, s * r, s, -s, 1, 1000)
    camera.position.set(300, 300, 400)
    camera.lookAt(scene.position)
    const renderer = new WebGLRenderer()
    renderer.setSize(w, h)
    renderer.setClearColor(0xf8f8f8, 1)
    this.$el.appendChild(renderer.domElement)

    // 自动旋转  均匀旋转
    let T0 = new Date()// 上次时间
    function render () {
      const T1 = new Date()// 本次时间
      const t = T1 - T0// 时间差
      T0 = T1// 把本次时间赋值给上次时间
      // 一般默认保持60FPS的频率，大约每16.7ms调用一次requestAnimationFrame()方法指定的函数
      requestAnimationFrame(render)
      renderer.render(scene, camera)// 执行渲染操作
    }
    render()
    /* eslint no-unused-vars: 'off' */
    const controls = new OrbitControls(camera, renderer.domElement)
  }
}
</script>

<style lang="less" scoped>
</style>
