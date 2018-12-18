import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('/Users/brett/Sites/cmsfrontend/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/brett/Sites/cmsfrontend/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/brett/Sites/cmsfrontend/src/models/login.js').default) });
app.model({ namespace: 'project', ...(require('/Users/brett/Sites/cmsfrontend/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/brett/Sites/cmsfrontend/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/brett/Sites/cmsfrontend/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/User/models/register.js').default) });
app.model({ namespace: 'activities', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/Dashboard/models/activities.js').default) });
app.model({ namespace: 'chart', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/Dashboard/models/chart.js').default) });
app.model({ namespace: 'monitor', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/Dashboard/models/monitor.js').default) });
app.model({ namespace: 'news', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/News/models/news.js').default) });
app.model({ namespace: 'newsCategories', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/News/models/newsCategories.js').default) });
app.model({ namespace: 'nav', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/Cont/Nav/models/nav.js').default) });
app.model({ namespace: 'prod', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/Cont/Prod/models/prod.js').default) });
app.model({ namespace: 'cases', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/Cont/Case/models/cases.js').default) });
app.model({ namespace: 'solve', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/Cont/Solve/models/solve.js').default) });
app.model({ namespace: 'page', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/Cont/Page/models/page.js').default) });
app.model({ namespace: 'advert', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/AdvPic/Advert/models/advert.js').default) });
app.model({ namespace: 'picture', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/AdvPic/Picture/models/picture.js').default) });
app.model({ namespace: 'advert.1', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/Ability/Recruit/models/advert.1.js').default) });
app.model({ namespace: 'quest', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/QueLea/Quest/models/quest.js').default) });
app.model({ namespace: 'faq', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/QueLea/FAQ/models/faq.js').default) });
app.model({ namespace: 'leave', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/QueLea/Leave/models/leave.js').default) });
app.model({ namespace: 'down', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/DownLink/Down/models/down.js').default) });
app.model({ namespace: 'link', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/DownLink/Link/models/link.js').default) });
app.model({ namespace: 'web', ...(require('/Users/brett/Sites/cmsfrontend/src/pages/Website/Web/models/web.js').default) });
