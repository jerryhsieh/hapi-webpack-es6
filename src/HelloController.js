//
//
// File name : HelloController.js
// Author: Jerry Hsieh @ 2018-04-23
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

import Controller from './lib/controller';
import Nunjuncks from 'nunjucks';

function getName(req) {
  let name = {
    fname: 'Jerry',
    lname: 'Hsieh'
  };
  let nameParts = req.params.name ? req.params.name.split('/') : [];
  name.fname = (nameParts[0] || req.query.fname) || name.fname;
  name.lname = (nameParts[1] || req.query.lname) || name.lname;
  return name;
}

function onClick(e) {
  console.log(e.currentTarget);
}

export default class HelloController extends Controller {

  index(application, request, reply, callback) {
    this.context.cookie.set('random', '_' + (Math.floor(Math.random() * 1000) + 1), { path: '/' });
    this.context.data = { random: Math.floor(Math.random() * 1000) + 1 };
    return callback(null);
  }

  toString() {
    let context = getName(this.context);
    context.data = this.context.data;

    Nunjuncks.configure('/templates');
    return Nunjuncks.render('hello.html', context);
  }
  attach(el) {
    console.log(this.context.data.random);
    this.clickHandler = el.addEventListener('click', onClick, false);
  }

  detach(el) {
    el.removeEventListener('click', onClick, false);
  }
}



