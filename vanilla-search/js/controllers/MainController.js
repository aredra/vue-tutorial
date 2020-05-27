import FormView from '../views/FormView.js'

const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('form'))
            .on('@submit', e=> this.onSubmit(e.detail.input))
            .on('@reset', e=> this.onReset(e));
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input);
    },

    onReset(input) {
        console.log(tag, 'onReset()', input);
    }
}