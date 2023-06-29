import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { appConfig } from '../app/app-config';

// models
import { ParkingSpot } from '../models/parkingspot.model';
import { BookingStatus, Booking } from '../models/booking.model'

@Injectable({ providedIn: 'root' })
export class BookingService {

    private url = `${appConfig.apiBaseUrl}/api/v1`;

    constructor(private http: HttpClient) { }

    /** Gets the booking status by parking spot for a specified date. */
    getBookingStatusByParkingSpotDate(date: string): Observable<BookingStatus[]> {
        return this.http.get<BookingStatus[]>(`${this.url}/bookings/status/${date}`).pipe(
            catchError(this.handleError<any>(`the booking status by parking spot for a specified date`))
        );
    }

    /** Gets the booking status from specific spot */
    getBookingStatusFromSpecificSpot(spotId: string, date: string): Observable<Booking> {
        return this.http.get<Booking>(`${this.url}/bookings/${date}/${spotId}`).pipe(
            catchError(this.handleError<any>(`the booking status by parking spot for a specified date`))
        );
    }

    // book a spot for a user
    bookASpot(booking: Booking): Observable<Booking> {
        return this.http.post<Booking>(`${this.url}/bookings`, booking, { responseType: 'text' as 'json' }).pipe(
            catchError(this.handleError<any>(`booking a spot`))
        );
    }

    // unbook a spot for a user
    unbookASpot(booking: Booking): Observable<Booking> {
        return this.http.put<Booking>(`${this.url}/bookings`, booking, { responseType: 'text' as 'json' }).pipe(
            catchError(this.handleError<any>(`unbooking a spot`))
        );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // Let the app keep running by returning an empty result.
            return throwError(error);
        };
    }
}