<?php

namespace BaseCms\Http\Controllers;

use BaseCms\Models\Account;
use BaseCms\Models\Comments;
use BaseCms\Models\Follow;
use BaseCms\Models\Notification;
use BaseCms\Models\Page;
use BaseCms\Models\Plan;
use BaseCms\Models\Topic;
use BaseCms\Models\User;
use BaseCms\Models\UserRole;
use Beta\A;
use Illuminate\Routing\Controller as Controller;
use PhpParser\Comment;
use Request;
use Cache;
use Carbon\Carbon;
use BaseCms\Services\NTPService;
use DB;
use Auth;
use FormMessage;
use Cookie;
use File;

class IndexController extends Controller
{
    const RETURN_SUCCESS = 'success';
    const RETURN_ERROR = 'error';

    public function reJSON($status,$message,$url = true,$code = 200)
    {

        if ($status == self::RETURN_ERROR){
            $code = 507;
        }
        if (request()->expectsJson()) {
            return response()->json(["status"=>$status,"message"=>$message,"url"=>$url],$code);
        }else{
            return response()->json(["status"=>$status,"message"=>$message,"url"=>$url],$code);
        }
    }

    public function index(){

     return view('desktop.index');
    }


    /**
     * 期刊列表
     * @return \Illuminate\Http\JsonResponse
     */
    public function journal_list(){
        $type = Request::get('type',0);
        $key = 'list'.$type;
        $md5_key = md5($key);
        if(!Cache::has($md5_key)){
            $data=NTPService::test(1,$type);
            $datas =array_slice($data->message,0,12);
            $expiresAt = Carbon::now('Asia/Shanghai')->addMinutes(60);
            Cache::put($md5_key, $datas, $expiresAt);
        }
        $list = Cache::get($md5_key);
        return $this->reJSON(self::RETURN_SUCCESS,$list);
    }

    /**
     * 期刊分类
     * @return \Illuminate\Http\JsonResponse
     */
    public function journal_type_list(){
        $key = 'Type';
        $md5_key = md5($key);
        if(!Cache::has($md5_key)){
            $data=NTPService::test(2);
            $datas =$data->message;
            $expiresAt = Carbon::now('Asia/Shanghai')->addMinutes(60);
            Cache::put($md5_key, $datas, $expiresAt);
        }
        $list = Cache::get($md5_key);
        return $this->reJSON(self::RETURN_SUCCESS,$list);
    }


    /**
     * 期刊列表
     * @return \Illuminate\Http\JsonResponse
     */
    public function choose(){
        $page=Request::get('page');//页码
        $search_menu=Request::get('search_menu');//搜索类型
        $value=Request::get('value');//搜索内容
        $category_one=Request::get('category_one',0);//类别
        $journal_type=Request::get('journal_type');//级别
        $publish_area_id=Request::get('publish_area_id');//出版地
        $publish_date=Request::get('publish_date');//创刊时间
        $publish_cycle=Request::get('publish_cycle');//出版周期 不限
        $is_included=Request::get('is_included',0);//知网收录  0不限 1是 2否
        $sort=Request::get('sort',0);//0 按照时间排序  1按照复合因子
        $key = 'choose/p'.$page.'s'.$search_menu.'v'.$value.'c'.$category_one.'j'.$journal_type.'pa'.$publish_area_id.'pd'.$publish_date.'pc'.$publish_cycle.'i'.$is_included.'so'.$sort;
        $md5_key = md5($key);
        if(!Cache::has($md5_key)){
            $text = ['page'=>$page,'search_menu'=>$search_menu,'value'=>$value,'category_one'=>$category_one,'journal_type'=>$journal_type,'publish_area_id'=>$publish_area_id,'publish_date'=>$publish_date,'publish_cycle'=>$publish_cycle,'is_included'=>$is_included,'num'=>16,'sort'=>$sort];
            $data=NTPService::test(4,$text);
            $datas =$data->message;
            $expiresAt = Carbon::now('Asia/Shanghai')->addMinutes(60);
            Cache::put($md5_key, $datas, $expiresAt);
        }
        $list = Cache::get($md5_key);
        return $this->reJSON(self::RETURN_SUCCESS,$list);
    }


    /**
     * 期刊单页
     * @param null $uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($uuid = null){
        $key = 'Show'.$uuid;
        $md5_key = md5($key);
        if(!Cache::has($md5_key)){
            $data=NTPService::test(3,$uuid);
            $datas =$data->message;
            $expiresAt = Carbon::now('Asia/Shanghai')->addMinutes(60);
            Cache::put($md5_key, $datas, $expiresAt);
        }
        $list = Cache::get($md5_key);
        return $this->reJSON(self::RETURN_SUCCESS,$list);
    }

    /**
     * 期刊搜索
     * @return \Illuminate\Http\JsonResponse
     */
    public function journal_search(){
        $type = Request::get('name');
        $key = 'Search'.$type;
        $md5_key = md5($key);
        if(!Cache::has($md5_key)){
            $data=NTPService::test(5,$type);
            $datas =$data->message;
            $expiresAt = Carbon::now('Asia/Shanghai')->addMinutes(60);
            Cache::put($md5_key, $datas, $expiresAt);
        }
        $list = Cache::get($md5_key);
        return $this->reJSON(self::RETURN_SUCCESS,$list);
    }

    /**
     * 热门期刊
     * @return \Illuminate\Http\JsonResponse
     */
    public function hot_journal(){
        $type = Request::get('uuid');
        $key = 'Hot'.$type;
        $md5_key = md5($key);
        if(!Cache::has($md5_key)){
            $data=NTPService::test(6,$type);
            $datas =$data->message;
            $expiresAt = Carbon::now('Asia/Shanghai')->addMinutes(60);
            Cache::put($md5_key, $datas, $expiresAt);
        }
        $list = Cache::get($md5_key);
        return $this->reJSON(self::RETURN_SUCCESS,$list);
    }

