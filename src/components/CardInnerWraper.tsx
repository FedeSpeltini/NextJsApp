import { CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react';
import React, { ReactNode } from 'react'

type props = {
    header: ReactNode | string;
    body: ReactNode;
    footer?: ReactNode;
}

export default function CardInnerWraper({header, body, footer} : props) {
  return (
    <>
      <CardHeader >
        {typeof(header) === 'string' ? (
            <div className='text-2xl font-semibold text-secondary'>
                {header}
            </div>
        ) : (
            <>{header}</>
        )}
      </CardHeader>
      <Divider />
      <CardBody>{body}</CardBody>
      {footer && (
        <CardFooter>
            {footer}
        </CardFooter>
      )}
    </>
  );
}
