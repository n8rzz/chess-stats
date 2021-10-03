import { IApiError } from '../http/http.types';

export interface IResponseStatus<T, E = IApiError> {
  data?: T;
  error?: E;
  isRequesting: boolean;
  statusCode?: number;
}

export interface IResponseStatusWithData<T, E = IApiError> extends IResponseStatus<T, E> {
  data: T;
}
