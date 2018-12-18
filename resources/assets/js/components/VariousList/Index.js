import React from 'react';

import './index.module.css';

export const VariousList = ({list, history}) => (
	<section className="various-list">
		{list.map((item, i)=>(
			<article onClick={()=>history.push(`/paper/${item.id}`)} key={`l-${i}`}>
				<h5>
					{item.title}
				</h5>
				<div className="article-body clearfix">
					<p>
						{item.content}
					</p>
					<p>
						浏览量: {item.eye}
					</p>
				</div>
			</article>
		))}
	</section>
)