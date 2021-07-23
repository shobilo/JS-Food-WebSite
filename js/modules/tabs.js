function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  ///////Tabs
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
      tabsContent.forEach(tab => {
          tab.classList.add('hide');
          tab.classList.remove('show');
      });
      
      tabs.forEach(tab => {
          tab.classList.remove();
      });
  }

  function showTabContent(num = 0) {
      tabsContent[num].classList.add('show', 'fade');
      tabsContent[num].classList.remove('hide');
      tabs[num].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
      const target = event.target;
      
      if(target && target.classList.contains(tabsSelector.slice(1))) {
          tabs.forEach((tab, i) => {
              if (target == tab) {
                  hideTabContent();
                  showTabContent(i);
              }
          });
      }
  });
}

export default tabs;