    /**
     * 会员信息
     * @return \Illuminate\Http\JsonResponse
     */
    public function get_info(){
        if(Auth::check()){
            $user = Auth::user();
            $data = [];
            if($user){
                $account  = Account::where('user_id',Auth::id())->first();
                if($account){
                    $data['name'] =$user->name;
                    $data['birth'] =$account->birth;
                    $data['address'] =$account->address;
                    $data['sex'] =$account->sex;
                    $data['research'] =$account->research;
                    $data['company'] =$account->company;
                    $data['education'] =$account->education;
                    $data['position'] =$account->position;
                    $data['mobile'] =$account->mobile;
                    $data['url'] = User::Logo($user);
                }
            }
            return $this->reJSON(self::RETURN_SUCCESS,$data);
        }
        return $this->reJSON(self::RETURN_ERROR,'清先登陆');
    }


    /**
     * 保存修改信息
     * @return \Illuminate\Http\JsonResponse
     */
    public function update_info(){
        if(Auth::check()){
            $user = Auth::user();
            if($user){
                $account  = Account::where('user_id',Auth::id())->first();
                if($account){
                    if(Request::get('name')){
                        $account->real_name =Request::get('name');
                        $user->name = Request::get('name');
                        $user->save();
                    }
                    if(Request::get('birth')){
                        $account->birth =Request::get('birth');
                    }
                    if(Request::get('address')){
                        $account->address =Request::get('address');
                    }
                    if(Request::get('research')){
                        $account->research =Request::get('research');
                    }
                    if(Request::get('sex')){
                        $account->sex =Request::get('sex');
                    }
                    if(Request::get('company')){
                        $account->company =Request::get('company');
                    }
                    if(Request::get('education')){
                        $account->education =Request::get('education');
                    }
                    if(Request::get('position')){
                        $account->position =Request::get('position');
                    }
                    $res= $account->save();
                    if($res){
                        return $this->reJSON(self::RETURN_SUCCESS,'success');
                    }
                }
            }
            return $this->reJSON(self::RETURN_ERROR,'error');
        }
        return $this->reJSON(self::RETURN_ERROR,'清先登陆');
    }

