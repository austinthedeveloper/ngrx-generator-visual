import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

export class GeneratedItem {
  name: string;
  path: string;
  module: string;

  id: number;
  types = {
    reducer: false,
    action: false,
    effect: false,
  };
  flags = {
    flat: true,
    group: false,
    test: false
  };

  constructor(id: number) {
    this.id = id;
  }
}

@Component({
  selector: 'ngrx-generator',
  templateUrl: './ngrx-generator.component.html',
  styleUrls: ['./ngrx-generator.component.scss']
})

export class NgrxGeneratorComponent implements OnInit {

  items: GeneratedItem[] = [];

  types = [
    {name: 'Reducer', value: 'reducer'},
    {name: 'Action', value: 'action'},
    {name: 'Effect', value: 'effect'},
  ];

  flags = [
    {name: 'Dry Run', value: 'test'},
    {name: 'Group', value: 'group'},
    {name: 'Flatten', value: 'flat'},
  ];

  generate = 'ng g ';
  connector = ' && ';

  constructor() { }

  ngOnInit() {
    this.newItem();
  }

  newItem() {
    this.items.push(new GeneratedItem(Math.random()));
  }

  copyItem(item: GeneratedItem) {
    const res = _.cloneDeep(item);
    res.id = Math.random();
    this.items.push(res);
  }

  deleteItem(id: number) {
    this.items = _.reject(this.items, ['id', id]);
  }

  builtString(item: GeneratedItem) {
    let res = '';
    const flat = item.flags.flat ? '' : '--flat false';
    const group = item.flags.group ? '--group true' : '';
    const test = item.flags.test ? '--dry-run' : '';
    const module = item.module ? `--module ${item.module}` : '';
    const flags = `${flat} ${group} ${test} ${module}`;
    const path = item.path ? `${item.path}/` : '';
    _.forEach(item.types, (type, key) => {
      if (type) {
        const string = `${this.generate} ${key} ${path}${item.name}`;
        res = res.length ? `${res} ${this.connector} ${string} ${flags}` : `${res} ${string} ${flags}`;
      }
    });
    return res;
  }

}
