<li id='list_{!! $page->id !!}'>
    <div class='{!! $li_info->type !!}'>
        {!! $page_lang !!}
        <span class="pull-right">
            @if ($permissions['edit'] == true)
                <a href="{{ route('coaster.admin.news.edit', ['pageId' => $page->id]) }}" class="glyphicon glyphicon-pencil itemTooltip" title="修改文章"></a>
            @endif
            @if ($permissions['delete'] == true)
                <a href="{{ route('coaster.admin.news.delete', ['pageId' => $page->group_container?0:$page->id]) }}" class="glyphicon glyphicon-trash itemTooltip"
                   data-name="{!! $page_lang !!}" title="删除文章"></a>
            @endif
        </span>
    </div>
    {!! $li_info->leaf !!}
</li>