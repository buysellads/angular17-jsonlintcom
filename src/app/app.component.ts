import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';

declare var _carbonads: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular17-jsonlintcom';

  constructor(private router: Router) {}

  loadCarbonScript(targetElement: HTMLElement) {
    const script = document.createElement('script');
    script.src = 'https://cdn.carbonads.com/carbon.js?serve=CVAIKKQM&placement=carbonadsnet&format=responsive';
    script.id = '_carbonads_js';
    script.async = true;
    targetElement.appendChild(script);
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Page routed to:', event.url);
        const carbonContainer = document.querySelector("#carbonContainer") as HTMLElement;
        const carbonAdElement = document.querySelector("#carbonads") as HTMLElement;
        
        if(carbonAdElement == null) {
          this.loadCarbonScript(carbonContainer);
        } else {
          _carbonads.refresh();
        }

      }
    });
  }
}
