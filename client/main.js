import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
borderCollection = new Mongo.Collection("border");

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


// 게시판 소스

Template.border.helpers({
  list() {
    return borderCollection.find();
  },
});

// client/friendsListItem.js
// tmpl으로 html 오브젝트를 찾을 수 있다.
Template.border.events({
    "click button[name=remove]" : function(evt , tmpl){
        borderCollection.remove({_id:this._id});
    }
});

// 게시판 insert 
Template.borderInsert.events({
    "click button[name=insert]" : function(evt , tmpl){

    	var noVal = tmpl.find("input[name=no]").value;
    	var nameVal = tmpl.find("input[name=name]").value;
    	var emailVal = tmpl.find("input[name=email]").value;
        
        borderCollection.insert({no: noVal, name: nameVal, email: emailVal});
        //borderCollection.remove({_id:this._id});
    }
});


//구독 소스 구독과 발행 소스 현재는 find만 구현해놓았기 떄문에 insert가 작동하지 않음 
//autopublish가 있다면 이부분과 server 쪽 소스에서 Meteor.publish 부분을 지우면 정상작동됨
Template.border.onCreated(function () {
    this.subscribe("borderCollection",{});
});