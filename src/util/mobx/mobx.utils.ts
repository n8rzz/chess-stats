import { observable } from 'mobx';
import { IApiError } from '../http/http.types';
import { IResponseStatusWithData } from './mobx.types';

/**
 * Util to standardize api responses for mobx stores.
 */
export const initialResponseStatus = <T, E = IApiError>(
  defaultValue: T,
  defaultIsRequesting = false,
  isDeepObservable = true,
): IResponseStatusWithData<T, E> => {
  return observable(
    {
      data: defaultValue,
      isRequesting: defaultIsRequesting,
    },
    {
      data: isDeepObservable ? observable : observable.ref,
      isRequesting: observable,
    },
  );
};
