import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-flickr',
  templateUrl: './flickr.component.html',
  styleUrls: ['./flickr.component.css']
})
export class FlickrComponent implements OnInit {
  image: object;
  title: string;
  date: any;
  interval;
  ids = [];
  loading: boolean;

  constructor(private _flickrService: FlickrService) {}

  ngOnInit() {
    this.loading = false;
    this.display();
  }
get() {
  this._flickrService.get().subscribe(res => {
    const i = this.ids.filter(id => id === res['_body'].items[0].author_id);
    i.length > 0 ? this.clear() : this.getImg(res);
  });
}
  getImg(res) {
    this.loading = false;
    this.image = res['_body'].items[0].description;
    this.title = res['_body'].items[0].title;
    this.date = res['_body'].items[0].date_taken;
    this.ids.push(res['_body'].items[0].author_id);
  }
  display() {
    this.get();
    this.Interval();
  }
  Interval() {
     this.interval = setInterval( () => { this.get(); }, 5000);
  }
  clear() {
    clearInterval(this.interval);
    this.loading = true;
    this.display();

  }
}
