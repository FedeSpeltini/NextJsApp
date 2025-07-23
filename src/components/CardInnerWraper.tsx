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
      <CardHeader className="pb-2 md:pb-4">
        {typeof(header) === 'string' ? (
            <div className='text-xl md:text-2xl font-semibold text-secondary'>
                {header}
            </div>
        ) : (
            <>{header}</>
        )}
      </CardHeader>
      <Divider className="hidden md:block" />
      <CardBody className="pt-2 md:pt-4 px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-start md:gap-6">
          {/* En mobile: stack vertical, en desktop: layout horizontal */}
          <div className="w-full">
            {body}
          </div>
        </div>
      </CardBody>
      {footer && (
        <CardFooter className="pt-2 md:pt-4">
            {footer}
        </CardFooter>
      )}
    </>
  );
}