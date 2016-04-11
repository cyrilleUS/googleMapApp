/// <reference path="../../DefinitionFiles/google.maps.d.ts"/>

import {Page, NavController, NavParams, Platform, Alert} from 'ionic-angular';
import {Page1} from '../page1/page1';

@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  nav: NavController;
  name: any;
  constructor(platform: Platform, nav: NavController, navParams: NavParams) {
    platform.ready().then(() => {
      this.nav = nav;
      this.loadMap(navParams.get('company'), navParams.get('searchRadius')|null);
      this.name = navParams.get('company').name;
    });
  }

  loadMap(company, searchRadius) {

    let options = {timeout: 10000, enableHighAccuracy: true};
    var geocoder = new google.maps.Geocoder();
    //If the user click on button, the address will be completed
    if(company.address != "") {
      console.log("geocode will be launch with address : "+company.address);
      geocoder.geocode( { 'address': company.address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {
            console.log("Geocoder launched, result: " + results[0].geometry.location);
            let mapOtions = {
              center : results[0].geometry.location,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            console.log("mapOtions set");
            var map = new google.maps.Map(document.getElementById("map"), mapOtions);
            console.log("map set");
            var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map
            });
            console.log("marker set");
        }
        else {
          console.log("Gmap search failed");
        }
      });
    }
    //else the search use the name of the company as the search tool
    else {
      var map = new google.maps.Map(document.getElementById("map"));
      var places = new google.maps.places.PlacesService(map);
      navigator.geolocation.getCurrentPosition(

        (position) => {
          var latLngUser = new google.maps.LatLng(position.coords.latitude, position.coords.longitude, false);

          var request = {
            keyword: company.name,
            location: latLngUser,
            radius: searchRadius
          };

          console.log("name " + request.keyword + "loc " + request.location+ "radius " + request.radius)
        var myPage3: Page3 = this;
        places.nearbySearch(request, function(results, status) {

          if (status == google.maps.places.PlacesServiceStatus.OK)
          {
            let mapOtions = {
              center : latLngUser,
              zoom: 12,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            console.log("mapOtions set");

            var map = new google.maps.Map(document.getElementById("map"), mapOtions);
            console.log("map set");

            for(var result in results) {
              console.log("nearbySearch result: " + results[result].geometry.location);
              var marker = new google.maps.Marker({
                position: results[result].geometry.location,
                map: map
              });
              console.log("marker set");
            }

          }
          else {
            console.log("Gmap search failed");
            let alert = Alert.create({
              title: 'No results',
              message: 'Your research did not match any place around you.',
              buttons: [
                { text:'Ok',
                  handler: () => {
                    myPage3.nav.setPages([{page: Page1 }]);
                  }
              }]
            });
            myPage3.nav.present(alert);
          }
        });
        },
        (error) => {
          console.log("error getCurrentPosition");
        });
    }



    }
  }
