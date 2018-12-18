import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/brett/Sites/cmsfrontend/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard/workplace",
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard",
            "redirect": "/dashboard/workplace",
            "exact": true
          },
          {
            "path": "/dashboard/workplace",
            "name": "workplace",
            "component": dynamic({ loader: () => import('../Dashboard/Workplace'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/cms",
        "name": "cms",
        "icon": "folder-open",
        "routes": [
          {
            "path": "/cms",
            "redirect": "/cms/news/list",
            "exact": true
          },
          {
            "path": "/cms/news",
            "name": "news",
            "icon": "global",
            "routes": [
              {
                "path": "/cms/news/list",
                "name": "list",
                "component": dynamic({ loader: () => import('../News/NewsList'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/news/add",
                "name": "add",
                "component": dynamic({ loader: () => import('../News/News'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/news/:id/detail",
                "name": "detail",
                "hideInMenu": true,
                "component": dynamic({ loader: () => import('../News/NewsDetail'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/news/categories",
                "name": "categories",
                "component": dynamic({ loader: () => import('../News/Category'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/cms/nav",
            "name": "nav",
            "icon": "compass",
            "routes": [
              {
                "path": "/cms/nav/navmng",
                "name": "navmng",
                "component": dynamic({ loader: () => import('../Cont/Nav/NavMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/nav/navadd",
                "name": "navadd",
                "component": dynamic({ loader: () => import('../Cont/Nav/NavAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/nav/navedit",
                "name": "navedit",
                "component": dynamic({ loader: () => import('../Cont/Nav/NavEdit'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/nav/navsee",
                "name": "navsee",
                "component": dynamic({ loader: () => import('../Cont/Nav/NavSee'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/cms/prod",
            "name": "prod",
            "icon": "appstore",
            "routes": [
              {
                "path": "/cms/prod/prodmng",
                "name": "prodmng",
                "component": dynamic({ loader: () => import('../Cont/Prod/ProdMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/prod/prodadd",
                "name": "prodadd",
                "component": dynamic({ loader: () => import('../Cont/Prod/ProdAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/prod/prodclamng",
                "name": "prodclamng",
                "component": dynamic({ loader: () => import('../Cont/Prod/ProdClaMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/cms/case",
            "name": "case",
            "icon": "profile",
            "routes": [
              {
                "path": "/cms/case/casemng",
                "name": "casemng",
                "component": dynamic({ loader: () => import('../Cont/Case/CaseMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/case/caseadd",
                "name": "caseadd",
                "component": dynamic({ loader: () => import('../Cont/Case/CaseAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/case/caseclamng",
                "name": "caseclamng",
                "component": dynamic({ loader: () => import('../Cont/Case/CaseClaMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/cms/solve",
            "name": "solve",
            "icon": "file-done",
            "routes": [
              {
                "path": "/cms/solve/solvemng",
                "name": "solvemng",
                "component": dynamic({ loader: () => import('../Cont/Solve/SolveMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/solve/solveadd",
                "name": "solveadd",
                "component": dynamic({ loader: () => import('../Cont/Solve/SolveAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/solve/solveclamng",
                "name": "solveclamng",
                "component": dynamic({ loader: () => import('../Cont/Solve/SolveClaMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/cms/page",
            "name": "page",
            "icon": "file",
            "routes": [
              {
                "path": "/cms/page/pagemng",
                "name": "pagemng",
                "component": dynamic({ loader: () => import('../Cont/Page/PageMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/cms/page/pageadd",
                "name": "pageadd",
                "component": dynamic({ loader: () => import('../Cont/Page/PageAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/advpic",
        "name": "advpic",
        "icon": "robot",
        "routes": [
          {
            "path": "/advpic",
            "redirect": "/advpic/adv/advmng",
            "exact": true
          },
          {
            "path": "/advpic/adv",
            "name": "adv",
            "icon": "interation",
            "routes": [
              {
                "path": "/advpic/adv/advmng",
                "name": "advmng",
                "component": dynamic({ loader: () => import('../AdvPic/Advert/AdvMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/advpic/adv/advadd",
                "name": "advadd",
                "component": dynamic({ loader: () => import('../AdvPic/Advert/AdvAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/advpic/pic",
            "name": "pic",
            "icon": "picture",
            "routes": [
              {
                "path": "/advpic/pic/picmng",
                "name": "picmng",
                "component": dynamic({ loader: () => import('../AdvPic/Picture/PicMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/advpic/pic/picadd",
                "name": "picadd",
                "component": dynamic({ loader: () => import('../AdvPic/Picture/PicAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/ability",
        "name": "ability",
        "icon": "team",
        "routes": [
          {
            "path": "/ability",
            "redirect": "/ability/recruit/recruitmng",
            "exact": true
          },
          {
            "path": "/ability/recruit",
            "name": "recruit",
            "icon": "user-add",
            "routes": [
              {
                "path": "/ability/recruit/recruitmng",
                "name": "recruitmng",
                "component": dynamic({ loader: () => import('../Ability/Recruit/RecruitMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/ability/recruit/recruitadd",
                "name": "recruitadd",
                "component": dynamic({ loader: () => import('../Ability/Recruit/RecruitAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/quelea",
        "name": "quelea",
        "icon": "question-circle",
        "routes": [
          {
            "path": "/quelea",
            "redirect": "/quelea/quest/quemng",
            "exact": true
          },
          {
            "path": "/quelea/quest",
            "name": "quest",
            "icon": "question-circle",
            "routes": [
              {
                "path": "/quelea/quest/quemng",
                "name": "quemng",
                "component": dynamic({ loader: () => import('../QueLea/Quest/QueMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/quelea/quest/queedit",
                "name": "queedit",
                "component": dynamic({ loader: () => import('../QueLea/Quest/QueEdit'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/quelea/faq",
            "name": "faq",
            "icon": "question",
            "routes": [
              {
                "path": "/quelea/faq/faqmng",
                "name": "faqmng",
                "component": dynamic({ loader: () => import('../QueLea/FAQ/FAQMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/quelea/faq/faqadd",
                "name": "faqadd",
                "component": dynamic({ loader: () => import('../QueLea/FAQ/FAQAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/quelea/faq/faqclamng",
                "name": "faqclamng",
                "component": dynamic({ loader: () => import('../QueLea/FAQ/FAQClaMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/quelea/leave",
            "name": "leave",
            "icon": "message",
            "routes": [
              {
                "path": "/quelea/leave/leavemng",
                "name": "leavemng",
                "component": dynamic({ loader: () => import('../QueLea/Leave/LeaveMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/quelea/leave/leavedetail",
                "name": "leavedetail",
                "component": dynamic({ loader: () => import('../QueLea/Leave/LeaveDetail'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/downlink",
        "name": "downlink",
        "icon": "cloud-download",
        "routes": [
          {
            "path": "/downlink",
            "redirect": "/downlink/down/downmng",
            "exact": true
          },
          {
            "path": "/downlink/down",
            "name": "down",
            "icon": "download",
            "routes": [
              {
                "path": "/downlink/down/downmng",
                "name": "downmng",
                "component": dynamic({ loader: () => import('../DownLink/Down/DownMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/downlink/down/downadd",
                "name": "downadd",
                "component": dynamic({ loader: () => import('../DownLink/Down/DownAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/downlink/down/downclamng",
                "name": "downclamng",
                "component": dynamic({ loader: () => import('../DownLink/Down/DownClaMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/downlink/link",
            "name": "link",
            "icon": "branches",
            "routes": [
              {
                "path": "/downlink/link/linkmng",
                "name": "linkmng",
                "component": dynamic({ loader: () => import('../DownLink/Link/LinkMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/downlink/link/linkadd",
                "name": "linkadd",
                "component": dynamic({ loader: () => import('../DownLink/Link/LinkAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/website",
        "name": "website",
        "icon": "bank",
        "routes": [
          {
            "path": "/website",
            "redirect": "/website/web/webmng",
            "exact": true
          },
          {
            "path": "/website/web",
            "name": "web",
            "icon": "bank",
            "routes": [
              {
                "path": "/website/web/webmng",
                "name": "webmng",
                "component": dynamic({ loader: () => import('../Website/Web/WebMng'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/website/web/webadd",
                "name": "webadd",
                "component": dynamic({ loader: () => import('../Website/Web/WebAdd'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/system",
        "name": "system",
        "icon": "tool",
        "routes": [
          {
            "path": "/",
            "redirect": "/system/setting",
            "exact": true
          },
          {
            "path": "/system/setting",
            "name": "setting",
            "component": dynamic({ loader: () => import('../Dashboard/Workplace'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/system/cdn",
            "name": "cdn",
            "component": dynamic({ loader: () => import('../Dashboard/Workplace'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/system/user",
            "name": "user",
            "component": dynamic({ loader: () => import('../Dashboard/Workplace'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/system/role",
            "name": "role",
            "component": dynamic({ loader: () => import('../Dashboard/Workplace'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/system/log",
            "name": "log",
            "component": dynamic({ loader: () => import('../Dashboard/Workplace'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('/Users/brett/Sites/cmsfrontend/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/brett/Sites/cmsfrontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
