import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  address = {};
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;

   //Geocoder configuration
   geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  
  constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
  }

  getCurrentLocation() {
    alert('called');
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.geoAddress = resp as any;
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.geoAccuracy = resp.coords.accuracy;
      this.getGeoencoder(this.geoLatitude,this.geoLongitude);
      this.geoAddress = 'made it this far'
    }).catch((error) => {
      alert('Error getting location' + error.toString());
      this.geoAddress = 'failed'
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.geoAddress = this.generateAddress(result[0]);
        // alert(this.geoAddress);
      })
      .catch((error: any) => {
        this.geoAddress = 'Error getting location' + JSON.stringify(error);
      console.log(this.geoAddress);
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj){
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      address += obj[val]+', ';
    }
  return address.slice(0, -2);
}
}
