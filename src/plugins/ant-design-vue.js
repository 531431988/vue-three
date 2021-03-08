import {
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  // Tag,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  // Collapse,
  // Steps,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  FormModel,
  Icon,
  Input,
  InputNumber,
  Layout,
  Menu,
  message,
  Modal,
  notification,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Result,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
  Tooltip,
  Transfer,
  Tree,

  // Switch,
  // Rate,
  Upload
} from 'ant-design-vue'
import Vue from 'vue'
const { Header, Content, Sider, Footer } = Layout
const FormItem = Form.Item
const FormModelItem = FormModel.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const SelectOption = Select.Option

const { Meta } = Card
const { TabPane } = Tabs
const Breadcrumbtem = Breadcrumb.Item
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const MenuDivider = Menu.Divider
const MenuItemGroup = Menu.ItemGroup
const DropdownButton = Dropdown.Button
// const CollapsePanel = Collapse.Panel
// const StepsStep = Steps.Step
const RangePicker = DatePicker.RangePicker
const MonthPicker = DatePicker.MonthPicker
const WeekPicker = DatePicker.WeekPicker
const { TreeNode } = Tree
const components = [
  Layout,
  Header,
  Content,
  Sider,
  Footer,
  Row,
  Col,
  Form,
  FormItem,
  FormModel,
  FormModelItem,
  Input,
  InputNumber,
  Select,
  SelectOption,
  Cascader,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  // Switch,
  // Rate,
  Upload,
  Button,
  // Tag,
  Meta,
  Card,
  Carousel,
  Pagination,
  Result,
  Table,
  Tabs,
  TabPane,
  Tree,
  TreeNode,
  Breadcrumb,
  Breadcrumbtem,
  Menu,
  Dropdown,
  DropdownButton,
  MenuItem,
  SubMenu,
  MenuDivider,
  MenuItemGroup,
  // Collapse, CollapsePanel,
  // Steps, StepsStep,
  Divider,
  Icon,
  Badge,
  Avatar,
  Modal,
  Popconfirm,
  Popover,
  Progress,
  Spin,
  DatePicker,
  RangePicker,
  MonthPicker,
  WeekPicker,
  Drawer,
  BackTop,
  Tooltip,
  Empty,
  Transfer,
  ConfigProvider
]
components.map(component => {
  Vue.use(component)
})

Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$destroyAll = Modal.destroyAll
Vue.prototype.$message = message
Vue.prototype.$Form = Form
