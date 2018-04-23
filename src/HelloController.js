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

Nunjuncks.configure('templates', { autoescape: true });

export default class HelloController extends Controller {
  toString() {
    //return Nunjuncks.renderString('<p> Hello {{fname}} {{lname}}</p>', getName(this.context));
    //return Nunjuncks.render('index', getName(this.context));
    return this.h.view('index', getName(this.context));
  }
}
