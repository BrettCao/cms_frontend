
@if($tabs[0])
    <li id="navtab{!! $tabs[0] !!}"{!! $tabs[0]<0?' class="pull-right"':'' !!}>
        <a href="{{ '#tab0' }}" data-toggle="tab" aria-expanded="true">{!! $tabs[0] !!}</a>
    </li>
    @endif

