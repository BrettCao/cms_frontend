<h4>文章详情</h4>

@if ($parentPages && !$page->id)
    {!! CmsBlockInput::make('select', ['name' => 'page_info[parent]', 'label' => '文章分类', 'content' => $page->parent, 'selectOptions' => $parentPages]) !!}
@else
    {!! Form::hidden('page_info[parent]', $page->parent, ['id' => 'page_info[parent]']) !!}
@endif

@if ($publishing_on && $page->id && $page->link == 0)
    <p class="col-sm-offset-2 col-sm-10">Page {{ $beacon_select ? 'beacons, ' : '' }}name and url are NOT versioned, changes to these will be made live on save.</p>
@endif

@if ($beacon_select)
    {!! CmsBlockInput::make('selectmultiple', array('name' => 'page_info_other[beacons]', 'label' => 'Page Beacons', 'content' => $beacon_select->selected, 'selectOptions' => $beacon_select->options)) !!}
@endif

{!! CmsBlockInput::make('string', ['name' => 'page_info_lang[name]', 'label' => '文章名称', 'content' => $page_lang->name, 'disabled' => !$can_publish && $page->id ]) !!}

<div class="form-group ">
    <label for="block[36]" class="control-label col-sm-2">英文名</label>
    <div class="col-sm-10">
        <input class="form-control " name="e_title" type="text" @if($page)  @if($page->page_langs()->first())  value="{{$page->page_langs()->first()->e_title}}" @endif @endif>
        <span class="help-block"></span>
    </div>
</div>


<div class="form-group ">
    <label for="block[36]" class="control-label col-sm-2">主管单位</label>
    <div class="col-sm-10">
        <input class="form-control " name="competent" type="text" @if($page)  @if($page->page_langs()->first())  value="{{$page->page_langs()->first()->competent}}" @endif @endif>
        <span class="help-block"></span>
    </div>
</div>


<div class="form-group ">
    <label for="block[36]" class="control-label col-sm-2">主办单位</label>
    <div class="col-sm-10">
        <input class="form-control " name="unit" type="text" @if($page)  @if($page->page_langs()->first())  value="{{$page->page_langs()->first()->unit}}" @endif @endif>
        <span class="help-block"></span>
    </div>
</div>


<div class="form-group ">
    <label for="block[36]" class="control-label col-sm-2">国内刊号</label>
    <div class="col-sm-10">
        <input class="form-control " name="issn" type="text" @if($page)  @if($page->page_langs()->first())  value="{{$page->page_langs()->first()->issn}}" @endif @endif>
        <span class="help-block"></span>
    </div>
</div>

<div class="form-group ">
    <label for="block[36]" class="control-label col-sm-2">发行方式</label>
    <div class="col-sm-10">
        <input class="form-control " name="issue" type="text" @if($page)  @if($page->page_langs()->first())  value="{{$page->page_langs()->first()->issue}}" @endif @endif>
        <span class="help-block"></span>
    </div>
</div>

<div class="form-group ">
    <label for="block[36]" class="control-label col-sm-2">报刊版式</label>
    <div class="col-sm-10">
        <input class="form-control " name="press" type="text" @if($page)  @if($page->page_langs()->first())  value="{{$page->page_langs()->first()->press}}" @endif @endif>
        <span class="help-block"></span>
    </div>
</div>

<div class="form-group ">
    <label for="block[36]" class="control-label col-sm-2">日发行量</label>
    <div class="col-sm-10">
        <input class="form-control " name="num" type="number" @if($page)  @if($page->page_langs()->first())  value="{{$page->page_langs()->first()->num}}" @endif @endif>
        <span class="help-block"></span>
    </div>
</div>

<div class="form-group ">
    <label for="block[36]" class="control-label col-sm-2">创刊时间</label>
    <div class="col-sm-10">
        <input class="form-control " name="start_publish_date" type="number" @if($page)  @if($page->page_langs()->first())  value="{{$page->page_langs()->first()->start_publish_date}}" @endif @endif>
        <span class="help-block"></span>
    </div>
</div>


<div class="form-group ">
    <label for="page_info[parent]" class="control-label col-sm-2">发行周期</label>
    <div class="col-sm-10">
        <select style="width: 100%" class="form-control chosen-select " name="cycle">
            <option value="周刊" @if($page)  @if($page->page_langs()->first())  @if($page->page_langs()->first()->cycle == '周刊') selected @endif @endif @endif>周刊</option>
            <option value="旬刊" @if($page)  @if($page->page_langs()->first())  @if($page->page_langs()->first()->cycle == '旬刊') selected @endif @endif @endif>旬刊</option>
            <option value="半月刊" @if($page)  @if($page->page_langs()->first())  @if($page->page_langs()->first()->cycle == '半月刊') selected @endif @endif @endif>半月刊</option>
            <option value="月刊" @if($page)  @if($page->page_langs()->first())  @if($page->page_langs()->first()->cycle == '月刊') selected @endif @endif @endif>月刊</option>
            <option value="双月刊" @if($page)  @if($page->page_langs()->first())  @if($page->page_langs()->first()->cycle == '双月刊') selected @endif @endif @endif>双月刊</option>
            <option value="季刊" @if($page)  @if($page->page_langs()->first())  @if($page->page_langs()->first()->cycle == '季刊') selected @endif @endif @endif>季刊</option>
        </select>
        <span class="help-block"></span>
    </div>
</div>

<div class="form-group ">
    <label for="page_info[parent]" class="control-label col-sm-2">期刊/报纸</label>
    <div class="col-sm-10">
        <select style="width: 100%" class="form-control chosen-select " name="is_hot">
            <option value="1" @if($page)  @if($page->is_hot == '1') selected @endif @endif >期刊</option>
            <option value="2" @if($page)  @if($page->is_hot == '2') selected @endif @endif >报纸</option>
        </select>
        <span class="help-block"></span>
    </div>
</div>


<script type="text/javascript">
    var urlArray = {!! json_encode($urlArray) !!};
</script>