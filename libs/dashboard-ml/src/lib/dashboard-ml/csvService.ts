import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  private csvPathAglo = '/tempDoc/summary_aglomerative.csv';
  private csvPathScan = '/tempDoc/summary_dbscan.csv';
  private csvPathSpec = '/tempDoc/summary_spectral.csv';
  private csvPathKmea = '/tempDoc/summary_kmeans.csv';
  private csvPathRfm = '/tempDoc/RFM.csv';

  constructor(private http: HttpClient) {}

  csvSummary_Aglomerative(): Observable<string> {
    return this.http.get(this.csvPathAglo, { responseType: 'text' });
  }

  csvSummary_Dbscan(): Observable<string> {
    return this.http.get(this.csvPathScan, { responseType: 'text' });
  }

  csvSummary_Spectral(): Observable<string> {
    return this.http.get(this.csvPathSpec, { responseType: 'text' });
  }

  csvSummary_Kmeans(): Observable<string> {
    return this.http.get(this.csvPathKmea, { responseType: 'text' });
  }

  csvRfm(): Observable<string> {
    return this.http.get(this.csvPathRfm, { responseType: 'text' });
  }
  
}
