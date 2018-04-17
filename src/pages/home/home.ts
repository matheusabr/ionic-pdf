import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private document: DocumentViewer,
    private file: File,
    private transfer: FileTransfer
  ) {

  }

  /**
   * Open Local Pdf (offline)
   * 1. Get the dir path
   * 2. Set options to Documents Viewer App
   * 3. Open the pdf file
   */
  openLocalPdf() {
    let path = null;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.applicationDirectory;
    }

    const options: DocumentViewerOptions = {
      title: 'PDF Title'
    };

    this.document.viewDocument(path + 'www/assets/pdf/typescript_tutorial.pdf', 'application/pdf', options);
  }

}
