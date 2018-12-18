import React from 'react';

import Link from 'next/link';
import './index.module.css';

export const VariousList = ({list, history}) => (
	<section  className="various-list">
		{list.map((item, i)=>(
			<Link key={`paper-${i}`} href={{pathname: '/Paper', query: {id: item.id}}}><article onClick={()=>history.push(`/paper/${item.id}`)} key={`l-${i}`}>
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
			</article></Link>
		))}
	</section>
)