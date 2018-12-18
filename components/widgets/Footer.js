/**
 * Created by Smile on 2018/4/11.
 */
import React from 'react';
import styles from  './footer.module.css';

const footer = () => (
    <div className={styles.footer}>
        <div className="container-sm">
            <p>本站文章只代表作者观点,部分作品系转载.版权归原作者或相应的机构,若某篇作品侵犯您的权利请来信告知:fabiaoba365@126.com</p>
            <div className={styles.footerBy}>
                <p>
                    苏ICP备13033216号
                </p>
                <p>
                    Copyright 2015 版权所有
                </p>
            </div>
        </div>
    </div>
);
export default footer;