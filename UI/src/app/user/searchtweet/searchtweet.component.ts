import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/Models/tweet';
import { User } from 'src/app/Models/user';
import { UserComment } from 'src/app/Models/user-comment';
import { UserTweets } from 'src/app/Models/user-tweets';
import { TweetappService } from 'src/app/services/tweetapp.service';

@Component({
  selector: 'app-searchtweet',
  templateUrl: './searchtweet.component.html',
  styleUrls: ['./searchtweet.component.css']
})
export class SearchtweetComponent implements OnInit {
  imgLink:'data:image/jpeg;base64,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'

form:FormGroup;
commentslist:UserComment[];
result:number;
clickedButton : {[key: number] : boolean} ={};
count:Tweet;
id:number;
todaysDataTime = new Date();
today= new Date();
username:string;
date:string;
text:string;
user:User;
list :UserTweets[];
uname:string;
  constructor(private frombuilder:FormBuilder,private service:TweetappService,private route:Router) {
   this.Searchusers();
   }
Searchusers()
{
  this.username = localStorage.getItem("uname")!
  this.service.GetUserProfile(this.username).subscribe(res=>
    {
      
     this.user=res;
     localStorage.setItem("name",this.user.username);
      console.log(this.user);
      this.UserTweets();
    },
    err=>{
      console.log(err);
    }
    )
}
  ngOnInit(){
    this.form = this.frombuilder.group({
      username:[''],
      comment:['']
    })
  }

  UserTweets()
  {
    this.service.GetTweetsByUser(this.username).subscribe(res=>{
      this.list=res;
      console.log(this.list);
      this.list.forEach(element => {
       this.date=formatDate(this.today,'yyyy/MM/dd','en-US', '+0530')
        localStorage.setItem("Tweets",element.tweets);
        localStorage.setItem("UserName",element.userName);
        localStorage.setItem("Imagename",element.imagename);
        localStorage.setItem("FirstName",element.firstName);
        localStorage.setItem("LastName",element.lastName);
        localStorage.setItem("tweetDate",element.tweetDate.toString());
        var created_date=localStorage.getItem('tweetDate');
        var text=this.GetTime(created_date);
        element.datecalculated=String(localStorage.getItem('datecalculated'))
        console.log(element.datecalculated);
      });
      console.log(this.list);
    })
  }
  isCommentClicked(index : number){
    console.log(index);
    if(this.clickedButton[index]==false){
    this.clickedButton[index] = true;
  }
    else
    this.clickedButton[index] = false;
  }

  Comments(item:UserTweets)
  {
    this.service.GetAllComments(item.userName, item.tweets).subscribe(res=>{
      this.commentslist=res;
      console.log(this.commentslist);
    })
  }
  PostComments(item:UserTweets)
  {
    let comment = this.form.value['comment']
    let uname = String(localStorage.getItem('Username'))
    this.service.PostComment(comment,uname,item.userName, item.tweets).subscribe(res=>{
    alert("replies")
  console.log(res)
  this.route.navigateByUrl('VIEWTWEETS')
    },
    err=>{
      alert("Failed")
      this.onReset();
    });
    this.Searchusers();
}
GetLikes(item:UserTweets)
{
  this.count=new Tweet();
  this.service.GetLikes(item.userName, item.tweets).subscribe(res=>{
    this.count.likes=res;
    console.log(this.count);
  },err=>{
    console.log(err)
  })
  this.Searchusers();
}
GetTime(created_date:any)
{
  function getDateDiff(startDate:Date, endDate:Date) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    if(days==0)
    {
      return hours+"h"
    }
    else if(hours==0)
    {
      return minutes+"min"
    }
    else if(minutes==0)
    {
      return seconds+"sec"
    }
    else{
      return days+"days"
    }
}
var diff = getDateDiff(new Date(created_date),new Date(this.todaysDataTime));
localStorage.setItem("datecalculated",diff);
}
Search()
  {
     this.uname = this.form.value["username"]
    localStorage.setItem("uname", this.uname);
    this.Searchusers()
  }

  logout()
  {
    localStorage.clear();
  }
onReset()
{
  this.form.reset();
}
}
