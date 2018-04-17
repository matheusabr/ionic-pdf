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

  /**
   * Download and Open Pdf (online)
   * 1. Get the dir path
   * 2. Create an instance of FileTransfer
   * 3. Download the pdf file
   * 3.1 Define where and the name of the file to save
   * 4. Get promise response
   * 4.1 Set internal url path
   * 4.2 Open the pdf file
   */
  downloadAndOpenPdf() {
    let path = null;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }

    const transfer = this.transfer.create();
    transfer.download('https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf', path + 'myfile.pdf')
      .then(entry => {
        let url = entry.toURL();
        console.log(url);
        
        this.document.viewDocument(url, 'application/pdf', {});
      });
  }

  /**
   * Open Downloaded Pdf (offline)
   * 1. Get the dir path
   * 2. Set options to Documents Viewer App
   * 3. Open the downloaded pdf file
   */
  openDownloadedPdf(pdfFilename: string) {
    let path = null;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }

    const options: DocumentViewerOptions = {
      title: 'PDF Title'
    };

    this.document.viewDocument(path + pdfFilename, 'application/pdf', options);
  }

}
