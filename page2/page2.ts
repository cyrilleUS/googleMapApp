/// <reference path="../../DefinitionFiles/google.maps.d.ts"/>

import {Page, NavController, Platform} from 'ionic-angular';
import {Page1} from '../page1/page1';

@Page({
  templateUrl: 'build/pages/page2/page2.html',
})
export class Page2 {
  nav: NavController;
  constructor(platform: Platform, nav: NavController) {
    platform.ready().then(() => {
      this.nav = nav;
      this.loadMap();
    });
  }

  loadMap() {

    let options = {timeout: 10000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(

      (position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude, false);

        let mapOtions = {
          center : latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        console.log("mapOtions set");

        var map = new google.maps.Map(document.getElementById("map"), mapOtions);
        console.log("map set");

        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        console.log("marker set");
      },
      (error) => {
        console.log("error");
      });
  }
}
