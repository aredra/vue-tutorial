import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'

import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('form'))
            .on('@submit', e=> this.onSubmit(e.detail.input))
            .on('@reset', e=> this.onReset(e));

        ResultView.setup(document.querySelector('#search-result'));
    },

    search(query) {
        console.log(tag, 'search()', query);
        SearchModel.list(query).then(res =>  {
            this.onSearchResult(res);  
        })
        .catch(err => {
            console.log(err);
        })
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input);
        this.search(input);
    },

    onReset(input) {
        console.log(tag, 'onReset()', input);
        ResultView.hide();
    },

    onSearchResult(data) {
        ResultView.render(data);
    }
}