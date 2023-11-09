
let selectorHandlerMap = {};
export function CountClicks(selector: string): ClassDecorator {
    return function (constructor: any) {
        const original = constructor.prototype.ngAfterViewChecked;
        constructor.prototype.ngAfterViewChecked = function () {
            const button = document.querySelector(selector);
            if (!selectorHandlerMap[selector] && button) {
                console.log('----try to install')
                selectorHandlerMap[selector] = {};
                selectorHandlerMap[selector]['clickCount'] = 0;
                selectorHandlerMap[selector]['handler'] = (e) => {

                    selectorHandlerMap[selector]['clickCount']++;
                    console.log('---clickCount', selectorHandlerMap[selector]['clickCount'], e.currentTarget);
                    this.renderer.setProperty(button, 'textContent', `Click Count: ${selectorHandlerMap[selector]['clickCount']}`);
                }
                button.addEventListener('click', selectorHandlerMap[selector]['handler']);
                console.log('--installed', selectorHandlerMap[selector]['handler'])
            }
        };
        if (original) {
            original.apply(this);
        }
    }
}

