Component({
    properties: {
        // 按钮类型，可选值为 'primary' 或 'secondary'
        type: {
            type: String,
            value: 'primary' // 默认主按钮样式
        },
        // 按钮文字
        text: {
            type: String,
            value: '按钮'
        },
        // 点击事件的回调函数名
        bindtap: {
            type: String,
            value: ''
        },
        width: {
            type: String,
            value: '75%'
        },
        iconPath: {
            type: String,
            value: ''
        }
    },

    methods: {
        handleTap() {
            // 触发父组件绑定的点击事件
            this.triggerEvent('buttontap');
        }
    }
}); 