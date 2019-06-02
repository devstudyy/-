import { Meteor } from 'meteor/meteor';
//mongo DB 컬렉션 생성
borderCollection = new Mongo.Collection("border");

Meteor.startup(() => {
  // code to run on server at startup
  //mongo DB 컬렉션 데이터가 0개 일 경우 더미 데이터를 넣는다
        if( borderCollection.find().count() == 0 ) {
            borderCollection.insert({no: 1, name: "김완선", email: "kws@gmail.com"});
            borderCollection.insert({no: 2, name: "카라", email: "kara@gmail.com"});
            borderCollection.insert({no: 3, name: "전지현", email: "jjh@gmail.com"});
            borderCollection.insert({no: 4, name: "박승현", email: "ppillip@gmail.com"});
        }


});

//발행 소스

Meteor.publish("borderCollection",function(obj){
    var condition = obj || {};
    
    return borderCollection.find(condition);
});


