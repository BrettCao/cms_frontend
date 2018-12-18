import React from 'react';
import {observable, action} from 'mobx';
import {aRequest} from "../request";

class Forum {
    @observable list = [];
    @observable total = 0;
    @observable page = 1;
    @observable value = '';
    @observable loading = false;
    @observable tab = null;

    async parseData() {
        this.loading = true;
        try {
            const {list, total} = await aRequest('get', '/topic_list', {
                params: {
                    page: this.page,
                    value: this.title,
                    type: this.tab
                }
            });
            this.loadEnd(list, total);
        } catch (e) {
            this.loadEnd();
            throw new Error(e);
        }
    }

    loadEnd(list = [], total = []) {
        this.loading = false;
        this.list = list;
        this.total = total;
    }

    @action
    handleValue(value) {
       this.value = value;
       this.page = 1;
       this.parseData();
    }

    @action
    handleTab(item) {
        this.tab = item.id;
        this.page = 1;
        this.parseData();
    }

    @action
    handlePage(page) {
        this.page = page;
        this.parseData();
    }
}

export const forum = new Forum();