import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sanitization',
  templateUrl: './sanitization.component.html',
  styleUrls: ['./sanitization.component.scss']
})
export class SanitizationComponent {

  constructor(private sanitizer: DomSanitizer) { }
  // For example, a user/attacker-controlled value from a URL.
  htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';

  // javascript: URLs are dangerous if attacker controlled.
  // Angular sanitizes them in data binding, but you can
  // explicitly tell Angular to trust this value:
  dangerousUrl = 'javascript:alert("Hi there")';
  trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);


  // Appending an ID to a YouTube URL is safe.
  // Always make sure to construct SafeValue objects as
  // close as possible to the input data so
  // that it's easier to check if the value is safe.
  //'https://www.youtube.com/embed/' + id
  dangerousVideoUrl = 'https://www.youtube.com/embed/dSSydJT6BO8';
  videoUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
}
