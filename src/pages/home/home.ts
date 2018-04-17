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
  appPath: string;
  dataPath: string;

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private document: DocumentViewer,
    private file: File,
    private transfer: FileTransfer
  ) {
    
  }

  ionViewDidLoad() {
    // Set paths
    this.definePaths();
  }

  /**
   * Define paths based on platform running
   */
  definePaths() {
    if (this.platform.is('ios')) {
      this.appPath = this.file.documentsDirectory;
      this.dataPath = this.file.documentsDirectory;

    } else {
      this.appPath = this.file.applicationDirectory;
      this.dataPath = this.file.dataDirectory;

    }
  }

  /**
   * Open Local Pdf (offline)
   * 1. Set options to Documents Viewer App
   * 2. Open the pdf file
   */
  openLocalPdf() {
    const options: DocumentViewerOptions = {
      title: 'PDF Title'
    };

    this.document.viewDocument(this.appPath + 'www/assets/pdf/typescript_tutorial.pdf', 'application/pdf', options);
  }

  /**
   * Download and Open Pdf (online)
   * 1. Create an instance of FileTransfer
   * 2. Download the pdf file
   * 2.1 Define where and the name of the file to save
   * 3. Get promise response
   * 3.1 Set internal url path
   * 3.2 Open the pdf file
   */
  downloadAndOpenPdf() {
    const transfer = this.transfer.create();

    transfer.download('https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf', this.dataPath + 'myfile.pdf')
      .then(entry => {
        let url = entry.toURL();
        console.log(url);
        
        this.document.viewDocument(url, 'application/pdf', {});
      });
  }

  /**
   * Open Downloaded Pdf (offline)
   * 1. Get the filename
   * 2. Set options to Documents Viewer App
   * 3. Open the downloaded pdf file
   * 
   * @param pdfFilename: string
   */
  openDownloadedPdf(pdfFilename: string) {
    const options: DocumentViewerOptions = {
      title: 'PDF Title'
    };

    this.document.viewDocument(this.dataPath + pdfFilename, 'application/pdf', options);
  }

}
