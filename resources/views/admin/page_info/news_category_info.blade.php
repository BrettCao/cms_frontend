<h4>分类详情</h4>

@if ($parentPages && !$page->id)
    {!! CmsBlockInput::make('select', ['name' => 'page_info[parent]', 'label' => '分类', 'content' => $page->parent, 'selectOptions' => $parentPages]) !!}
@else
    {!! Form::hidden('page_info[parent]', $page->parent, ['id' => 'page_info[parent]']) !!}
@endif

@if ($publishing_on && $page->id && $page->link == 0)
    <p class="col-sm-offset-2 col-sm-10">Page {{ $beacon_select ? 'beacons, ' : '' }}name and url are NOT versioned, changes to these will be made live on save.</p>
@endif

@if ($beacon_select)
    {!! CmsBlockInput::make('selectmultiple', array('name' => 'page_info_other[beacons]', 'label' => 'Page Beacons', 'content' => $beacon_select->selected, 'selectOptions' => $beacon_select->options)) !!}
@endif

{!! CmsBlockInput::make('string', ['name' => 'page_info_lang[name]', 'label' => '分类名称', 'content' => $page_lang->name, 'disabled' => !$can_publish && $page->id ]) !!}


<script type="text/javascript">
    var urlArray = {!! json_encode($urlArray) !!};
</script>