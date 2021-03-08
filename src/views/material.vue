<template>
  <div></div>
</template>

<script>

import { Mesh, OrthographicCamera, Scene, WebGLRenderer, BufferGeometry, BufferAttribute, MeshBasicMaterial, DoubleSide, PointsMaterial, Points, AxesHelper, VertexColors, Geometry, Vector3, Face3, Color, MeshLambertMaterial, PlaneBufferGeometry, BoxGeometry, FaceColors, BackSide, AmbientLight, PlaneGeometry, DirectionalLight, Group, SphereGeometry, MeshPhongMaterial, CylinderGeometry, ArcCurve, LineBasicMaterial, Line, TextureLoader, PointLight, ImageLoader, Texture, RepeatWrapping, CatmullRomCurve3, TubeGeometry } from 'three'
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
    // 纹理贴图映射到一个矩形平面上
    /* var geometry = new SphereGeometry(300, 50, 50) // 矩形平面

    // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
    var textureLoader = new TextureLoader()
    // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
    textureLoader.load('./earth3.jpg', function (texture) {
      var material = new MeshLambertMaterial({
        // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
        map: texture // 设置颜色贴图属性值
      }) // 材质对象Material
      var mesh = new Mesh(geometry, material) // 网格模型对象Mesh
      scene.add(mesh) // 网格模型添加到场景中
    }) */

    // 图片加载器
    /* var imageLoader = new ImageLoader()
    // load方法回调函数，按照路径加载图片，返回一个html的元素img对象
    imageLoader.load('./earth.jpg', function (img) {
      // image对象作为参数，创建一个纹理对象Texture
      var texture = new Texture(img)
      // 下次使用纹理时触发更新
      texture.needsUpdate = true
      var material = new MeshLambertMaterial({
        map: texture // 设置纹理贴图
      })
      var mesh = new Mesh(geometry, material) // 网格模型对象Mesh
      scene.add(mesh) // 网格模型添加到场景中
    })
 */

    /**
 * 创建一个地面
 */
    /* var geometry = new PlaneGeometry(1000, 1000) // 矩形平面
    // 加载树纹理贴图
    var texture = new TextureLoader().load('./grass.jpg')
    // 设置阵列
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    // uv两个方向纹理重复数量
    texture.repeat.set(10, 10)
    var material = new MeshLambertMaterial({
      map: texture
    })
    var mesh = new Mesh(geometry, material) // 网格模型对象Mesh
    scene.add(mesh) // 网格模型添加到场景中
    mesh.rotateX(-Math.PI / 2)
     */

    /**
 * 创建一个设置重复纹理的管道
 */
    var curve = new CatmullRomCurve3([
      new Vector3(-80, -40, 0),
      new Vector3(-70, 40, 0),
      new Vector3(70, 40, 0),
      new Vector3(80, -40, 0)
    ])
    var tubeGeometry = new TubeGeometry(curve, 100, 1, 50, false)
    var textureLoader = new TextureLoader()
    var texture = textureLoader.load('./zebra.jpg')
    // 设置阵列模式为 RepeatWrapping
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
    // 等价texture.repeat= new Vector2(20,1)
    texture.repeat.x = 20
    var tubeMaterial = new MeshPhongMaterial({
      map: texture,
      transparent: true
    })
    var mesh = new Mesh(tubeGeometry, tubeMaterial)
    scene.add(mesh)

    const point = new AmbientLight(0xffffff)
    point.position.set(400, 200, 300)
    scene.add(point)

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
      texture.offset.x -= 0.06
    }
    render()
    /* eslint no-unused-vars: 'off' */
    const controls = new OrbitControls(camera, renderer.domElement)
  }
}
</script>

<style lang="less" scoped>
</style>
