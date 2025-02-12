//    多个重复错误弹窗如何处理？
//  采用 错误队列机制 + 去重 + 弹窗提示统一管理

/**
 * 解决方案：
 * 错误队列：我们用一个队列（数组）来保存所有错误。
 * 去重：通过判断错误信息是否已经在队列中，避免同样的错误多次出现。
 * 弹窗管理：确保每次只有一个弹窗在展示，其他错误可以等待当前弹窗关闭后依次展示。
 */


class ErrorHandler {
    constructor() {
        this.errorQueue = [];  // 存储待显示的错误消息
        this.isPopupOpen = false;  // 标记弹窗是否已经打开
    }

    // 用于添加错误信息到队列
    addError(errorMessage) {
        // 防止重复错误（根据消息内容去重）
        if (!this.errorQueue.includes(errorMessage)) {
            this.errorQueue.push(errorMessage);
        }

        // 如果当前没有弹窗在显示，立即显示错误
        if (!this.isPopupOpen) {
            this.showNextError();
        }
    }

    // 显示下一个错误
    showNextError() {
        if (this.errorQueue.length === 0) {
            return;  // 如果队列为空，说明没有待显示的错误
        }

        const errorMessage = this.errorQueue.shift();  // 获取队列中的第一个错误
        this.displayErrorPopup(errorMessage);
    }

    // 显示弹窗
    displayErrorPopup(message) {
        this.isPopupOpen = true;  // 标记弹窗正在显示

        // 创建并显示弹窗，这里假设 createPopup 是一个显示弹窗的工具函数
        const popup = this.createPopup(message);

        // 设置弹窗关闭后的回调
        popup.onClose = () => {
            this.isPopupOpen = false;  // 弹窗关闭后，解除标志位
            this.showNextError();  // 弹窗关闭后，显示下一个错误
        };

        popup.show();
    }

    // 生成一个简单的错误提示弹窗
    createPopup(message) {
        const popup = document.createElement('div');
        popup.classList.add('error-popup');
        popup.innerText = message;

        // 假设点击弹窗关闭按钮时，调用这个方法
        popup.onclick = () => {
            this.closePopup(popup);
        };

        document.body.appendChild(popup);

        return {
            show: () => {
                popup.style.display = 'block';  // 显示弹窗
            },
            onClose: () => {
            },  // 默认空的回调函数
            close: () => {
                this.closePopup(popup);
            },
        };
    }

    // 关闭弹窗
    closePopup(popup) {
        popup.style.display = 'none';
        popup.remove();
    }
}

// 实例化错误处理器
const errorHandler = new ErrorHandler();

// 示例：模拟多个错误发生
errorHandler.addError("网络连接错误！");
errorHandler.addError("请求超时！");
errorHandler.addError("服务器错误！");

// 如果这些错误发生在不同的地方，都可以通过 errorHandler.addError() 来触发
