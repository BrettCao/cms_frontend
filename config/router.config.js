export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/dashboard/workplace',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard',
            redirect: '/dashboard/workplace',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      {
        path: '/cms',
        name: 'cms',
        icon: 'folder-open',
        routes: [
          {
            path: '/cms',
            redirect: '/cms/news/list',
          },
          {
            path: '/cms/news',
            name: 'news',
            icon: 'global',
            routes: [
              {
                path: '/cms/news/list',
                name: 'list',
                component: './News/NewsList',
              },
              {
                path: '/cms/news/add',
                name: 'add',
                component: './News/News',
              },
              {
                path: '/cms/news/:id/detail',
                name: 'detail',
                hideInMenu: true,
                component: './News/NewsDetail',
              },
              {
                path: '/cms/news/categories',
                name: 'categories',
                component: './News/Category',
              },
            ],
          },
          {
            path: '/cms/nav',
            name: 'nav',
            icon: 'compass',
            routes: [
              {
                path: '/cms/nav/navmng',
                name: 'navmng',
                component: './Cont/Nav/NavMng',
              },
              {
                path: '/cms/nav/navadd',
                name: 'navadd',
                component: './Cont/Nav/NavAdd',
              },
              {
                path: '/cms/nav/navedit',
                name: 'navedit',
                component: './Cont/Nav/NavEdit',
              },
              {
                path: '/cms/nav/navsee',
                name: 'navsee',
                component: './Cont/Nav/NavSee',
              },
            ],
          },
          {
            path: '/cms/prod',
            name: 'prod',
            icon: 'appstore',
            routes: [
              {
                path: '/cms/prod/prodmng',
                name: 'prodmng',
                component: './Cont/Prod/ProdMng',
              },
              {
                path: '/cms/prod/prodadd',
                name: 'prodadd',
                component: './Cont/Prod/ProdAdd',
              },
              {
                path: '/cms/prod/prodclamng',
                name: 'prodclamng',
                component: './Cont/Prod/ProdClaMng',
              },
            ],
          },
          {
            path: '/cms/case',
            name: 'case',
            icon: 'profile',
            routes: [
              {
                path: '/cms/case/casemng',
                name: 'casemng',
                component: './Cont/Case/CaseMng',
              },
              {
                path: '/cms/case/caseadd',
                name: 'caseadd',
                component: './Cont/Case/CaseAdd',
              },
              {
                path: '/cms/case/caseclamng',
                name: 'caseclamng',
                component: './Cont/Case/CaseClaMng',
              },
            ],
          },
          {
            path: '/cms/solve',
            name: 'solve',
            icon: 'file-done',
            routes: [
              {
                path: '/cms/solve/solvemng',
                name: 'solvemng',
                component: './Cont/Solve/SolveMng',
              },
              {
                path: '/cms/solve/solveadd',
                name: 'solveadd',
                component: './Cont/Solve/SolveAdd',
              },
              {
                path: '/cms/solve/solveclamng',
                name: 'solveclamng',
                component: './Cont/Solve/SolveClaMng',
              },
            ],
          },
          {
            path: '/cms/page',
            name: 'page',
            icon: 'file',
            routes: [
              {
                path: '/cms/page/pagemng',
                name: 'pagemng',
                component: './Cont/Page/PageMng',
              },
              {
                path: '/cms/page/pageadd',
                name: 'pageadd',
                component: './Cont/Page/PageAdd',
              },
            ],
          },
        ],
      },
      {
        path: '/advpic',
        name: 'advpic',
        icon: 'robot',
        routes: [
          {
            path: '/advpic',
            redirect: '/advpic/adv/advmng',
          },
          {
            path: '/advpic/adv',
            name: 'adv',
            icon: 'interation',
            routes: [
              {
                path: '/advpic/adv/advmng',
                name: 'advmng',
                component: './AdvPic/Advert/AdvMng',
              },
              {
                path: '/advpic/adv/advadd',
                name: 'advadd',
                component: './AdvPic/Advert/AdvAdd',
              },
            ],
          },
          {
            path: '/advpic/pic',
            name: 'pic',
            icon: 'picture',
            routes: [
              {
                path: '/advpic/pic/picmng',
                name: 'picmng',
                component: './AdvPic/Picture/PicMng',
              },
              {
                path: '/advpic/pic/picadd',
                name: 'picadd',
                component: './AdvPic/Picture/PicAdd',
              },
            ],
          },
        ],
      },
      {
        path: '/ability',
        name: 'ability',
        icon: 'team',
        routes: [
          {
            path: '/ability',
            redirect: '/ability/recruit/recruitmng',
          },
          {
            path: '/ability/recruit',
            name: 'recruit',
            icon: 'user-add',
            routes: [
              {
                path: '/ability/recruit/recruitmng',
                name: 'recruitmng',
                component: './Ability/Recruit/RecruitMng',
              },
              {
                path: '/ability/recruit/recruitadd',
                name: 'recruitadd',
                component: './Ability/Recruit/RecruitAdd',
              },
            ],
          },
        ],
      },
      {
        path: '/quelea',
        name: 'quelea',
        icon: 'question-circle',
        routes: [
          {
            path: '/quelea',
            redirect: '/quelea/quest/quemng',
          },
          {
            path: '/quelea/quest',
            name: 'quest',
            icon: 'question-circle',
            routes: [
              {
                path: '/quelea/quest/quemng',
                name: 'quemng',
                component: './QueLea/Quest/QueMng',
              },
              {
                path: '/quelea/quest/queedit',
                name: 'queedit',
                component: './QueLea/Quest/QueEdit',
              },
            ],
          },
          {
            path: '/quelea/faq',
            name: 'faq',
            icon: 'question',
            routes: [
              {
                path: '/quelea/faq/faqmng',
                name: 'faqmng',
                component: './QueLea/FAQ/FAQMng',
              },
              {
                path: '/quelea/faq/faqadd',
                name: 'faqadd',
                component: './QueLea/FAQ/FAQAdd',
              },
              {
                path: '/quelea/faq/faqclamng',
                name: 'faqclamng',
                component: './QueLea/FAQ/FAQClaMng',
              },
            ],
          },
          {
            path: '/quelea/leave',
            name: 'leave',
            icon: 'message',
            routes: [
              {
                path: '/quelea/leave/leavemng',
                name: 'leavemng',
                component: './QueLea/Leave/LeaveMng',
              },
              {
                path: '/quelea/leave/leavedetail',
                name: 'leavedetail',
                component: './QueLea/Leave/LeaveDetail',
              },
            ],
          },
        ],
      },
      {
        path: '/downlink',
        name: 'downlink',
        icon: 'cloud-download',
        routes: [
          {
            path: '/downlink',
            redirect: '/downlink/down/downmng',
          },
          {
            path: '/downlink/down',
            name: 'down',
            icon: 'download',
            routes: [
              {
                path: '/downlink/down/downmng',
                name: 'downmng',
                component: './DownLink/Down/DownMng',
              },
              {
                path: '/downlink/down/downadd',
                name: 'downadd',
                component: './DownLink/Down/DownAdd',
              },
              {
                path: '/downlink/down/downclamng',
                name: 'downclamng',
                component: './DownLink/Down/DownClaMng',
              },
            ],
          },
          {
            path: '/downlink/link',
            name: 'link',
            icon: 'branches',
            routes: [
              {
                path: '/downlink/link/linkmng',
                name: 'linkmng',
                component: './DownLink/Link/LinkMng',
              },
              {
                path: '/downlink/link/linkadd',
                name: 'linkadd',
                component: './DownLink/Link/LinkAdd',
              },
            ],
          },
        ],
      },
      {
        path: '/website',
        name: 'website',
        icon: 'bank',
        routes: [
          {
            path: '/website',
            redirect: '/website/web/webmng',
          },
          {
            path: '/website/web',
            name: 'web',
            icon: 'bank',
            routes: [
              {
                path: '/website/web/webmng',
                name: 'webmng',
                component: './Website/Web/WebMng',
              },
              {
                path: '/website/web/webadd',
                name: 'webadd',
                component: './Website/Web/WebAdd',
              },
            ],
          },
        ],
      },
      {
        path: '/system',
        name: 'system',
        icon: 'tool',
        routes: [
          {
            path: '/',
            redirect: '/system/setting',
          },
          {
            path: '/system/setting',
            name: 'setting',
            component: './Dashboard/Workplace',
          },
          {
            path: '/system/cdn',
            name: 'cdn',
            component: './Dashboard/Workplace',
          },
          {
            path: '/system/user',
            name: 'user',
            component: './Dashboard/Workplace',
          },
          {
            path: '/system/role',
            name: 'role',
            component: './Dashboard/Workplace',
          },
          {
            path: '/system/log',
            name: 'log',
            component: './Dashboard/Workplace',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
