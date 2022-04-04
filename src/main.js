import { createApp } from 'vue'
import App from './App.vue'
import {Button,
    Icon,
    Tab,
    Tabs,
    TreeSelect,
    Stepper,
    ActionBar,
    ActionBarIcon,
    ActionBarButton,
    Toast,
    CheckboxGroup,
    Checkbox,
    SubmitBar,
    ContactCard,
    Card,
    Dialog,
    AddressList,
    AddressEdit,
    Field,
    CellGroup,
    Form,
} from "vant"
import 'amfe-flexible';
import router from "./router/index"
import './common/css/bale.less'
import store from './store';

const app =createApp(App)

app.use(Button)
.use(Icon)
.use(Tab)
.use(Tabs)
.use(TreeSelect)
.use(Stepper)
.use(ActionBar)
.use(ActionBarIcon)
.use(ActionBarButton)
.use(Toast)
.use(Checkbox)
.use(CheckboxGroup)
.use(SubmitBar)
.use(ContactCard)
.use(Card)
.use(AddressList)
.use(Dialog)
.use(AddressEdit)
.use(Field)
.use(CellGroup)
.use(Form)
app.use(router)
app.use(store)

app.mount('#app')
