<li id='list_{!! $page->id !!}'>
    <div class='{!! $li_info->type !!}'>
        {{--<span class='disclose glyphicon'></span>--}}
        {!! $page_lang !!}
        <span class="pull-right">
            @if ($permissions['add'] == true && empty($page->link))
                <a href="{{ route('coaster.admin.category_add', ['pageId' => $page->group_container?0:$page->id, 'groupId' => $page->group_container?:null]) }}" class="glyphicon glyphicon-plus itemTooltip addPage" title="新增分类"></a>
            @endif
            @if ($permissions['edit'] == true)
                <a href="{{ route('coaster.admin.category.edit', ['pageId' => $page->id]) }}" class="glyphicon glyphicon-pencil itemTooltip" title="修改分类"></a>
            @endif
            @if ($permissions['delete'] == true)
                <a href="{{ route('coaster.admin.category.delete', ['pageId' => $page->group_container?0:$page->id]) }}" class="glyphicon glyphicon-trash itemTooltip"
                   data-name="{!! $page_lang !!}" title="删除分类"></a>
            @endif
        </span>
    </div>
    {!! $li_info->leaf !!}
</li>