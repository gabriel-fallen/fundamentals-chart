import { Slim } from 'slim-js';
import { tag, template, useShadow } from 'slim-js/Decorators';

@tag('my-ticker')
@template(`
<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css">

<style>
  li {
    cursor: pointer;
    margin: 0px 3px 0px 3px;
  }
</style>

<li click="onRemove"><span class="label label-rounded label-primary">{{data.name}}&nbsp;<sup><i class="icon icon-cross"></i></sup></span></li>
`)
@useShadow(true)
class Ticker extends Slim {
  onRemove (e) {
    e.preventDefault();
    this.callAttribute('on-remove', this.data.ticker);
  }
}
