@if (!$page->id || $page->link == 0 || $menus)
    <h4>Display Info</h4>
@endif

@if (!$page->id || $page->link == 0)
    <div id="template_select">
        @if (!$templateSelectHidden)
            {!! CmsBlockInput::make('select', ['name' => 'page_info[template]', 'label' => '分类模板', 'content' => $template, 'selectOptions' => $templates]) !!}
        @else
            {!! Form::hidden('page_info[template]', $template) !!}
        @endif
    </div>
@endif

@if ($menus)
    <div class="form-group">
        {!! Form::label('page_info_other[menus]', '在菜单中显示', ['class' => 'control-label col-sm-2']) !!}
        <div class="col-sm-10">
            @foreach($menus as $menu)
                <label class="checkbox-inline">
                    <?php $options = []; if (!$can_publish) :$options['disabled'] = true; endif; ?>
                    {!! Form::checkbox('page_info_other[menus]['.$menu->id.']', 1, $menu->in_menu, $options) !!} &nbsp; {!! $menu->label !!}
                </label>
            @endforeach
        </div>
    </div>
@endif