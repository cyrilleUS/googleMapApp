import {Page, NavController, NavParams} from 'ionic-angular';
import {Page3} from "../page3/page3";
import {FormBuilder, Validators} from 'angular2/common';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  nav: NavController;
  companies: any;
  searchForm: any;
  radius: number[];
  currentRadius: number = 5;
  constructor(nav: NavController, form: FormBuilder) {
    this.radius = [1, 3, 5, 10];
    this.searchForm = form.group ({
      searchString: ["", Validators.required],
      radius: [null, Validators.required]
    })
    this.nav = nav;
    this.companies = [
      {name:"AllSchools", address:"1b rue du 11 novembre 10300 Sainte Savine"},
      {name:"UniqueSound", address:"96 Rue la Fayette 75010 Paris"}
    ]
  }

  search(event) {
    let searchString: String = this.searchForm.value.searchString;
    let searchRadius: number = this.currentRadius*1000;
    console.log("searchString: " + searchString + ", searchRadius: " + searchRadius);
    let company: any = {name: searchString, address:""};
    this.showCompany(company, searchRadius);
  }

  showCompany(company, searchRadius) {
    this.nav.push(Page3, {
      company: company,
      searchRadius: searchRadius
    });
  }
}
