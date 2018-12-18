<h4>论文详情</h4>

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

<div class="form-group" id="inGroup">
    <label for="page_groups" class="control-label col-sm-2">热门论文</label>
    <div class="col-sm-10">
        <label class="checkbox-inline">
            <input name="is_hot" type="checkbox" value="1" @if($page->is_hot == \BaseCms\Models\Page::HOT_YES) checked @endif> &nbsp;
        </label>
    </div>
</div>


<script type="text/javascript">
    var urlArray = {!! json_encode($urlArray) !!};
</script>