    /**
     * type  1 专注出书 2线上媒体  3  纸质媒体的期刊  4 纸质媒体的报纸
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax_media(){
        $type = Request::get('type');
        $pages = [];
        $datas = [];
        if($type == 1){
            $pages = Page::where('parent',Page::TYPE_CHUSHU)->where('template',Page::TEMPLATE_ARTICLE)->limit(6)->get();
        }elseif($type == 2){
            $pages = Page::where('parent',Page::TYPE_MEDIA)->where('template',Page::TEMPLATE_ARTICLE)->limit(6)->get();
        }elseif($type == 3){
            $pages = Page::where('parent',Page::TYPE_PRINT)->where('template',Page::TEMPLATE_ARTICLE)->where('is_hot',1)->limit(6)->get();
        }elseif($type == 4){
            $pages = Page::where('parent',Page::TYPE_PRINT)->where('template',Page::TEMPLATE_ARTICLE)->where('is_hot',2)->limit(6)->get();
        }
        if(count($pages)){
            foreach($pages as $page){
                $data['title'] = $page->title;
                $data['id'] = $page->id;
                $data['url'] = $page->face_url;
                $datas[] = $data;
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS,$datas);
    }

    /**
     * 根据论文分类  或是  应用文分类  或是 资源下载分类 返回文章题目和id
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax_paper(){
        $type = Request::get('type');
        $pages = [];
        $category =  Page::find($type);
        $datas = [];
        if($category){
            $pages = Page::where('parent',$category->id)->where('template',Page::TEMPLATE_ARTICLE)->limit(6)->get();
        }
        if($pages){
            foreach ($pages as $page){
                $data['title'] = $page->title;
                $data['id'] = $page->id;
                $datas[] = $data;
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS,$datas);
    }

    /**
     * 首页论文 应用文  资源下载 分类type  1论文  2应用文  3资源下载
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax_paper_type(){
        $type = Request::get('type',1);
        $datas = [];
        $categories = [];
        if($type == 1){
            $categories = Page::where('parent',Page::TYPE_PAPER)->where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->get();
        }elseif($type == 2){
            $categories = Page::where('parent',Page::TYPE_WRITING)->where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->get();
        }elseif($type == 3){
            $categories = Page::where('parent',Page::TYPE_DOWN)->where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->get();
        }
        if($categories){
            foreach ($categories as $page){
                $data['title'] = $page->title;
                $data['id'] = $page->id;
                $datas[] = $data;
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS,$datas);
    }

    /**
     * 出书列表接口  type 1出书 2线上媒体
     * sort 1按照浏览量 2按时间
     * page分页
     * @return \Illuminate\Http\JsonResponse
     */
    public function book_list(){
        $type = Request::get('type',1);
        $sort = Request::get('sort');
        $page = Request::get('page',1);
        $categories = [];
        $datas = [];
        $total = 0;
        if($type == 1){
            $categories = Page::find(Page::TYPE_CHUSHU);
        }elseif ($type == 2){
            $categories = Page::find(Page::TYPE_MEDIA);
        }
        if($categories){
            $pages = Page::where('parent',$categories->id)->where('template',Page::TEMPLATE_ARTICLE)->newQuery();
            if($sort == 1){
                $pages->orderByDesc('view_num');
            }else{
                $pages->orderByDesc('created_at');
            }
            $page_list = $pages->paginate(16, ['*'], 'page', $page);
            $total = $pages->count();
            foreach($page_list as $value){
                $item['title'] = $value->title;
                $item['id'] = $value->id;
                $item['time'] = $value->created_at->format('Y-m-d');
                $item['eye'] = $value->view_num;
                $item['url'] = $value->face_url;
                $item['e_title'] = $value->e_title;
                $item['content'] =$value->content;
                $datas[] = $item;
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS,['list'=>$datas,'total'=>$total]);
    }

    /**
     * type 1期刊  2是报纸
     * sort排序  1按浏览量  0常规
     * publish_date 发布时间
     * publish_cycle 出版周期
     * @return \Illuminate\Http\JsonResponse
     */
    public function media_list(){
        $type = Request::get('type');
        $sort = Request::get('sort',0);
        $page = Request::get('page');
        $publish_date=Request::get('publish_date');
        $publish_cycle=Request::get('publish_cycle');//出版周期 不限
        $where = [];
        $datas = [];
        $total = 0;
        if($publish_date>0){
            //创刊时间
            switch ($publish_date){
                case 1:
                    $where[]=['start_publish_date','>=',1949];
                    $where[]=['start_publish_date','<=',1957];
                    break;
                case 2:
                    $where[]=['start_publish_date','>=',1958];
                    $where[]=['start_publish_date','<=',1978];
                    break;
                case 3:
                    $where[]=['start_publish_date','>=',1979];
                    $where[]=['start_publish_date','<=',1999];
                    break;
                case 4:
                    $where[]=['start_publish_date','>=',2000];
                    break;
            }
        }
        if($publish_cycle && $publish_cycle !='不限'){
            $where[]=['cycle','=',$publish_cycle];
        }
        $category = Page::find(Page::TYPE_PRINT);
        if($category){
            if($type == 1){
                 $pages  = Page::where('template',Page::TEMPLATE_ARTICLE)->where('parent',$category->id)->where('is_hot',1)->whereHas('page_langs',function ($query) use($where) {
                    $query->where($where);
                })->newQuery();
            }else{
                $pages  = Page::where('template',Page::TEMPLATE_ARTICLE)->where('parent',$category->id)->where('is_hot',2)->whereHas('page_langs',function ($query) use($where) {
                    $query->where($where);
                })->newQuery();
            }
            $total = $pages->count();
            if($sort == 1){
                $pages->orderByDesc('view_num');
            }else{
                $pages->orderByDesc('created_at');
            }
            $page_list = $pages->paginate(16, ['*'], 'page', $page);
            foreach($page_list as $value){
                $item['title'] = $value->title;
                $item['id'] = $value->id;
                $item['author'] = $value->author;
                $item['time'] = $value->created_at->format('Y-m-d');
                $item['eye'] = $value->view_num;
                $item['url'] = $value->face_url;
                $item['e_title'] = $value->e_title;//英文名
                $item['unit'] = $value->unit;//主办单位
                $item['issn'] = $value->issn;//国内刊号
                $item['issue'] = $value->issue;//发行方式
                $item['press'] = $value->press;//报刊版式
                $item['num'] = $value->num;//日发行量
                $item['cycle'] = $value->cycle;//发行周期
                $item['start_publish_date'] = $value->start_publish_date;//创刊时间
                $item['competent'] = $value->competent;//主管单位
                $datas[] = $item;
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS,['list'=>$datas,'total'=>$total]);
    }


    /**
     * 论文详情
     * @return \Illuminate\Http\JsonResponse
     */
    public function paper_detail(){
        $id = Request::get('id');
        $data = [];
        if($id){
            $page = Page::find($id);
            if($page){
                $page->view_num = $page->view_num+1;
                $page->save();
                $data['title'] = $page->title;
                $data['author'] = $page->author;
                $data['id'] = $page->id;
                $data['url'] = $page->face_url;
                $data['content'] = $page->content;
                $data['description'] = $page->description;
                $data['created_at'] = $page->created_at->format('Y-m-d');
                $data['eye'] = $page->view_num;
                $data['key_words'] = $page->key_words;
                $data['list'] = [];
                $paper = Page::find(Page::TYPE_PAPER);
                if($paper){
                    $categories = Page::where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->where('parent',$paper->id)->get(['id']);
                    if(count($categories)){
                        $lists =  $pages = Page::where('template',Page::TEMPLATE_ARTICLE)->where('id','<>',$page->id)->whereIn('parent',$categories) ->orderBy(DB::raw('RAND()'))->take(5)->get();
                        foreach ($lists as $value){
                            $item['title'] = $value->title;
                            $item['author'] = $value->author;
                            $item['id'] = $value->id;
                            $data['list'][] = $item;
                        }
                    }
                }

            }
        }
        return $this->reJSON(self::RETURN_SUCCESS, $data);
    }

    /**
     * 其他类型的文章详情
     * @return \Illuminate\Http\JsonResponse
     */
    public function article_detail(){
        $id = Request::get('id');
        $data = [];
        if($id){
            $page = Page::find($id);
            if($page){
                $page->view_num = $page->view_num+1;
                $page->save();
                $data['title'] = $page->title;
                $data['id'] = $page->id;
                $data['url'] = $page->face_url;
                $data['content'] = $page->content;
                $data['created_at'] = $page->created_at->format('Y-m-d');
                $data['eye'] = $page->view_num;
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS, $data);
    }

    /**
     * 其他纸媒单页
     * @return \Illuminate\Http\JsonResponse
     */
    public function media_detail(){
        $id = Request::get('id');
        $data = [];
        if($id){
            $page = Page::find($id);
            if($page){
                $page->view_num = $page->view_num+1;
                $page->save();
                $data['title'] = $page->title;
                $data['id'] = $page->id;
                $data['url'] = $page->face_url;
                $data['e_title'] = $page->e_title;//英文名
                $data['unit'] = $page->unit;//主办单位
                $data['issn'] = $page->issn;//国内刊号
                $data['issue'] = $page->issue;//发行方式
                $data['press'] = $page->press;//报刊版式
                $data['num'] = $page->num;//日发行量
                $data['cycle'] = $page->cycle;//发行周期
                $data['start_publish_date'] = $page->start_publish_date;//创刊时间
                $data['competent'] = $page->competent;//主管单位
                $data['content'] = $page->content;
                $data['created_at'] = $page->created_at->format('Y-m-d');
                $data['eye'] = $page->view_num;
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS, $data);
    }


    /**
     * 热门论文了列表页面
     * @return array
     */
    public function paper_hot(){
        $pages = [];
        $datas = [];
        $paper_type = Page::where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->where('id',Page::TYPE_PAPER)->first();
        if($paper_type){
            $paper_types =  Page::where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->where('parent',$paper_type->id)->get(['id']);
            if(count($paper_types)){
                $pages = Page::where('template',Page::TEMPLATE_ARTICLE)->whereIn('parent',$paper_types)->where('is_hot',Page::HOT_YES)->limit(10)->get();
            }
        }
        foreach ($pages as $page){
            $data['title'] = $page->title;
            $data['id'] = $page->id;
            $datas[] = $data;
        }
        return $this->reJSON(self::RETURN_SUCCESS, $datas);
    }


    /**
     * 注册
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(){
        $data = Request::all();
        if($data){
            $mobile=$data['mobile'];
//        判断会员手机号是否存在
            $account=Account::where('mobile',$mobile)->first();
            if(!$account){
                DB::beginTransaction();
                $user = User::create([
                    'name' => $data['name'],
                    'email' => '',
                    'active' => 1,
                    'password' => bcrypt($data['password']),
                    'role_id'=>UserRole::FRONTEND,
                ]);
                $account = new Account();
                $account->user_id = $user->id;
                $account->mobile = $data['mobile'];
                $account->save();
                return $this->reJSON(self::RETURN_SUCCESS, 'true');
            }else{
                return $this->reJSON(self::RETURN_SUCCESS, 'false');
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS, 'false');
    }

    /**
     * 验证昵称
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function validate_name(Request $request){
        if($name=$request->get('name')){
            $user=User::whereName($name)->first();
            if($user){
                //昵称已存在
                $data='昵称已存在';
            }else{
                //昵称可用
                $data='昵称可用';
            }
        }else{
            //昵称不为空
            $data='昵称不为空';
        }
        return $this->reJSON(static::RETURN_SUCCESS,$data,false);
    }

    /**
     * 验证手机号
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function validate_mobile(Request $request){
        if($mobile=$request->get('mobile')){
            if(preg_match("/^1[34578]{1}\d{9}$/",$mobile)){
                $account=Account::whereMobile($mobile)->first();
                if($account){
                    //手机号已存在
                    $data='手机号已存在';
                }else{
                    //手机号可用
                    $data='手机号可用';
                }
            }else{
                //手机号格式不对
                $data='手机号格式不对';
            }
        }else{
            //手机号不为空
            $data='手机号不为空';
        }
        return $this->reJSON(static::RETURN_SUCCESS,$data,false);
    }

    /**
     * 是否登陆
     * @return \Illuminate\Http\JsonResponse
     */
    public function is_login(){
        if(Auth::check()){
            return $this->reJSON(static::RETURN_SUCCESS,'true');
        }else{
            return $this->reJSON(static::RETURN_SUCCESS,'false');
        }
    }

    /**
     * 登陆
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function login(){
        $name=Request::get('name');
        $password=Request::get('password');
        if(!$name){
            //用户名/密码为空
            return $this->reJSON(static::RETURN_ERROR,'用户名和密码不能为空');
        }
        if(!$password){
            //用户名/密码为空
            return $this->reJSON(static::RETURN_ERROR,'用户名和密码不能为空');
        }
        $user=User::whereName($name)->first();
        if(!$user){
            if(preg_match("/^1[34578]{1}\d{9}$/",$name)) {
                $account=Account::whereMobile($name)->first();
                if(!$account){
                    //用户不存在
                    return $this->reJSON(static::RETURN_ERROR,'用户不存在');
                }else{
                    $user=$account->user;
                }
            }else{
                //用户不存在
                return $this->reJSON(static::RETURN_ERROR,'用户不存在');
            }
        }
        //判断密码
        if(\Hash::check($password,$user->password)){
            Auth::guard('web')->login($user);
            //密码正确
            return $this->reJSON(static::RETURN_SUCCESS,'true');
        }else{
            //密码错误
            return $this->reJSON(static::RETURN_ERROR,'用户名或密码错误');
        }
    }


    /**
     * 用户上传头像
     * @return \Illuminate\Http\JsonResponse
     */
    public function update_logo(){
        if(Auth::check()){
            $file = Request::file('files');
            $user  = Auth::user();
            if($user){
                $file_name = User::store_logo($file);
                foreach ($file_name as $key=>$value){
                    $user->url = User::relativePath() . $key .'.'. File::extension($value);;
                }

                $user->save();
                return $this->reJSON(static::RETURN_SUCCESS,'true');
            }
            return $this->reJSON(static::RETURN_SUCCESS,'false');
        }
        return $this->reJSON(static::RETURN_ERROR,'请先登陆');
    }


    /**
     * 根据论文分类  或是  应用文分类  或是 资源下载分类 返回文章题目和id
     * @return \Illuminate\Http\JsonResponse
     */
    public function paper_list(){
        $type = Request::get('type',1);
        $sort = Request::get('sort');
        $id = Request::get('id',0);
        $page = Request::get('page');
        $datas = [];
        $categories = [];
        $total = 0;
        $pages = [];
        if($type == 1){
            $categories = Page::where('parent',Page::TYPE_PAPER)->where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->get(['id']);
        }elseif($type == 2){
            $categories = Page::where('parent',Page::TYPE_WRITING)->where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->get(['id']);
        }elseif($type == 3){
            $categories = Page::where('parent',Page::TYPE_DOWN)->where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->get(['id']);
        }
        if($categories){
            if($id){
                $pages = Page::where('parent',$id)->where('template',Page::TEMPLATE_ARTICLE)->newQuery();
            }else{
                $pages = Page::whereIn('parent',$categories)->where('template',Page::TEMPLATE_ARTICLE)->newQuery();
            }
        }
        if($pages){
            if($sort == 1){
                $pages->orderByDesc('view_num');
            }else{
                $pages->orderByDesc('created_at');
            }
            $page_list = $pages->paginate(16, ['*'], 'page', $page);
            $total = $pages->count();
            foreach ($page_list as $value){
                $item['title'] = $value->title;
                $item['id'] = $value->id;
                $item['author'] = $value->author;
                $item['time'] = $value->created_at->format('Y-m-d');
                $item['eye'] = $value->view_num;
                $item['url'] = $value->face_url;
                $datas[] = $item;
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS,['list'=>$datas,'total'=>$total]);
    }

    /**
     * 添加话题
     * @return \Illuminate\Http\JsonResponse
     */
    public function stroe_topic(){
        if(Auth::check()) {
            $topic = new Topic;
            $topic->title = Request::input('title');
            $topic->content = Request::input('content');
            $topic->user_id = Auth::id();
            if (Request::get('is_anonymous') == 'true') {
                $topic->is_anonymous = Request::get('is_anonymous');
            }
            $res = $topic->save();
            if ($res) {
                return $this->reJSON(self::RETURN_SUCCESS, 'true');
            } else {
                return $this->reJSON(self::RETURN_SUCCESS, 'false');
            }
        }
        return $this->reJSON(self::RETURN_ERROR,'请先登录');
    }

    /**
     * 回复话题
     * @return \Illuminate\Http\JsonResponse
     */
    public function comment_topic(){
        if(Auth::check()){
            $id = Request::get('id',0);
            $topic = Topic::find($id);
            if($topic){
                $comment = new Comments;
                $comment->content = Request::input('content');
                $comment->owner()->associate($topic);
                $comment->parent_id = 0;
                $comment->user()->associate(Auth::user());
                $res = $comment->save();
                Notification::AddNotification($type = Notification::TYPE_COMMENT_ARTICLE,$topic);
                if($res){
                    return $this->reJSON(self::RETURN_SUCCESS,'true');
                }
            }
            return $this->reJSON(self::RETURN_SUCCESS,'false');
        }
        return $this->reJSON(self::RETURN_ERROR,'请先登录');
    }

    /**
     * 回复评论
     * @return \Illuminate\Http\JsonResponse
     */
    public function comment_reply()
    {
        if(Auth::check()) {
            $comment_old = Comments::find(Request::get('id',0));
            if ($comment_old) {
                if ($comment_old->top_parent) {
                    $top_parent = $comment_old->top_parent;
                } else {
                    $top_parent = $comment_old->id;
                }
                $topic = $comment_old->owner()->first();
                $comment_id = $comment_old->id;
                if ($topic) {
                    $comment = new Comments;
                    $comment->content = Request::input('content');
                    $comment->parent_id = $comment_id;
                    $comment->top_parent = $top_parent;
                    $comment->user()->associate(Auth::user());
                    $comment->owner()->associate($topic);
                    $res = $comment->save();
                    Notification::AddNotification($type = Notification::TYPE_COMMENT_USER, $topic);
                    if ($res) {
                        return $this->reJSON(self::RETURN_SUCCESS, 'true');
                    }
                }
            }
            return $this->reJSON(self::RETURN_SUCCESS, 'false');
        }
        return $this->reJSON(self::RETURN_ERROR,'请先登录');
    }


    /**
     * 话题列表
     * @return \Illuminate\Http\JsonResponse
     */
    public function topic_list(){
        $page = Request::get('page',1);
        $type = Request::get('type',0);
        $title = Request::get('title','');
        $datas = [];
        if($title){
            $topics = Topic::where('status',Topic::STATUS_SHOW)->where('title','like','%'.$title.'%')->newQuery();
        }else{
            if($type){
                $topics = Topic::where('status',Topic::STATUS_SHOW)->where('is_hot',Topic::HOT_YES)->newQuery();
            }else{
                $topics = Topic::where('status',Topic::STATUS_SHOW)->newQuery();
            }
        }
        $total = $topics->count();
        $topic_list = $topics->orderByDesc('id')->paginate(16, ['*'], 'page', $page);
        foreach ($topic_list as $topic){
            $item['title'] = $topic->title;
            $item['id'] = $topic->id;
            $item['eye'] = $topic->view_num;//浏览量
            $item['author'] = $topic->author;//作者
            $item['created_at'] = $topic->created_at->format('Y-m-d h:i');
            $item['num'] = $topic->comment_num;//回复数
            $item['url'] = User::Logo($topic->user);
            $datas[] = $item;
        }
        return $this->reJSON(self::RETURN_SUCCESS,['list'=>$datas,'total'=>$total]);
    }

    /**
     * 话题详情
     * @return \Illuminate\Http\JsonResponse
     */
    public function topic_detail(){
        $id = Request::get('id',0);
        $topic = Topic::where('status',Topic::STATUS_SHOW)->where('id',$id)->first();
        if($topic){
            $topic->view_num = $topic->view_num+1;
            $topic->save();
            $item['title'] = $topic->title;//标题
            $item['id'] = $topic->id;//id
            $item['eye'] = $topic->view_num;//浏览量
            $item['author'] = $topic->author;//作者名称
            $item['created_at'] = $topic->created_at->format('Y-m-d h:i');
            $item['num'] = $topic->comment_num;//回复数
            $item['content'] = $topic->content;//内容
            $item['url'] = User::Logo($topic->user);
            $item['is_follow'] = Follow::isFollowup($topic);//  0未关注  1已关注
            return $this->reJSON(self::RETURN_SUCCESS,$item);
        }
        return $this->reJSON(self::RETURN_ERROR,'false');
    }

    /**
     * 第一条回复
     * @return \Illuminate\Http\JsonResponse
     */
    public function topic_comment(){
        $page = Request::get('page',1);
        $id = Request::get('id',1);
        $datas = [];
        $topic = Topic::where('status',Topic::STATUS_SHOW)->where('id',$id)->first();
        if($topic){
            $comment_total = $topic->comments()->where('status',Comments::STATUS_SHOW)->where('parent_id',0)->count();//回复的分页
            $comments = $topic->comments()->where('status',Comments::STATUS_SHOW)->orderByDesc('id')->where('parent_id',0)->paginate(16, ['*'], 'page', $page);
            foreach ($comments as $comment) {
                $data['content'] = $comment->content;
                $data['author'] = $comment->author;
                $data['answerer'] = $comment->owner ? $comment->owner->author : '匿名';//回复者
                $data['id'] = $comment->id;
                $data['created_at'] = $comment->created_at->format('Y-m-d h:i:s');
                $data['url'] = User::Logo($comment->user);
                $data['total'] = $comment->answerer_num;
                $data['comment']['comment_content'] = $comment->last_answerer ? $comment->last_answerer->content : '';//回复下的最后一条评论内容
                $data['comment']['comment_author'] = $comment->last_answerer ? $comment->last_answerer->author : '';//回复下的最后一条评论的人
                $data['comment']['comment_url'] = '';
                if ($comment->last_answerer) {
                    $data['comment']['comment_url'] = User::Logo($comment->last_answerer->user);
                }
                $data['comment']['comment_answerer'] = '';
                if ($comment->last_answerer) {
                    if ($comment->last_answerer->owner) {
                        $data['comment']['comment_answerer'] = $comment->last_answerer->owner->author;//回复下的最后一条评论回复的对象
                    }
                }
                $data['comment']['comment_id'] = $comment->last_answerer ? $comment->last_answerer->id : '';
                $data['comment']['comment_created_at'] = $comment->last_answerer ? $comment->last_answerer->created_at->format('Y-m-d h:i') : '';//回复下的最后一条评论时间
                $datas[] = $data;
            }
            return $this->reJSON(self::RETURN_SUCCESS,['list'=>$datas,'total'=>$comment_total]);
        }
        return $this->reJSON(self::RETURN_ERROR,'false');
    }

    /**
     * 推荐话题
     * @return \Illuminate\Http\JsonResponse
     */
    public function hot_topic(){
        $datas = [];
        $topics = Topic::where('status',Topic::STATUS_SHOW)->orderByDesc('id')->limit(10)->get();
        foreach ($topics as $topic){
            $item['title'] = $topic->title;
            $item['id'] = $topic->id;
            $datas[] = $item;
        }
        return $this->reJSON(self::RETURN_SUCCESS,$datas);
    }

    /**
     * 评论回复的列表
     * @return \Illuminate\Http\JsonResponse
     */
    public function comment_list(){
        $id = Request::get('id',0);
        $page = Request::get('page',1);
        $datas = [];
        if($id){
            $comments = Comments::where('top_parent',$id)->where('status',Comments::STATUS_SHOW)->newQuery();
            $comment_total = $comments->count();
            $comments_list = $comments->paginate(5, ['*'], 'page', $page);
            foreach ($comments_list as $comment){
                $data['content'] = $comment->content;
                $data['author'] = $comment->author;
                $data['answerer'] = $comment->owner?$comment->owner->author:'匿名';//回复者
                $data['id'] = $comment->id;
                $data['created_at'] = $comment->created_at->format('Y-m-d h:i:s');
                $data['url'] =   User::Logo($comment->user);
                $datas[] = $data;
            }
            return $this->reJSON(self::RETURN_SUCCESS,['list'=>$datas,'total'=>$comment_total]);
        }
        return $this->reJSON(self::RETURN_ERROR,'false');
    }

    /**
     * 搜索页面  title
     * @return \Illuminate\Http\JsonResponse
     */
    public function search_topic(){
        $page = Request::get('page',1);
        $title = Request::get('title','');
        $datas = [];
        $topics = Topic::where('status',Topic::STATUS_SHOW)->where('title','like','%'.$title.'%')->newQuery();
        $total = $topics->count();
        $topic_list = $topics->paginate(16, ['*'], 'page', $page);
        foreach ($topic_list as $topic){
            $item['title'] = $topic->title;
            $item['id'] = $topic->id;
            $item['eye'] = $topic->view_num;//浏览量
            $item['author'] = $topic->author;//作者
            $item['created_at'] = $topic->created_at->format('Y-m-d h:i');
            $item['num'] = $topic->comment_num;//回复数
            $item['url'] = User::Logo($topic->user);
            $datas[] = $item;
        }
        return $this->reJSON(self::RETURN_SUCCESS,['list'=>$datas,'total'=>$total]);
    }

    /**
     * 关注与取消关注
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function follow()
    {
        if(Auth::check()){
            $id = Request::get('id',0);
            $topic = Topic::find($id);
            if ($topic) {
                Follow::addFollow($topic);
            }
            return $this->reJSON(self::RETURN_SUCCESS, 'true');
        }
        return $this->reJSON(self::RETURN_ERROR, '请先登录');
    }


    /**
     * 消息列表
     * @return \Illuminate\Http\JsonResponse
     */
    public function notification_list(){
        if(Auth::check()){
            $page = Request::get('page',1);
            $user = Auth::user();
            $datas = [];
            $notifications = Notification::where('is_read',Notification::READ_NO)->where('user_id',$user->id)->newQuery();
            $total = $notifications->count();
            $list = $notifications->orderByDesc('id')->paginate(16, ['*'], 'page', $page);
            foreach ($list as $value){
                $data['content'] = $value->content;
                $data['topic_id'] = $value->notification->id;
                $data['created_at'] =  $value->created_at->format('Y-m-d h:i:s');
                $datas[] = $data;
            }
            return $this->reJSON(self::RETURN_SUCCESS,['list'=>$datas,'total'=>$total]);
        }
        return $this->reJSON(self::RETURN_ERROR, '请先登录');
    }


    /**
     * 标记为已读
     * @return \Illuminate\Http\JsonResponse
     */
    public function read_notification(){
        $ids = Request::get('id',1);
        foreach ($ids as $id){
            $notifications = Notification::where('is_read',Notification::READ_NO)->where('id',$id)->where('user_id',Auth::id())->newQuery();
           if($notifications){
               $notifications->is_read = Notification::READ_YES;
               $notifications->save();
           }
        }
        return $this->reJSON(self::RETURN_SUCCESS,'true');
    }


    /**
     * 小铃铛的消息
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax_notifiaction(){
        $user = Auth::user();
        $data = [];
        $total= 0;
        if(Auth::check()){
            $notifications = Notification::where('is_read',Notification::READ_NO)->where('user_id',$user->id)->newQuery();
            $total = $notifications->count();
            $value = $notifications->orderByDesc('id')->first();
            $data = [];
            if($value){
                $data['content'] = $value->content;
                $data['topic_id'] = $value->notification->id;
                $data['created_at'] =  $value->created_at->format('Y-m-d h:i:s');
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS,['list'=>$data,'total'=>$total]);
    }

    /**
     * 个人中心的话题
     * @return \Illuminate\Http\JsonResponse
     */
    public function my_topic(){
        $type = Request::get('type',0);
        $page = Request::get('page',1);
        $datas = [];
        if($type == 1){
            $topic = Topic::where('user_id',Auth::id())->where('status',Topic::STATUS_SHOW)->orderbyDesc('id')->paginate(16, ['*'], 'page', $page);
            $total = Topic::where('user_id',Auth::id())->where('status',Topic::STATUS_SHOW)->count();
            foreach ($topic as $value){
                $item['title'] = $value->title;//标题
                $item['id'] = $value->id;//id
                $item['created_at'] = $value->created_at->format('Y-m-d h:i');
                $item['num'] = $value->comment_num;
                $datas[] = $item;
            }
        }else{
            $follow = Follow::where('user_id',Auth::id())->where('type',1)->paginate(16, ['*'], 'page', $page);
            $total = Follow::where('user_id',Auth::id())->where('type',1)->count();
            foreach ($follow as $value){
                if($value->followup){
                    $item['title'] = $value->followup->title;//标题
                    $item['id'] = $value->followup->id;//id
                    $item['created_at'] = $value->followup->created_at->format('Y-m-d h:i');
                    $item['num'] = $value->comment_num;
                    $datas[] = $item;
                }
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS,['list'=>$datas,'total'=>$total]);
    }


    /**
     * 删除话题
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete_topic(){
        $id = Request::get('id');
        $topic = Topic::find($id);
        if($topic){
            if($topic->user_id== Auth::id()){
                $topic->delete();
                return $this->reJSON(self::RETURN_SUCCESS,'true');
            }
        }
        return $this->reJSON(self::RETURN_SUCCESS,'false');
    }


    /**
     * 回复话题  发表话题数目
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax_logo(){
        $user = Auth::user();
        $data['url'] = User::Logo($user);
        $data['topic_num'] = Topic::where('user_id',$user->id)->where('status',Topic::STATUS_SHOW)->count();
        $data['comment_num'] = Comments::where('user_id',$user->id)->where('status',Topic::STATUS_SHOW)->count();
        $data['name'] = Auth::user()->name;
        $account =Account::where('user_id',Auth::id())->first();
        $data['mobile'] = '';
        if($account){
            $data['mobile'] = $account->mobile;
        }

        return $this->reJSON(self::RETURN_SUCCESS,$data);
    }


    /**
     * type  0期刊 1出书  2其他纸媒 3线上媒体 4论文范文 5应用文  6资源下载 搜索接口
     * @return \Illuminate\Http\JsonResponse
     */
     public function search(){
        $type = Request::get('type',0);
        $name = Request::get('value','');
        $page = Request::get('page',1);
        $pages = [];
        $datas= [];
        $total = 0;
        if($type) {
            switch ($type) {
                case 1:
                    $category = Page::find(Page::TYPE_CHUSHU);
                    if ($category) {
                        $pages = Page::where('template', Page::TEMPLATE_ARTICLE)->where('parent', $category->id)->whereHas('page_langs', function ($query) use ($name) {
                            $query->where('name', 'like', '%' . $name . '%');
                        })->newQuery();
                    }
                    break;
                case 2:
                    $category = Page::find(Page::TYPE_PRINT);
                    if ($category) {
                        $pages = Page::where('template', Page::TEMPLATE_ARTICLE)->where('parent', $category->id)->whereHas('page_langs', function ($query) use ($name) {
                            $query->where('name', 'like', '%' . $name . '%');
                        })->newQuery();
                    }
                    break;
                case 3:
                    $category = Page::find(Page::TYPE_MEDIA);
                    if ($category) {
                        $pages = Page::where('template', Page::TEMPLATE_ARTICLE)->where('parent', $category->id)->whereHas('page_langs', function ($query) use ($name) {
                            $query->where('name', 'like', '%' . $name . '%');
                        })->newQuery();
                    }
                    break;
                case 4:
                    $category = Page::find(Page::TYPE_PAPER);
                    if ($category) {
                        $categories = Page::where('parent', $category->id)->where('template', Page::TEMPLATE_ARTICLE_CATEGORY)->get(['id']);
                        if ($categories) {
                            $pages = Page::where('template', Page::TEMPLATE_ARTICLE)->whereIn('parent', $categories)->whereHas('page_langs', function ($query) use ($name) {
                                $query->where('name', 'like', '%' . $name . '%');
                            })->newQuery();
                        }
                    }
                    break;
                case 5:
                    $category = Page::find(Page::TYPE_WRITING);
                    if ($category) {
                        $categories = Page::where('parent', $category->id)->where('template', Page::TEMPLATE_ARTICLE_CATEGORY)->get(['id']);
                        if ($categories) {
                            $pages = Page::where('template', Page::TEMPLATE_ARTICLE)->whereIn('parent', $categories)->whereHas('page_langs', function ($query) use ($name) {
                                $query->where('name', 'like', '%' . $name . '%');
                            })->newQuery();
                        }
                    }
                    break;
                case 6:
                    $category = Page::find(Page::TYPE_DOWN);
                    if ($category) {
                        $categories = Page::where('parent', $category->id)->where('template', Page::TEMPLATE_ARTICLE_CATEGORY)->get(['id']);
                        if ($categories) {
                            $pages = Page::where('template', Page::TEMPLATE_ARTICLE)->whereIn('parent', $categories)->whereHas('page_langs', function ($query) use ($name) {
                                $query->where('name', 'like', '%' . $name . '%');
                            })->newQuery();
                        }
                    }
                    break;
                default:
            }
            if ($pages) {
                $total = $pages->count();
                $page_list = $pages->paginate(16, ['*'], 'page', $page);
                foreach ($page_list as $c) {
                    $data['title'] = $c->title;
                    $data['id'] = $c->id;
                    $data['url'] = $c->face_url;
                    $data['time'] = $c->created_at->format('Y-m-d');
                    $data['eye'] = $c->view_num;
                    if ($type == 1) {
                        $data['type'] = $c->is_hot;// 1期刊  2是报纸
                    }
                    $datas[] = $data;
                }
            }
            $list = ['list'=>$datas,'total'=>$total];
        }else{
            $key = 'searchPage'.'p'.$page.'n'.$name;
            $md5_key = md5($key);
            if(!Cache::has($md5_key)){
                $text = ['page'=>$page,'name'=>$name,];
                $data=NTPService::test(7,$text);
                $datas = (array) $data->message;
                $expiresAt = Carbon::now('Asia/Shanghai')->addMinutes(60);
                Cache::put($md5_key, $datas, $expiresAt);
            }
            $list = Cache::get($md5_key);
        }
        return $this->reJSON(self::RETURN_SUCCESS,$list);
    }

    /**
     * 发表常识
     * @return \Illuminate\Http\JsonResponse
     */
    public function question_list(){
        $page = Request::get('page',1);
        $total = 0;
        $datas = [];
         $question = Page::find(Page::TYPE_QUESTION);
         if($question){
            $pages = Page::where('template',Page::TEMPLATE_ARTICLE)->where('parent',$question->id)->newQuery();
            $total = $pages->count();
            $page_list = $pages->paginate(16, ['*'], 'page', $page);
            foreach ($page_list as $c) {
                 $data['title'] = $c->title;
                 $data['id'] = $c->id;
                 $data['url'] = $c->face_url;
                 $data['time'] = $c->created_at->format('Y-m-d');
                 $data['eye'] = $c->view_num;
                 $data['content'] =$c->content;
                 $datas[] = $data;
             }
        }
        return $this->reJSON(self::RETURN_SUCCESS,['list'=>$datas,'total'=>$total]);
    }

    /**
     * 保存发表计划
     * @return \Illuminate\Http\JsonResponse
     */
    public function store_plan(){
        $name = Request::get('name','');
        $mobile = Request::get('mobile','');
        $qq = Request::get('qq','');
        $content = Request::get('content','');
        $type = Request::get('type','');
        if($name && $mobile && $qq){
            $plan = new Plan;
            $plan->name = $name;
            $plan->mobile = $mobile;
            $plan->we_chat = $qq;
            if($content){
                $plan->count = $content;
            }
            if($type){
                $plan->type = $type;
            }
            $res = $plan->save();
            if($res){
                return $this->reJSON(self::RETURN_SUCCESS,'保存成功');
            }else{
                return $this->reJSON(self::RETURN_SUCCESS,'保存失败');
            }
        }else{
            return $this->reJSON(self::RETURN_SUCCESS,'信息未填写完整');
        }
    }
}
