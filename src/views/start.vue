<template>
  <div></div>
</template>

<script>

import { AmbientLight, SphereGeometry, Mesh, MeshLambertMaterial, OrthographicCamera, PointLight, Scene, WebGLRenderer, CylinderGeometry, OctahedronGeometry, IcosahedronBufferGeometry, AxesHelper, MeshPhongMaterial } from 'three'
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
    // 创建场景对象
    const scene = new Scene()
    /* 创建网格模型
     * 创建一个立方体几何对象   new SphereGeometry(60, 40, 40); //创建一个球体几何对象
     * 材质对象Material
     * 网格模型对象Mesh
     * 网格模型添加到场景中
    */
    // const geometry = new SphereGeometry(100, 100, 100)
    // const geometry = new CylinderGeometry(1, 50, 100, 100)  // 圆柱
    // const geometry = new OctahedronGeometry(50) // 正八面体
    const geometry = new IcosahedronBufferGeometry(50) // 正二十面体
    const material = new MeshLambertMaterial({ // Lambert网格材质，与光照有反应，漫反射
      color: 0xff0000,
      transparent: true,
      opacity: 0.7,
      wireframe: true // 将几何图形渲染为线框
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    const mesh1 = new Mesh(new CylinderGeometry(1, 50, 150, 100), new MeshPhongMaterial({ // 高光Phong材质,与光照有反应 镜面反射
      color: 0x00ff00,
      specular: 0xffffff,
      shininess: 24
    })) // 高光效果
    // mesh1.translateY(120)
    mesh1.position.set(120, 100, 0) // 设置mesh3模型对象的xyz坐标
    scene.add(mesh1)

    // 辅助三维坐标系
    const axesHelper = new AxesHelper(250)
    scene.add(axesHelper)

    /* 光源设置   环境光、点光源、平行光如太阳光、聚光源
     * 点光源
     * 点光源位置
     * 点光源添加到场景中
     * 环境光
     * 环境光添加到场景中
    */
    const point = new PointLight(0xffffff)
    point.position.set(400, 200, 300)
    scene.add(point)
    // const ambient = new AmbientLight(0xaaaaaa)
    // scene.add(ambient)
    /* 相机设置
     *
     *
     * 窗口宽高比
     * 三维场景显示范围控制系数，系数越大，显示的范围越大   拍照窗口大小
     * 创建正交相机 在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。
       left — 摄像机视锥体左侧面。
       right — 摄像机视锥体右侧面。
       top — 摄像机视锥体上侧面。
       bottom — 摄像机视锥体下侧面。
       near — 摄像机视锥体近端面。
       far — 摄像机视锥体远端面。

     * 设置相机位置
     * 设置相机位置设置相机方向(指向的场景方向)
    */
    const w = window.innerWidth - 256 - 48
    const h = 300
    const r = w / h
    const s = 300
    const camera = new OrthographicCamera(-s * r, s * r, s, -s, 1, 1000)
    camera.position.set(300, 300, 400)
    camera.lookAt(scene.position)

    /* 创建渲染器对象
     * 设置区域尺寸
     * 设置背景颜色
     * body元素中插入canvas对象
     * 执行渲染操作   指定场景、相机作为参数
    */
    const renderer = new WebGLRenderer()
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 1)
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
      mesh.rotateY(0.001 * t)// 旋转角速度0.001弧度每毫秒
    }
    render()

    /* 鼠标操作三维场景
     * 创建控件对象
     * 监听鼠标、键盘事件
    */

    /* eslint no-unused-vars: 'off' */
    const controls = new OrbitControls(camera, renderer.domElement)
    /* controls.addEventListener('change', () => {
      renderer.render(scene, camera)
    }) */
  }
}
</script>

<style lang="less" scoped>
</style>
