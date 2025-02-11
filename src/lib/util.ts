import {differenceInYears} from 'date-fns';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { ZodIssue } from 'zod';

export function calculateAge(dob: Date) {
    return differenceInYears(new Date(), dob);
}


export function handleFormServerErrors<TFieldValues extends FieldValues>(
    errorResponse: {error: string | ZodIssue[]},
    setError: UseFormSetError<TFieldValues>
) {

    if(Array.isArray(errorResponse.error))
        {
            console.log('entro por array');
            errorResponse.error.forEach((e) =>{
                const fieldName = e.path.join('.') as Path<TFieldValues>
                setError(fieldName, {message: e.message})
            })
        }
        else
        {
            console.log('entro por string');
            setError('root.serverError', {message: errorResponse.error});
            console.log(errorResponse.error)
        }

}