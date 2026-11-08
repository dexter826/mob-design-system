/* Framework-neutral tabs. Each enabled tab controls one labelled panel. */
(function () {
  let groupSequence = 0;
  function initTabs(root = document) {
    root.querySelectorAll('[role="tablist"]').forEach(list => {
      if (list.dataset.initialized) return;
      const group = ++groupSequence;
      list.dataset.initialized = 'true';
      const tabs = [...list.querySelectorAll('[role="tab"]')];
      const enabled = tabs.filter(tab => !tab.disabled && tab.getAttribute('aria-disabled') !== 'true');
      if (!enabled.length) return;
      const panels = tabs.map((tab,index) => {
        tab.id ||= `mob-tab-${group}-${index}`;
        let panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (!panel) {
          panel = document.createElement('div');
          panel.id = tab.id + '-panel';panel.className = 'app-tab-panel';
          panel.textContent = tab.dataset.panel || `${tab.textContent.trim()} — sample content for this view.`;
          list.parentNode.insertBefore(panel,list.nextSibling);
        }
        tab.setAttribute('aria-controls',panel.id);
        panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.tabIndex=0;
        return panel;
      });
      const activate = tab => tabs.forEach((candidate,index) => {
        const active=candidate===tab;
        candidate.setAttribute('aria-selected',String(active));candidate.tabIndex=active?0:-1;panels[index].hidden=!active;
      });
      activate(enabled.find(tab=>tab.getAttribute('aria-selected')==='true')||enabled[0]);
      enabled.forEach(tab => {
        tab.addEventListener('click',()=>activate(tab));
        tab.addEventListener('keydown',event=> {
          const vertical=list.getAttribute('aria-orientation')==='vertical';
          const forward=vertical?'ArrowDown':'ArrowRight', back=vertical?'ArrowUp':'ArrowLeft';
          const index=enabled.indexOf(tab);
          let next;
          if(event.key===forward) next=enabled[(index+1)%enabled.length];
          if(event.key===back) next=enabled[(index+enabled.length-1)%enabled.length];
          if(event.key==='Home') next=enabled[0];
          if(event.key==='End') next=enabled.at(-1);
          if(next) {event.preventDefault();activate(next);next.focus();}
        });
      });
    });
  }
  window.MobSignal={initTabs};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>initTabs());else initTabs();
})();
