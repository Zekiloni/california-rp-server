
<template>
   <div class="weather-app">
      <div class="container">
         <div class="weather-side">
            <div class="weather-gradient"> </div>

            <div class="date-container">
               <h2 class="date-dayname">Tuesday</h2>
               <span class="date-day">15 Jan 2019</span>
               <span class="location"> {{ Messages.CITY }} </span>
            </div>
            <div class="weather-container">
               <h1 class="weather-temp">29&#176;C</h1>
               <h3 class="weather-desc">Sunny</h3>
            </div>
        </div>

         <div class="info-side">
            <div class="today-info-container">
               <div class="today-info">
                  <div class="precipitation"> <span class="title">PRECIPITATION</span><span class="value">0 %</span>
                     <div class="clear"></div>
                  </div>
                  <div class="humidity"> <span class="title">HUMIDITY</span><span class="value">34 %</span>
                     <div class="clear"></div>
                  </div>
                  <div class="wind"> <span class="title">WIND</span><span class="value">0 km/h</span>
                     <div class="clear"></div>
                  </div>
               </div>
            </div>
            <div class="week-container">
               <ul class="week-list">
                  <li class="active"><span class="day-name">Tue</span><span class="day-temp">29&#176;C</span></li>
                  <li><span class="day-name">Wed</span><span class="day-temp">21&#176;C</span></li>
                  <li><span class="day-name">Thu</span><span class="day-temp">08&#176;C</span></li>
                  <div class="clear"></div>
               </ul>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import Vue from 'vue'
   import Component from 'vue-class-component';

   import { Messages } from '@/globals';

   @Component
   export default class WeatherApp extends Vue {
      Messages = Messages;
   }
</script>

<style scoped>
   * {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 1.25em;
   }

   .clear {
      clear: both;
   }

   .weather-app {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      background: #18171d;
      -ms-flex-pack: center;
      justify-content: center;
   }

   .container {
      border-radius: 25px 25px 0px 0px;
      -webkit-box-shadow: 0 0 70px -10px rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 70px -10px rgba(0, 0, 0, 0.2);
      background-color: #222831;
      color: #ffffff;
   }

   .weather-side {
      position: relative;
      height: 220px;
      border-radius: 25px 25px 0px 0px;
      background-image: url("https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80");
      width: 290px;
      -webkit-box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
      z-index: 10;
   }

   .weather-gradient {
      position: absolute;
      width: 290px;
      height: 220px;
      top: 0;
      left: 0;
      background-image: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
      border-radius: 25px 25px 0px 0px;
      opacity: 0.8;
   }

   .date-container {
      position: absolute;
      top: 25px;
      left: 25px;
   }

   .date-dayname {
      margin: 0;
   }

   .date-day {
      display: block;
   }

   .location {
      display: inline-block;
      margin-top: 10px;
   }

   .location-icon {
      display: inline-block;
      height: 0.8em;
      width: auto;
      margin-right: 5px;
   }

   .weather-container {
      position: absolute;
      bottom: 25px;
      left: 25px;
   }

   .weather-icon.feather {
      height: 60px;
      width: auto;
   }

   .weather-temp {
      margin: 0;
      font-weight: 700;
      font-size: 4em;
   }

   .weather-desc {
      margin: 0;
   }

   .info-side {
      position: relative;
      padding: 30px 0;
      border: 1px solid rgba(79, 67, 73, 0.7);
      border-top: none;
      width: 290px;
      background-color:#18171d;
   }

   .today-info {
      margin: 25px 25px 25px 25px;
      border-radius: 10px;
   }

   .today-info > div:not(:last-child) {
      margin: 0 0 5px 0;
   }

   .today-info > div .title {
      float: left;
      font-weight: 700;
   }

   .today-info > div .value {
      float: right;
   }

   .week-list {
      list-style: none;
      padding: 0;
      margin: auto;
      box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.25);
      background: #1f1e26;
      border-radius: 10px;
      width: 235px;
   }

   .week-list > li {
      float: left;
      padding: 15px;
      cursor: pointer;
      -webkit-transition: 200ms ease;
      -o-transition: 200ms ease;
      transition: 200ms ease;
      border-radius: 10px;
      height: 55px;
      width: 78px;
   }

   .week-list > li:hover {
      -webkit-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
      background: #fff;
      color: #222831;
      -webkit-box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
   }

   .week-list > li.active {
      background: #fff;
      color: #222831;
      border-radius: 10px;
   }

   .week-list > li .day-name {
      display: block;
      margin: 0 0 0 0;
      padding: 0;
      text-align: center;
      font-size: 14px;
   }

   .week-list > li .day-temp {
      display: block;
      text-align: center;
      margin: 0;
      font-weight: 600;
      font-size: 8px;
   }
</style>