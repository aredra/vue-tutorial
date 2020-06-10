import View from './View.js'

const tag = '[TabViw]';

const TabView = Object.create(View);

TabView.setup = function (el) {
    this.init(el);
    this.bindClicks();
    return this;
}

TabView.setActiveTab = function (tabName) {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = li.innerHTML === tabName ? 'active' : '';
    })
}

TabView.bindClicks = function () {
  this.el.addEventListener("click", (e) => this.tabsEmit(e));
};

TabView.tabsEmit = function(e) {
    this.setActiveTab(e.target.textContent);
    this.emit("@" + e.target.id, { selected: e.target.textContent});
}

export default TabView;