import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	@ViewChild('iPhone') iPhone: ElementRef;
	private platform = 'ios';
	private appHost = 'localhost:8100';
	private appUrl: SafeResourceUrl;
	private statusbarBG: string;
	private statusbarStyle: any = {};
	private deviceType:string;
	private deviceTypeList:string;
	private deviceList:any = {
		ios:[
			{
				name:'iPhone8',
				type:'iPhone8'
			},
			{
				name:'iPhone8 Plus',
				type:'iPhone8-Plus'
			},
			{
				name:'iPhone X',
				type:'iPhone-X'
			},
			{
				name:'iPhone 5s',
				type:'iPhone-5s'
			}
		]
	};
	constructor(
		private sanitizer: DomSanitizer
	) {}
	ngOnInit(): void {
		this.setAppUrl();
		let a = '1850166766';
		let b = new RegExp(/(?!1[0-9]{10})(^((?!@).)*$)/);
		let c = b.test(a);
		console.log(c);
		this.setStatusbarStyle();
		this.setDeviceList(this.platform);
	}
	setDeviceList(platform):void{
		this.deviceTypeList = this.deviceList[platform];
		console.log(this.deviceTypeList);
		this.setDeviceType(this.deviceTypeList[0]);
	}
	setDeviceType(type):void{
		console.log(this.iPhone);
		if(this.iPhone){
			this.iPhone.nativeElement.contentDocument.location.reload();
		}
		this.deviceType = type;
	}
	setPlatform(pf): void {
		this.platform = pf;
		this.setAppUrl();
	}
	setStatusbarStyle():void{
		this.statusbarStyle = {
			'background-color':this.statusbarBG
		}
	}
	setAppUrl(): void {
		this.appUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://' + this.appHost + '?ionicplatform=' + (this.platform=='iPhone'?'ios':this.platform));
	}
	submit():void{
		this.setStatusbarStyle();
		this.setAppUrl();
	}
}
